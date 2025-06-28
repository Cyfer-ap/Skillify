# profiles/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import TeacherProfile, StudentProfile
from .forms import TeacherProfileForm, StudentProfileForm
from .serializers import TeacherProfileSerializer, StudentProfileSerializer
from rest_framework import permissions


class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'student':
            return Response({'detail': 'Not a student'}, status=403)

        profile, _ = StudentProfile.objects.get_or_create(user=user)
        serializer = StudentProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        if user.role != 'student':
            return Response({'detail': 'Not a student'}, status=403)

        profile, _ = StudentProfile.objects.get_or_create(user=user)
        data = request.data.copy()
        files = request.FILES
        form = StudentProfileForm(data, files, instance=profile)

        if form.is_valid():
            profile = form.save()
            serializer = StudentProfileSerializer(profile)
            return Response(serializer.data, status=200)
        else:
            return Response(form.errors, status=400)


class TeacherProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile, _ = TeacherProfile.objects.get_or_create(user=request.user)
            serializer = TeacherProfileSerializer(profile)
            return Response(serializer.data)
        except Exception:
            return Response({"detail": "Failed to load profile"}, status=400)

    def put(self, request):
        try:
            print("PUT request received with data:", request.data)
            print("FILES:", request.FILES)

            profile, _ = TeacherProfile.objects.get_or_create(user=request.user)
            serializer = TeacherProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Exception as e:
            print("EXCEPTION:", str(e))
            return Response({"detail": "Update failed"}, status=400)

