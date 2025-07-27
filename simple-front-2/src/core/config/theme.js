// src/core/config/theme.js
export const themeConfig = {
  projectName: import.meta.env.VITE_APP_NAME || "My App",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  projectType: import.meta.env.VITE_PROJECT_TYPE || "default",
};
