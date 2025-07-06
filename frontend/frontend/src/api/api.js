import axios from 'axios';
import { refreshToken } from '../utils/authUtils'; // Your refreshToken function

// -----------------------------
// 🔐 ACCOUNTS API
// -----------------------------
const AccountsAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/accounts/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// -----------------------------
// 📅 BOOKINGS API
// -----------------------------
const BookingsAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/bookings/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// -----------------------------
// 🔔 NOTIFICATIONS API
// -----------------------------
const NotificationsAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/notifications/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// -----------------------------
// ✅ SHARED INTERCEPTORS
// -----------------------------
[AccountsAPI, BookingsAPI, NotificationsAPI].forEach((api) => {
  // Attach access token to every request
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle 401 errors (token expired) with refresh flow
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccess = await refreshToken();
        if (newAccess) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest); // Retry request
        }
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
      return Promise.reject(error);
    }
  );
});

// -----------------------------
// ✅ Exported Auth Endpoints
// -----------------------------
export const registerUser = (data) => AccountsAPI.post('register/', data);
export const loginUser = (credentials) => AccountsAPI.post('login/', credentials);

// -----------------------------
// ✅ Booking System Endpoints
// -----------------------------
export const fetchTeachers = () => BookingsAPI.get('teachers/');
export const fetchAvailability = (teacherId) => BookingsAPI.get(`availability/${teacherId}/`);
export const bookSession = (data) => BookingsAPI.post('book/', data);
export const fetchMyBookings = () => BookingsAPI.get('my/');
export const updateSessionStatus = (id, status) => BookingsAPI.patch(`update/${id}/`, { status });
export const fetchMyAvailability = () => BookingsAPI.get('availability/my/');
export const fetchAllAvailableSlots = () => BookingsAPI.get("availability/all/");
export const fetchTeacherSessions = () => BookingsAPI.get('teacher-sessions/');

// -----------------------------
// ✅ Notification API Endpoints
// -----------------------------
export const fetchNotifications = () => NotificationsAPI.get('/');
