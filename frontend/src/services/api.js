import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
    (config) => {
        // Lấy token từ Local Storage
        const token = localStorage.getItem('access_token');
        
        // Nếu có token, tự động gắn vào Header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;