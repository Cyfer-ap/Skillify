from django.db import models
from accounts.models import CustomUser

class Availability(models.Model):
    teacher = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

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

    def __str__(self):
        return f"{self.student.username} -> {self.teacher.username} | {self.date} ({self.status})"
