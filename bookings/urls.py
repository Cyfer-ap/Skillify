from django.urls import path
from .views import *
from .models import Subject
from .serializers import SubjectSerializer
from rest_framework.generics import ListAPIView



class SubjectListAPIView(ListAPIView):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()
    permission_classes = [permissions.IsAuthenticated]

urlpatterns = [
    path('teachers/', ListTeachersAPIView.as_view(), name='list_teachers'),
    path('availability/<int:teacher_id>/', TeacherAvailabilityAPIView.as_view(), name='teacher_availability'),
    path('book/', BookSessionAPIView.as_view(), name='book_session'),
    path('my/', MyBookingsAPIView.as_view(), name='my_bookings'),
    path('update/<int:session_id>/', UpdateBookingStatusAPIView.as_view(), name='update_session_status'),
    path('availability/create/', CreateAvailabilityAPIView.as_view(), name='create_availability'),
    path('subjects/', SubjectListAPIView.as_view(), name='list_subjects'),
    path('availability/my/', MyAvailabilityAPIView.as_view(), name='my_availability'),
    path('my-slots/', MyAvailabilityAPIView.as_view(), name='my_slots'),
    path("multi-book/", MultiBookAPIView.as_view(), name="multi-book"),
    path("availability/all/", AllAvailabilityAPIView.as_view(), name="all-availability"),
    path('teacher-sessions/', TeacherSessionsAPIView.as_view(), name='teacher_sessions'),
]

