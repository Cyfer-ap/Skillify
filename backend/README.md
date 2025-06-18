# 🛠 Backend — Skillify Tutoring Platform

This directory contains the backend logic of the **Skillify** platform, built using **Django** and **Django REST Framework (DRF)**. It provides a modular, scalable API layer for the frontend and handles all server-side operations, including:

---

## 📌 Key Responsibilities

- User authentication and role management (Tutor, Student, Admin)
- Tutor discovery, profiles, availability, and filtering
- Booking system (real-time + scheduled sessions)
- Session management (status, rescheduling, cancellation)
- Ratings and reviews between tutors and students
- Wallet system, tipping, and Razorpay/Stripe payment flows
- Real-time messaging via Django Channels + Redis
- Media storage for session notes, files, and recordings
- Admin panel for analytics, moderation, and user oversight
- Notifications system (email, SMS, push via Firebase)

---

## 🧱 Structure Overview


```
backend/
├── core/ # Project configuration (settings, urls, ASGI/WGI)
├── users/ # User management (students, tutors, admins)
├── sessions/ # Booking, scheduling, session tracking
├── chat/ # Real-time messaging via Django Channels
├── payments/ # Razorpay/Stripe integration
├── notifications/ # Email, SMS, and push notification triggers
├── reviews/ # Rating and feedback system
├── utils/ # Common helpers and middleware
├── media/ # Uploaded documents, notes, recordings
├── static/ # Static files (admin, dashboard)
└── templates/ # Server-side rendered templates (emails, admin)
```



---

## 🧩 Dependencies

- Django
- djangorestframework
- channels / channels-redis
- python-decouple / django-environ
- django-cors-headers
- Razorpay SDK
- PostgreSQL support via psycopg2

---

For detailed setup and environment configuration, refer to the root-level `README.md`.

