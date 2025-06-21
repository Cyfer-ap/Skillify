from django.urls import path
from .views import MyProfileView

urlpatterns = [
    path('', MyProfileView.as_view(), name='get_or_update_profile'),
]
