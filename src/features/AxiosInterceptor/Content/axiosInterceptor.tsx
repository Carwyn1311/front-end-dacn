import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ErrorMessage from '../../errorCodes/Content/ErrorMessage';

interface ErrorContextType {
  error: string | null
  setError: (message: string | null) => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (context == null) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

// Tạo provider để quản lý lỗi
export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      {(error != null) && <ErrorMessage message={error} />}
    </ErrorContext.Provider>
  );
};

// Tạo instance của Axios với Interceptor
const axiosInstance = axios.create({
  baseURL: 'https://training-api-timesheet.nccsoft.vn/swagger/v1/swagger.json',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json' // Thêm header nếu cần
  }
});

// Interceptor cho yêu cầu (request)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => await Promise.reject(error) // Không cần await cho Promise.reject
);

// Interceptor cho phản hồi (response)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response != null ? error.response.status : null;
    const errorMessage = statusCode != null
      ? `Error ${String(statusCode)}: ${String(error.response?.data?.message ?? 'Something went wrong')}`
      : 'Network error. Please check your connection.';

    const errorContext = useContext(ErrorContext);
    if (errorContext != null) {
      errorContext.setError(errorMessage);
    }

    return await Promise.reject(error); // Không cần await cho Promise.reject
  }
);

export default axiosInstance;
