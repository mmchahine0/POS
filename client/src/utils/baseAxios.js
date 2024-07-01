import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_PORT || 'http://127.0.0.1:4000',
  headers: {
    'Content-Type': "application/json",
    'timeout': 1000,
  },
});

export default axiosInstance;
