// src/utils/api.js
import axios from "axios";

// .env에 없으면 도메인 기본값으로
const FALLBACK_BASE = "https://api-bytecookie.click";
const baseURL = (import.meta.env.VITE_API_BASE_URL || FALLBACK_BASE).replace(/\/$/, "");

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false, // 쿠키 인증이면 true
});

// ✅ 매 요청마다 Bearer 토큰 자동 첨부
api.interceptors.request.use((config) => {
  try {
    const token =
      JSON.parse(localStorage.getItem("auth") || "null")?.token ||
      JSON.parse(localStorage.getItem("user") || "null")?.token ||
      localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {}
  return config;
});

// (선택) 401 공통 로깅
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.warn("[api] 401 Unauthorized – 로그인 필요");
    }
    return Promise.reject(err);
  }
);

if (import.meta.env.DEV) {
  console.log("[api] baseURL =", api.defaults.baseURL);
}

export default api;
