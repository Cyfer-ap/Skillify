
from django.db import models
from accounts.models import CustomUser
from django.utils import timezone

class Subject(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Availability(models.Model):
    teacher = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    platform = models.CharField(max_length=100, blank=True)
    subjects = models.ManyToManyField(Subject, blank=True)
    session_type = models.CharField(max_length=20, choices=[('1v1', '1-on-1'), ('group', 'Group')], default='1v1')
    max_students = models.IntegerField(null=True, blank=True)

    repeat_option = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    language = models.CharField(max_length=100, blank=True)
    grade_level = models.CharField(
        max_length=50,
        choices=[
            ('1-5', 'Grade 1-5'),
            ('6-10', 'Grade 6-10'),
            ('11-12', 'Grade 11-12'),
            ('UG', 'Undergraduate'),
            ('PG', 'Postgraduate')
        ],
        blank=True
    )

    rate_type = models.CharField(max_length=50, choices=[
        ('fixed', 'Fixed'),
        ('per_hour', 'Per Hour'),
        ('per_booking', 'Per Booking')
    ], default='per_booking')
    rate = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    cancellation_policy = models.CharField(max_length=200, blank=True)
    materials_provided = models.BooleanField(default=False)
    booking_deadline_minutes = models.IntegerField(null=True, blank=True)

    tags = models.JSONField(default=list, blank=True)
    prerequisites = models.TextField(blank=True)

    def is_expired(self):
        return timezone.now().date() > self.date

    def __str__(self):
        return f"{self.teacher.username} | {self.date} {self.start_time}-{self.end_time}"


class TutoringSession(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    student = models.ForeignKey(CustomUser, related_name='booked_sessions', on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    teacher = models.ForeignKey(CustomUser, related_name='teaching_sessions', on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    topic = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    cancelled_by = models.CharField(
        max_length=10,
        choices=[('student', 'Student'), ('teacher', 'Teacher')],
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.student.username} -> {self.teacher.username} | {self.date} ({self.status})"

