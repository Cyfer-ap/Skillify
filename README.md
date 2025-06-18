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
