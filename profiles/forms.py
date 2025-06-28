from django import forms
from .models import TeacherProfile, StudentProfile
import json

class BaseOptionalForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.required = False

    def clean(self):
        # Optional override to allow skipping fields
        cleaned_data = super().clean()
        for field in self.fields:
            if self.data.get(field, None) in ["", None] and field not in self.files:
                cleaned_data[field] = getattr(self.instance, field, None)
        return cleaned_data


class TeacherProfileForm(forms.ModelForm):
    class Meta:
        model = TeacherProfile
        exclude = ['user']
        widgets = {
            'dob': forms.DateInput(attrs={'type': 'date'}),
            'bio': forms.Textarea(attrs={'rows': 3}),
            'certifications': forms.Textarea(attrs={'rows': 2}),
            'availability_schedule': forms.Textarea(attrs={'placeholder': 'e.g., {"monday": "9-11am"}'}),
        }



class StudentProfileForm(BaseOptionalForm):
    class Meta:
        model = StudentProfile
        fields = '__all__'

    def clean_subjects_interest(self):
        raw = self.cleaned_data.get('subjects_interest')
        if isinstance(raw, str):
            return [s.strip() for s in raw.split(',') if s.strip()]
        return raw

    def clean_preferred_languages(self):
        raw = self.cleaned_data.get('preferred_languages')
        if isinstance(raw, str):
            return [s.strip() for s in raw.split(',') if s.strip()]
        return raw

    def clean_time_slots(self):
        raw = self.cleaned_data.get('time_slots')
        if isinstance(raw, str):
            return [s.strip() for s in raw.split(',') if s.strip()]
        return raw

    def clean_payment_methods(self):
        raw = self.cleaned_data.get('payment_methods')
        if isinstance(raw, str):
            return [s.strip() for s in raw.split(',') if s.strip()]
        return raw
