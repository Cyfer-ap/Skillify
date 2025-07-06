# 🛠 Skillify Project Setup Guide

This guide will walk you through setting up the full-stack **Skillify tutoring platform**, including both the **Django backend** and **React frontend**.

---



---

## 🚀 Backend Setup (Django)


```bash
python -m venv venv
venv\Scripts\activate     # Windows

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver
```


> 🚀 Server will run at: `http://127.0.0.1:8000`

---

## ⚛️ Frontend Setup (React)

### 1. Navigate to the frontend folder
```bash
cd ../frontend
```

### 2. Install frontend dependencies
```bash
npm install

```

### 3. Start the Vite development server
```bash
npm run dev

```

> 🌐 Frontend will run at: `http://localhost:5173`

---
