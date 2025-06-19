from django.urls import path
from .views import (
    home_view,
    RegisterAPIView,
    DashboardRedirectView,
    StudentDashboardView,
    TeacherDashboardView, MyTokenObtainPairView,
)

urlpatterns = [
    path('', home_view, name='home'),
    path('register/', RegisterAPIView.as_view(), name='register_api'),
    path('login/', MyTokenObtainPairView.as_view(), name='login_api'),
    path('dashboard/', DashboardRedirectView.as_view(), name='dashboard_redirect'),
    path('dashboard/student/', StudentDashboardView.as_view(), name='student_dashboard'),
    path('dashboard/teacher/', TeacherDashboardView.as_view(), name='teacher_dashboard'),
]
