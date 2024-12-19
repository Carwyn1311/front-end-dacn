import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data === undefined) {
      console.error("Received undefined response from API");
      return Promise.reject(new Error("API returned undefined"));
    }

    if (typeof response.data === 'string') {
      try {
        response.data = JSON.parse(response.data);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
        return Promise.reject(new Error("Invalid JSON response"));
      }
    }

    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API error:", error.response.status, error.response.data);
    } else {
      console.error("Network or other error", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
