// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 요청 인터셉터: 토큰 자동 주입 (auth or token 모두 지원)
api.interceptors.request.use((config) => {
  let token = null;

  // 케이스 A: { token, user } 형태로 저장된 'auth'
  const rawAuth = localStorage.getItem("auth");
  if (rawAuth) {
    try {
      const parsed = JSON.parse(rawAuth);
      token = parsed?.token || null;
    } catch {}
  }

  // 케이스 B: 'token' 키에 문자열로 저장
  if (!token) token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 처리
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      // 어떤 방식으로 저장했든 모두 정리
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // 앱에 알림 (App.jsx에서 listener 있으면 잡아 처리)
      window.dispatchEvent(new Event("app:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default api;
