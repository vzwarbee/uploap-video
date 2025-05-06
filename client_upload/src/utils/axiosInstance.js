// utils/axiosInstance.js
import axios from 'axios';
export const tokenStorage = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // đổi theo API server của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gắn token từ localStorage cho mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi 401 nếu cần (tùy chọn)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
