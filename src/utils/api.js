// src/utils/api.js
import axios from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false, // 쿠키 인증이면 true
});

if (import.meta.env.DEV) {
  // 디버그에 baseURL이 콘솔에 찍혀야 정상
  console.log("[api] baseURL =", api.defaults.baseURL);
}

export default api;
