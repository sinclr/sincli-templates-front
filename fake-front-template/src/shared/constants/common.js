// src/shared/constants/common.js
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  THEME: "theme_preference",
};

export const ROUTES = {
  HOME: "/",
  SETTINGS: "/settings",
  USER: "/user",
  LOGIN: "/login",
};
