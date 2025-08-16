import axios from 'axios';
import { clientCookies } from './cookies';

const API_BASE_URL = 'https://website-iplant-tech.onrender.com/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = clientCookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = clientCookies.get('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          clientCookies.set('access_token', access);
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token failed, redirect to login
          clientCookies.remove('access_token');
          clientCookies.remove('refresh_token');
          clientCookies.remove('user');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/login/', {
      email,
      password,
    });
    
    const { access, refresh, user } = response.data;
    
    // Store tokens and user data in cookies
    clientCookies.set('access_token', access);
    clientCookies.set('refresh_token', refresh);
    clientCookies.set('user', JSON.stringify(user));
    
    return response.data;
  },
  
  refreshToken: async (refreshToken) => {
    const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    
    const { access } = response.data;
    clientCookies.set('access_token', access);
    
    return response.data;
  },
  
  logout: () => {
    clientCookies.remove('access_token');
    clientCookies.remove('refresh_token');
    clientCookies.remove('user');
  },
  
  getCurrentUser: () => {
    const user = clientCookies.get('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!clientCookies.get('access_token');
  },
  
  getAccessToken: () => {
    return clientCookies.get('access_token');
  },
  
  getRefreshToken: () => {
    return clientCookies.get('refresh_token');
  },
};

export default api;
