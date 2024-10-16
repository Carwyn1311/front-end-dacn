import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

// Tạo một instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'https://chat-api-backend-x4dl.onrender.com',
});

// Interceptor cho các yêu cầu
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    // Nếu có token, thêm vào header Authorization
    if (token) {
      config.headers = config.headers || {} as AxiosHeaders; // Đảm bảo headers không bị undefined
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi khi gửi yêu cầu
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor cho các phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    // Trả về phản hồi thành công
    return response;
  },
  async (error) => {
    // Xử lý lỗi trong phản hồi
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized, redirecting to login...');
        // Thực hiện hành động chuyển hướng đến trang đăng nhập nếu cần
        // window.location.href = '/login'; // Uncomment if needed
      } else {
        console.error('Response error:', error.response);
      }
    } else {
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
