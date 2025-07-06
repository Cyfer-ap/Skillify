// utils/authUtils.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return null;

    const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh,
    });

    localStorage.setItem('access', res.data.access);
    return res.data.access;
  } catch (err) {
    console.error("Refresh token failed", err);
    return null;
  }
};

