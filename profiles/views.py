# profiles/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import TeacherProfile, StudentProfile
from .forms import TeacherProfileForm, StudentProfileForm
from .serializers import TeacherProfileSerializer, StudentProfileSerializer

class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'student':
            profile, _ = StudentProfile.objects.get_or_create(user=user)
            serializer = StudentProfileSerializer(profile)
        elif user.role == 'teacher':
            profile, _ = TeacherProfile.objects.get_or_create(user=user)
            serializer = TeacherProfileSerializer(profile)
        else:
            return Response({'detail': 'Invalid role'}, status=400)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        data = request.data.copy()
        files = request.FILES

        if user.role == 'student':
            profile, _ = StudentProfile.objects.get_or_create(user=user)
            form = StudentProfileForm(data, files, instance=profile)
        elif user.role == 'teacher':
            profile, _ = TeacherProfile.objects.get_or_create(user=user)
            form = TeacherProfileForm(data, files, instance=profile)
        else:
            return Response({'detail': 'Invalid role'}, status=400)

        if form.is_valid():
            profile = form.save()
            serializer = StudentProfileSerializer(profile) if user.role == 'student' else TeacherProfileSerializer(profile)
            return Response(serializer.data, status=200)
        else:
            return Response(form.errors, status=400)
