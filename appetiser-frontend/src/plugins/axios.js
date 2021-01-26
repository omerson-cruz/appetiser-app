import axios from "axios";

export const registerApi = axios.create({
  baseURL: "https://api.baseplate.appetiserdev.tech/api/v1/auth/register",
});

export const loginApi = axios.create({
  baseURL: "https://api.baseplate.appetiserdev.tech/api/v1/auth/login",
});
export const checkEmailApi = axios.create({
  baseURL: "https://api.baseplate.appetiserdev.tech/api/v1/auth/check-email",
});

export const verifyApi = axios.create({
  baseURL:
    "https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/verify",
});

export const reverifyApi = axios.create({
  baseURL:
    "https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/resend",
});

export const refreshToken = axios.create({
  baseURL: "https://api.baseplate.appetiserdev.tech/api/v1/auth/refresh",
});
