from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from collections import defaultdict

from .models import Availability, TutoringSession
from accounts.models import CustomUser
from .serializers import (
    TeacherSerializer,
    AvailabilitySerializer,
    TutoringSessionSerializer,
    BookSessionSerializer
)
from notifications.utils import send_notification


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


class BookSessionAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookSessionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        session = serializer.save(student=self.request.user)
        student = self.request.user
        teacher = session.teacher

        # Notify both parties
        send_notification(
            user=teacher,
            type="booking",
            message=f"{student.username} has booked a session with you on {session.date} at {session.start_time}.",
            link="/teacher/dashboard",
            email=True,
            subject="📅 New Session Booking"
        )
        send_notification(
            user=student,
            type="booking",
            message=f"You booked a session with {teacher.username} on {session.date} at {session.start_time}.",
            link="/student/dashboard",
            email=True,
            subject="✅ Session Booking Confirmed"
        )


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
        user = request.user
        try:
            session = TutoringSession.objects.get(id=session_id)
            new_status = request.data.get("status")

            if new_status not in dict(TutoringSession.STATUS_CHOICES):
                return Response({"detail": "Invalid status"}, status=400)

            if user.role == "teacher":
                if session.teacher != user:
                    return Response({"detail": "Permission denied"}, status=403)

                if new_status == "confirmed":
                    session.status = "confirmed"
                    session.save()

                    send_notification(
                        user=session.teacher,
                        type="confirmation",
                        message=f"You confirmed the session with {session.student.username} on {session.date} at {session.start_time}.",
                        link="/teacher/dashboard",
                        email=True,
                        subject="✅ Session Confirmed"
                    )
                    send_notification(
                        user=session.student,
                        type="confirmation",
                        message=f"{session.teacher.username} confirmed your session on {session.date} at {session.start_time}.",
                        link="/student/dashboard",
                        email=True,
                        subject="📢 Your Session is Confirmed"
                    )

                    return Response({"message": "Session confirmed"})

                elif new_status == "cancelled":
                    if session.status in ["completed", "cancelled"]:
                        return Response({"detail": "Cannot cancel this session"}, status=403)

                    session.status = "cancelled"
                    session.cancelled_by = "teacher"
                    session.save()

                    send_notification(
                        user=session.teacher,
                        type="confirmation",
                        message=f"You cancelled the session with {session.student.username} on {session.date}.",
                        link="/teacher/dashboard",
                        email=True,
                        subject="❌ Session Cancelled"
                    )
                    send_notification(
                        user=session.student,
                        type="confirmation",
                        message=f"{session.teacher.username} cancelled your session on {session.date}.",
                        link="/student/dashboard",
                        email=True,
                        subject="⚠️ Your Session was Cancelled"
                    )

                    return Response({"message": "Session cancelled"})

                return Response({"detail": "Invalid teacher action"}, status=403)

            elif user.role == "student":
                if session.student != user:
                    return Response({"detail": "Permission denied"}, status=403)
                if new_status != "cancelled":
                    return Response({"detail": "Students can only cancel"}, status=403)
                if session.status in ["completed", "cancelled"]:
                    return Response({"detail": "Cannot cancel this session"}, status=403)

                session.status = "cancelled"
                session.cancelled_by = "student"
                session.save()

                send_notification(
                    user=session.student,
                    type="confirmation",
                    message=f"You cancelled the session with {session.teacher.username} on {session.date}.",
                    link="/student/dashboard",
                    email=True,
                    subject="❌ Session Cancelled"
                )
                send_notification(
                    user=session.teacher,
                    type="confirmation",
                    message=f"{session.student.username} cancelled the session on {session.date}.",
                    link="/teacher/dashboard",
                    email=True,
                    subject="⚠️ Your Session was Cancelled"
                )

                return Response({"message": "Session cancelled"})

            return Response({"detail": "Invalid role"}, status=400)

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
                session = serializer.save(student=request.user)
                created.append(serializer.data)

                send_notification(
                    user=session.student,
                    type="booking",
                    message=f"You booked a session with {session.teacher.username} on {session.date} at {session.start_time}.",
                    link="/student/dashboard",
                    email=True,
                    subject="✅ Multi-Session Booking Confirmed"
                )
                send_notification(
                    user=session.teacher,
                    type="booking",
                    message=f"{session.student.username} booked a session with you on {session.date} at {session.start_time}.",
                    link="/teacher/dashboard",
                    email=True,
                    subject="📅 New Session Booked"
                )
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"created": created}, status=status.HTTP_201_CREATED)


class AllAvailabilityAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AvailabilitySerializer

    def get_queryset(self):
        today = timezone.now().date()
        queryset = Availability.objects.filter(date__gte=today)
        sessions = TutoringSession.objects.filter(
            status__in=["pending", "confirmed"],
            date__gte=today,
        )

        session_map = defaultdict(list)
        for s in sessions:
            key = (s.teacher_id, s.date, s.start_time, s.end_time)
            session_map[key].append(s)

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


class TeacherSessionsAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TutoringSessionSerializer

    def get_queryset(self):
        user = self.request.user
        if not user or not hasattr(user, 'role') or user.role != 'teacher':
            raise PermissionDenied("Only teachers can view this.")
        return TutoringSession.objects.filter(teacher=user).order_by('-date', '-created_at')
