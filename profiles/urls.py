from django.urls import path
from .views import MyProfileView, TeacherProfileAPIView

urlpatterns = [
    path('', MyProfileView.as_view(), name='get_or_update_profile'),
    path('teacher/', TeacherProfileAPIView.as_view(), name='teacher-profile'),  # ✅ clean and readable
]
