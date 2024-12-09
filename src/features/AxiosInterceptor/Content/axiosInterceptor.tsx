import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy JWT từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.error('Unauthorized, redirecting to login...', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
