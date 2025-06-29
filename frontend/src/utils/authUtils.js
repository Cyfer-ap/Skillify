// utils/authUtils.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return null;

    const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
      refresh: refresh,
    });

    const newAccess = response.data.access;
    localStorage.setItem('access', newAccess);
    return newAccess;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};
