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
        return Availability.objects.filter(teacher__id=teacher_id)


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
