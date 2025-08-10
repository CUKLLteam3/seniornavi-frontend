// src/App.jsx
import React, { useEffect, useState } from "react";
import LoginScreen from "./components/screens/LoginScreen.jsx";
import SignupScreen from "./components/screens/SignupScreen.jsx";
import HomeScreen from "./components/screens/HomeScreen.jsx";
import ResumeScreen from "./components/screens/Resume.jsx";
import { VoiceGuide } from "./components/layout/VoiceGuide.jsx";
import SurveyWizard from "./components/screens/SurveyWizard.jsx"; 

// 전역 스타일
import "./styles/globals.css";
// ★ 공통 프레임(412px) 고정 레이아웃
import "./styles/layout.css";

export default function App() {
  // 개발 중: 무조건 로그인부터 시작
  const [currentPage, setCurrentPage] = useState("login");

  const [currentUser, setCurrentUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  // 토큰/유저 값 캐싱
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogin = (data) => {
    const user = { name: "홍길동", phone: data?.phone ?? null };
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    setCurrentPage("home");
  };

  const handleSignup = () => setCurrentPage("signup");
  const handleBackToLogin = () => setCurrentPage("login");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setCurrentPage("login");
  };
  const handleNavigate = (screen) => setCurrentPage(screen);

  // 홈 진입 가드
  useEffect(() => {
    if (currentPage === "home") {
      if (!token || !storedUser) {
        setCurrentPage("login");
        return;
      }
      if (!currentUser) setCurrentUser(JSON.parse(storedUser));
    }
  }, [currentPage, currentUser, token, storedUser]);

  return (
    // ★ 모든 화면을 412px 프레임으로 감싸기
    <div className="app-shell">
      <main className="frame">
        <VoiceGuide />

        {/* 개발 편의: 한 번 클릭으로 초기화 (뷰포트 기준 fixed라 프레임 밖에 떠도 OK) */}
        <ResetLocalStorage
          onReset={() => {
            localStorage.clear();
            setCurrentUser(null);
            setCurrentPage("login");
          }}
        />

        {currentPage === "login" && (
          <LoginScreen
            onLogin={handleLogin}
            onSignup={handleSignup}
            onForgotPassword={() => alert("비밀번호 찾기 준비중")}
          />
        )}

        {currentPage === "signup" && <SignupScreen onBack={handleBackToLogin} />}

        {/* 렌더 가드: 토큰+유저가 있을 때만 홈 렌더 */}
        {currentPage === "home" && token && storedUser && (
          <HomeScreen
            user={currentUser || JSON.parse(storedUser)}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {currentPage === "resume" && (
          <ResumeScreen
            onNavigate={handleNavigate}
            onStart={() => alert("설문 시작!")}
          />
        )}

        {currentPage === "resume" && (
          <ResumeScreen
            onNavigate={handleNavigate}
            onStart={() => setCurrentPage("survey")}   // ★ 설문 진입
          />
        )}

        {currentPage === "survey" && (
          <SurveyWizard
            onDone={() => setCurrentPage("home")}      // 완료 후 홈으로
            onBackHome={() => setCurrentPage("home")}
          />
        )}
      </main>
    </div>
  );
}

/* 개발 편의용: 로컬스토리지 초기화 버튼 (임시) */
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
