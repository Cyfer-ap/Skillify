# 🎨 Frontend — Skillify Tutoring Platform

This directory contains the frontend application of **Skillify**, built using **React** and styled with **Tailwind CSS**. It consumes backend APIs via REST and WebSockets, offering a smooth and modern user experience for both students and tutors.

---
{
 BY REETESH - :


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
├── tailwind.config.js
├── vite.config.js / webpack.config.js
└── package.json
```


---

## 🎨 Tools & Libraries

- React (SPA architecture)
- React Router DOM
- Axios (API calls)
- Tailwind CSS (utility-first styling)
- Zustand / Context API (state management)
- Firebase (push notifications)
- Razorpay / Stripe (payments)
- Zoom SDK / Jitsi / Daily.co (video calls)

---

Refer to the root-level `README.md` for setup, environment variables, and development instructions.


