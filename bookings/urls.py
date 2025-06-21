from django.urls import path
from .views import *

urlpatterns = [
    path('teachers/', ListTeachersAPIView.as_view(), name='list_teachers'),
    path('availability/<int:teacher_id>/', TeacherAvailabilityAPIView.as_view(), name='teacher_availability'),
    path('book/', BookSessionAPIView.as_view(), name='book_session'),
    path('my/', MyBookingsAPIView.as_view(), name='my_bookings'),
    path('update/<int:session_id>/', UpdateBookingStatusAPIView.as_view(), name='update_session_status'),
    path('availability/create/', CreateAvailabilityAPIView.as_view(), name='create_availability'),

]

