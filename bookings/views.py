from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from .models import Availability, TutoringSession
from accounts.models import CustomUser
from .serializers import (
    TeacherSerializer,
    AvailabilitySerializer,
    TutoringSessionSerializer,
    BookSessionSerializer
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Count
from collections import defaultdict


class ListTeachersAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TeacherSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(role='teacher')


class TeacherAvailabilityAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AvailabilitySerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        today = timezone.now().date()
        return Availability.objects.filter(
            teacher__id=teacher_id,
            date__gte=today
        ).order_by('date', 'start_time')



# ✅ Use BookSessionSerializer (not full session one)
class BookSessionAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookSessionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class MyBookingsAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TutoringSessionSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return TutoringSession.objects.filter(student=user)
        elif user.role == 'teacher':
            return TutoringSession.objects.filter(teacher=user)
        return TutoringSession.objects.none()


class UpdateBookingStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, session_id):
        try:
            session = TutoringSession.objects.get(id=session_id)
            if session.teacher != request.user:
                return Response({"detail": "Permission denied"}, status=403)
            new_status = request.data.get('status')
            if new_status not in dict(TutoringSession.STATUS_CHOICES):
                return Response({"detail": "Invalid status"}, status=400)
            session.status = new_status
            session.save()
            return Response({"message": "Session updated successfully"})
        except TutoringSession.DoesNotExist:
            return Response({"detail": "Session not found"}, status=404)


class CreateAvailabilityAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AvailabilitySerializer

    def perform_create(self, serializer):
        if self.request.user.role != 'teacher':
            raise PermissionDenied("Only teachers can add availability.")
        serializer.save(teacher=self.request.user)

class MyAvailabilityAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AvailabilitySerializer

    def get_queryset(self):
        return Availability.objects.filter(teacher=self.request.user)


class BookingSerializer:
    pass


class MultiBookAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        bookings = request.data
        created = []

        for item in bookings:
            serializer = BookingSerializer(data=item)
            if serializer.is_valid():
                serializer.save(student=request.user)
                created.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"created": created}, status=status.HTTP_201_CREATED)



class AllAvailabilityAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AvailabilitySerializer

    def get_queryset(self):
        today = timezone.now().date()

        # Step 1: Get all upcoming availability
        queryset = Availability.objects.filter(date__gte=today)

        # Step 2: Get all overlapping bookings for future
        sessions = TutoringSession.objects.filter(
            status__in=["pending", "confirmed"],
            date__gte=today,
        )

        # Step 3: Build a mapping: (teacher_id, date, start_time, end_time) → list of booked sessions
        from collections import defaultdict
        session_map = defaultdict(list)
        for s in sessions:
            key = (s.teacher_id, s.date, s.start_time, s.end_time)
            session_map[key].append(s)

        # Step 4: Filter valid availability (not fully booked)
        valid_ids = []

        for avail in queryset:
            key = (avail.teacher_id, avail.date, avail.start_time, avail.end_time)
            bookings = session_map.get(key, [])

            if avail.session_type == "1v1" and len(bookings) == 0:
                valid_ids.append(avail.id)

            elif avail.session_type == "group":
                if avail.max_students is None or len(bookings) < avail.max_students:
                    valid_ids.append(avail.id)

        return Availability.objects.filter(id__in=valid_ids).order_by("date", "start_time")


# views.py
from rest_framework.permissions import IsAuthenticated

class TeacherSessionsAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TutoringSessionSerializer

    def get_queryset(self):
        user = self.request.user

        # ✅ Debug check
        print(f"[DEBUG] Auth user: {user}, role: {getattr(user, 'role', None)}")

        if not user or not hasattr(user, 'role') or user.role != 'teacher':
            raise PermissionDenied("Only teachers can view this.")

        return TutoringSession.objects.filter(teacher=user).order_by('-date', '-created_at')



