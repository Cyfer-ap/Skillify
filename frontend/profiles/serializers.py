from rest_framework import serializers
from .models import TeacherProfile, StudentProfile


# profiles/serializers.py

class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = '__all__'
        extra_kwargs = {field: {'required': False, 'allow_null': True, 'allow_blank': True}
                        for field in model._meta.get_fields()
                        if hasattr(field, 'blank') and field.name != 'user'}



class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'
