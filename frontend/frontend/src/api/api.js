import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/accounts/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false  // ✅ Set to true ONLY if using session auth (not needed for JWT)
});

// ✅ Attach Bearer token for protected requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ✅ Auth endpoints (exported)
export const registerUser = (data) => API.post('register/', data);
export const loginUser = (credentials) => API.post('login/', credentials);
