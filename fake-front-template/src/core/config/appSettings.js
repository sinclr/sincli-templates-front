// src/core/config/appSettings.js
import { themeConfig } from "./theme";

// Configuration globale de l'application
const appSettings = {
  appName: themeConfig.projectName,
  version: themeConfig.version,
  projectType: themeConfig.projectType,

  // Configuration API
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
    timeout: 30000, // 30 secondes
  },

  // Configuration Auth
  auth: {
    tokenKey: "auth_token",
    userKey: "user_data",
  },

  // Configuration Storage
  storage: {
    themeKey: "theme_preference",
    preferencesKey: "user_preferences",
  },

  // Autres configurations
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    enableDebugMode:
      import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEBUG === "true",
  },
};

export default appSettings;
