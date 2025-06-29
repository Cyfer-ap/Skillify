from .models import Notification

def send_notification(user, type, message, link=None):
    Notification.objects.create(
        user=user,
        type=type,
        message=message,
        link=link
    )

