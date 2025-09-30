export const API_URLS: {
  BaseURL: string;
  LOGIN: string;
  LOGOUT: string;
  SIGNUP: string;
  VERIFY_OTP: string;
  RESEND_OTP: string;
  ASK: string;
  RESET_PASSWORD: string;
  CHANGE_PASSWORD: string;
  EDIT_PROFILE: string;
  GET_AVATARS: string;
  SOCIAL_LOGIN: string;
  DELETE_ACCOUNT: string;
  VALIDATE_TOKEN: string;
  GET_CONVERSATIONS: string;
  GET_MESSAGES: string;
} = {
  // BaseURL: "https://sci.5stardesigners.net:5029/dev/api/v1",
  BaseURL: "https://vps-24bb0d6f.vps.ovh.ca:3006/production/api/v1",
  LOGIN: "auth/login",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
  VERIFY_OTP: "/auth/verify-otp",
  RESEND_OTP: "/auth/resend-otp",
  ASK: "/chat/ask",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
  EDIT_PROFILE: "/user",
  GET_AVATARS: "/user/avatars",
  SOCIAL_LOGIN: "/auth/social-login",
  DELETE_ACCOUNT: '/user',
  VALIDATE_TOKEN: '/user',
  GET_CONVERSATIONS: '/chat/conversations',
  GET_MESSAGES: '/chat/conversations' // Using user endpoint to validate token
};
