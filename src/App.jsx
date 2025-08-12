// src/App.jsx
import React, { useEffect, useState } from "react";

import LoginScreen from "./components/screens/LoginScreen.jsx";
import SignupScreen from "./components/screens/SignupScreen.jsx";
import HomeScreen from "./components/screens/HomeScreen.jsx";
import ResumeScreen from "./components/screens/Resume.jsx";
import SurveyWizard from "./components/screens/SurveyWizard.jsx";
import MyPage from "./components/screens/MyPage.jsx";

import BottomTabBar from "./components/layout/BottomNavigation.jsx"; // ✅ 공용 탭바

// 전역 스타일
import "./styles/globals.css";
import "./styles/layout.css";

export default function App() {
  // 개발 중: 로그인부터 시작
  const [currentPage, setCurrentPage] = useState("login");

  // 로그인 유저 캐시
  const [currentUser, setCurrentUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  // 페이지 전환 시 스크롤 상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // 화면 전환 핸들러
  const handleNavigate = (screen) => {
    setCurrentPage(screen);
  };

  // 로그인 완료
  const handleLogin = (data) => {
    const user = { name: "홍길동", phone: data?.phone ?? null };
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    setCurrentPage("home");
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setCurrentPage("login");
  };

  const handleSignup = () => setCurrentPage("signup");
  const handleBackToLogin = () => setCurrentPage("login");

  // 인증 가드: 보호 화면은 토큰/유저 없으면 로그인으로
  useEffect(() => {
    const protectedPages = ["home", "mypage", "resume", "survey"];
    if (!protectedPages.includes(currentPage)) return;

    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (!t || !u) {
      setCurrentPage("login");
      return;
    }
    if (!currentUser) {
      try {
        setCurrentUser(JSON.parse(u));
      } catch {
        setCurrentPage("login");
      }
    }
  }, [currentPage, currentUser]);

  // 탭바가 보여질 화면만 지정 (로그인/회원가입에는 X)
  const tabPages = new Set(["home", "mypage","resume","survey"]);

  return (
    <div className="app-shell">
      <main className="frame">
        {/* 개발 편의: 로컬스토리지 초기화 */}
        <ResetLocalStorage
          onReset={() => {
            localStorage.clear();
            setCurrentUser(null);
            setCurrentPage("login");
          }}
        />

        {/* ===== 화면 렌더링 ===== */}
        {currentPage === "login" && (
          <LoginScreen
            onLogin={handleLogin}
            onSignup={handleSignup}
            onForgotPassword={() => alert("비밀번호 찾기 준비중")}
          />
        )}

        {currentPage === "signup" && (
          <SignupScreen onBack={handleBackToLogin} />
        )}

        {currentPage === "home" && (
          <HomeScreen
            user={
              currentUser ||
              (localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user"))
                : null)
            }
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {currentPage === "mypage" && (
          <MyPage onLogout={handleLogout} />
        )}

        {currentPage === "resume" && (
          <ResumeScreen
            onNavigate={handleNavigate}
            onStart={() => setCurrentPage("survey")}
          />
        )}

        {currentPage === "survey" && (
          <SurveyWizard
            onDone={() => setCurrentPage("home")}
            onBackHome={() => setCurrentPage("home")}
          />
        )}

        {/* ===== 공용 하단 탭바 (로그인/회원가입 외 화면에서만) ===== */}
        {tabPages.has(currentPage) && (
          <BottomTabBar
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        )}

        {/* 개발용 디버그 뱃지 */}
        {import.meta.env.DEV && (
          <div
            style={{
              position: "fixed",
              right: 8,
              top: 8,
              zIndex: 9999,
              background: "#000",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: 6,
              fontSize: 12,
            }}
          >
            page: {currentPage}
          </div>
        )}
      </main>
    </div>
  );
}

/* 개발 편의용: 로컬스토리지 초기화 버튼 */
function ResetLocalStorage({ onReset }) {
  return (
    <button
      onClick={onReset}
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        zIndex: 9999,
        padding: "6px 8px",
        fontSize: 12,
        borderRadius: 6,
        border: "1px solid #e5e7eb",
        background: "#fff",
        cursor: "pointer",
      }}
      title="로컬저장소 초기화"
    >
      초기화
    </button>
  );
}
