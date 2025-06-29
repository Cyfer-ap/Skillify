# bookings/admin.py
from django.contrib import admin
from .models import Subject, Availability, TutoringSession

admin.site.register(Subject)
admin.site.register(Availability)
admin.site.register(TutoringSession)

