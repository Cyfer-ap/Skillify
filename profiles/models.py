from django.db import models
from accounts.models import CustomUser

class TeacherProfile(models.Model):
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
        ("non-binary", "Non-binary"),
        ("prefer_not_to_say", "Prefer not to say"),
    ]
    MODE_CHOICES = [("online", "Online"), ("offline", "Offline"), ("hybrid", "Hybrid")]
    CANCEL_CHOICES = [
        ("12hr", "Up to 12 hrs before"),
        ("24hr", "Up to 24 hrs before"),
        ("non-refundable", "Non-refundable")
    ]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to="teacher_profiles/", blank=True, null=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, blank=True)
    dob = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)

    subjects = models.TextField(blank=True, help_text="Comma-separated subjects")
    grade_levels = models.TextField(blank=True)
    languages = models.TextField(blank=True)
    experience_years = models.PositiveIntegerField(blank=True, null=True)
    certifications = models.TextField(blank=True)
    bio = models.TextField(blank=True)

    teaching_mode = models.CharField(max_length=10, choices=MODE_CHOICES, blank=True)
    rate = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    availability_schedule = models.JSONField(blank=True, null=True)
    instant_booking = models.BooleanField(default=False)
    max_students = models.PositiveIntegerField(default=1)
    platform = models.CharField(max_length=100, blank=True)

    materials_provided = models.BooleanField(default=False)
    tags = models.TextField(blank=True)
    cancellation_policy = models.CharField(max_length=30, choices=CANCEL_CHOICES, blank=True)
    booking_deadline = models.PositiveIntegerField(blank=True, null=True, help_text="Minimum minutes before session start to book.")
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Teacher Profile"


class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(upload_to='student_profiles/', null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    guardian_name = models.CharField(max_length=100, blank=True)
    subjects_interest = models.JSONField(default=list, blank=True)
    grade_level = models.CharField(max_length=50, blank=True)
    goals = models.TextField(blank=True)
    preferred_languages = models.JSONField(default=list, blank=True)
    time_slots = models.JSONField(default=list, blank=True)
    learning_mode = models.CharField(max_length=20, choices=[('online', 'Online'), ('offline', 'In-person'), ('hybrid', 'Hybrid')], blank=True)
    learning_history = models.JSONField(default=list, blank=True)
    bookmarks = models.JSONField(default=list, blank=True)
    payment_methods = models.JSONField(default=list, blank=True)
    reviews_given = models.JSONField(default=list, blank=True)
