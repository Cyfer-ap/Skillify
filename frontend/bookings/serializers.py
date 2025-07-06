from rest_framework import serializers
from accounts.models import CustomUser
from .models import Availability, TutoringSession, Subject


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']



class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'bio', 'phone']


class AvailabilitySerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)
    subject_ids = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all(), many=True, write_only=True)

    class Meta:
        model = Availability
        fields = '__all__'
        read_only_fields = ['teacher']

    def validate(self, data):
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError("End time must be after start time.")
        return data

    def create(self, validated_data):
        subject_ids = validated_data.pop('subject_ids', [])
        availability = Availability.objects.create(**validated_data)
        availability.subjects.set(subject_ids)
        return availability


# ✅ Serializer for GET responses
class TutoringSessionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    teacher_name = serializers.CharField(source='teacher.username', read_only=True)

    class Meta:
        model = TutoringSession
        fields = [
            'id', 'student', 'student_name', 'teacher', 'teacher_name',
            'date', 'start_time', 'end_time', 'topic', 'status', 'created_at',
            'cancelled_by',
        ]


# ✅ Serializer for POST booking
class BookSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutoringSession
        fields = ['teacher', 'date', 'start_time', 'end_time', 'topic']

    def validate(self, data):
        teacher = data['teacher']
        student = self.context['request'].user
        date = data['date']
        start = data['start_time']
        end = data['end_time']

        if start >= end:
            raise serializers.ValidationError("End time must be after start time.")

        # 🚫 Check teacher conflicts
        if TutoringSession.objects.filter(
            teacher=teacher,
            date=date,
            start_time__lt=end,
            end_time__gt=start
        ).exists():
            raise serializers.ValidationError("Teacher already has a session during this time.")

        # 🚫 Check student conflicts
        if TutoringSession.objects.filter(
            student=student,
            date=date,
            start_time__lt=end,
            end_time__gt=start
        ).exists():
            raise serializers.ValidationError("You already have a session during this time.")

        return data

    def create(self, validated_data):
        validated_data['student'] = self.context['request'].user
        return TutoringSession.objects.create(**validated_data)

