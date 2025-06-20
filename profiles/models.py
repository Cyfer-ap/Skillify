from django.db import models
from accounts.models import CustomUser

class TeacherProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(upload_to='teacher_profiles/', null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    subjects = models.JSONField(default=list, blank=True)
    grade_levels = models.JSONField(default=list, blank=True)
    languages = models.JSONField(default=list, blank=True)
    experience = models.TextField(blank=True)
    certifications = models.TextField(blank=True)
    availability = models.JSONField(default=dict, blank=True)
    rate = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    mode = models.CharField(max_length=20, choices=[('online', 'Online'), ('offline', 'In-person'), ('hybrid', 'Hybrid')], blank=True)
    bio = models.TextField(blank=True)

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
