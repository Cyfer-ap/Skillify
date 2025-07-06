<<<<<<< HEAD
# 🎓 Skillify — 1-on-1 Tutoring Platform

**Skillify** is a full-stack web platform designed for personalized, real-time 1-on-1 tutoring sessions and live group classes. It supports **instant or scheduled bookings**, **video conferencing**, **wallet-based payments**, and **collaborative tools** like whiteboards and chat. Inspired by Uber’s on-demand model, Skillify aims to transform how students and tutors connect globally.

---

## 🧩 Features

- Real-time tutor discovery and booking
- Live video/audio/text chat sessions
- Instant or scheduled 1-on-1 or group classes
- Wallet payments, tipping, and billing
- Session notes, whiteboard, and chat history
- Reviews, ratings, referral rewards
- Push/email/SMS notifications
- Tutor/student dashboards
- Admin panel with moderation and analytics

---

## 🛠 Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| **Frontend**  | React, Tailwind CSS                              |
| **Backend**   | Django, Django REST Framework                    |
| **Database**  | PostgreSQL (supports structured + JSON data)     |
| **Real-Time** | Django Channels, Redis                           |
| **Media**     | Cloudflare R2 / AWS S3                           |
| **Video**     | Zoom SDK / Jitsi / Daily.co                      |
| **Payments**  | Razorpay (India), Stripe                         |
| **Notifications** | Firebase (push), SendGrid (email), Twilio (SMS) |
| **Deployment**| Docker, Render/Fly.io + CI/CD                    |

---

## 🚀 Getting Started (Local Development)

### 🔁 Clone the Repository

```bash
git clone https://github.com/Cyfer-ap/Skillify.git
cd Skillify
```

---

### 📦 Backend Setup (Django)

1. **Create virtual environment**

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. **Install dependencies**

```bash
pip install -r requirements.txt
```

3. **Create `.env` file**

Create a `.env` file in the project root with variables like(skip for now):

```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgres://username:password@localhost:5432/skillify
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

4. **Run migrations and start server**

```bash
pyhton manage.py makemigrations
python manage.py migrate
python manage.py runserver 
```

---

### ⚛️ Frontend Setup (React)

Assuming frontend is in a subdirectory (e.g., `/frontend`):

(Yet to be setup, all the work to be done inside frontend folder)  

```bash
cd frontend
npm install
npm run dev  # or npm start, depending on setup
```

---

### 💬 Redis & WebSocket Support

not needed, Skip for now

Make sure Redis is installed and running for Django Channels:

```bash
# On Linux/macOS
redis-server

# On Windows, use WSL or install Redis via Docker:
docker run -p 6379:6379 redis
```

---

## 📁 Project Structure (High-Level)

```
Skillify/
├── backend/ (Django apps, APIs)
├── frontend/ (React components, pages)
├── media/ (user uploads, notes)
├── static/ (compiled CSS/JS)
├── templates/ (Django templates)
├── .env.example
├── requirements.txt
├── README.md
```

---

## ✅ To Do (Planned Features)

- [ ] Tutor availability map and real-time indicators
- [ ] Wallet recharge via Razorpay
- [ ] Session recording playback
- [ ] Session cancellation/reschedule policies
- [ ] Multi-language and accessibility support

---

## 📜 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

## 🤝 Contributions & Issues

Pull requests, bug reports, and feature suggestions are welcome!

📧 Contact: [abhinavpathak789@gmail.com](https://github.com/Cyfer-ap)
=======
# 🎨 Frontend — Skillify Tutoring Platform

This directory contains the frontend application of **Skillify**, built using **React** and styled with **Bootstrap**. It consumes backend APIs via REST and WebSockets, offering a smooth and modern user experience for both students and tutors.

---
{
 BY REETESH - :

    BASIC REQUIREMENT : HTML , CSS , JS , REACT , BOOTSTRAP .
}

## 🎯 Main Features

- Real-time tutor discovery with filters and search
- Booking interface (instant or scheduled)
- Whiteboard, notes, and file sharing in-session
- Zoom/Jitsi/Daily video conferencing integration
- Wallet system and payment checkout
- Dashboards for tutor and student performance tracking
- Group class discovery and enrollment
- Notification center and chat interface
- Ratings, reviews, referral rewards

---

-----------------------------------------------------------------------------------------
## 🧱 Structure Overview
 
```
frontend/
├── src/
│ ├── components/ # Reusable UI elements
│ ├── pages/ # Route-level components (dashboard, profile, etc.)
│ ├── api/ # Axios configs and API calls
│ ├── hooks/ # Custom React hooks
│ ├── context/ # Auth, notifications, theme context
│ ├── utils/ # Utility functions (formatting, date, etc.)
│ ├── assets/ # Icons, images, logos
│ └── App.jsx # Main component
├── public/ # index.html, favicon, etc.
├── bootstrap.config.js
├── vite.config.js / webpack.config.js
└── package.json

yaml
Copy
Edit


```


-----------------------------------------------------------------------------------------

---

## 🎨 Tools & Libraries

- React (SPA architecture)
- React Router DOM
- Axios (API calls)
- Bootstrap (component-based styling)
- Zustand / Context API (state management)
- Firebase (push notifications)
- Razorpay / Stripe (payments)
- Zoom SDK / Jitsi / Daily.co (video calls)

---

Refer to the root-level `README.md` for setup, environment variables, and development instructions.
>>>>>>> 2afe4d0 (Initial commit to Reetesh branch)
