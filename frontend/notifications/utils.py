from .models import Notification
from django.core.mail import send_mail
from django.conf import settings


def send_notification(user, type, message, link=None, email=False, subject=None):
    """
    Creates an in-app notification and optionally sends an email.
    """
    # Save in-app notification
    Notification.objects.create(
        user=user,
        type=type,
        message=message,
        link=link
    )

    # Optionally send email
    if email and user.email:
        send_email_notification(
            subject=subject or "🔔 You have a new notification",
            message=message,
            recipient_list=[user.email]
        )


def send_email_notification(subject, message, recipient_list, html_message=None):
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipient_list,
            fail_silently=False,
            html_message=html_message
        )
        return True
    except Exception as e:
        print(f"Email failed: {e}")
        return False
