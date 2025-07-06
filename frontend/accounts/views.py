from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from notifications.utils import send_notification
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({"message": "Welcome to Skillify API!"})

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # ✅ Send welcome notification & email
            send_notification(
                user=user,
                type="system",
                message=f"Welcome {user.username}! Your Skillify account has been created.",
                link="/",
                email=True,
                subject="🎉 Welcome to Skillify!"
            )

            return Response({
                "message": "User registered successfully",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "role": user.role
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DashboardRedirectView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"role": request.user.role}, status=200)


class StudentDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'student':
            return Response({"detail": "Access denied"}, status=403)
        return Response({"message": "Welcome to Student Dashboard"})


class TeacherDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'teacher':
            return Response({"detail": "Access denied"}, status=403)
        return Response({"message": "Welcome to Teacher Dashboard"})
