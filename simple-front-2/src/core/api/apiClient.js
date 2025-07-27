// src/core/api/apiClient.js
import axios from "axios";
import appSettings from "../config/appSettings";

const apiClient = axios.create({
  baseURL: appSettings.api.baseUrl,
  timeout: appSettings.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(appSettings.auth.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(appSettings.auth.tokenKey);
      localStorage.removeItem(appSettings.auth.userKey);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
