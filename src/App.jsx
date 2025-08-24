// src/App.jsx
import React, { useEffect, useState } from "react";

import LoginScreen from "./components/screens/LoginScreen.jsx";
import SignupScreen from "./components/screens/SignupScreen.jsx";
import HomeScreen from "./components/screens/HomeScreen.jsx";
import ResumeScreen from "./components/screens/Resume.jsx";
import SurveyWizard from "./components/screens/SurveyWizard.jsx";
import SurveyComplete from "./components/screens/SurveyComplete.jsx";
import MyPage from "./components/screens/MyPage.jsx";

import BottomTabBar from "./components/layout/BottomNavigation.jsx";
import BottomNavigation from "./components/layout/BottomNavigation.jsx";
import StatusBar from "./components/layout/StatusBar.jsx";

import ResumeEditor from "./components/screens/ResumeEditor.jsx";

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

  /* 새로고침/재방문 시 자동 복원 (로그인 화면일 때만 시도)
  useEffect(() => {
    if (currentPage !== "login") return;
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) {
      try {
        setCurrentUser(JSON.parse(u));
        setCurrentPage("home");
      } catch {
        // 파싱 실패 시 무시
      }
    }
  }, [currentPage]);*/

  // 화면 전환 핸들러
  const handleNavigate = (screen) => setCurrentPage(screen);

  // 로그인 완료
  const handleLogin = (data) => {
    const user = {
      id: data?.user?.id ?? data?.id ?? 1, // ← 없으면 임시로 1
      name: data?.user?.name ?? "홍길동",
      phone: data?.user?.phone ?? data?.phone ?? null,
    };
    const token = data?.token || "fake-token";
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    setCurrentPage("home");
  };

  // 회원가입 완료 → 자동 로그인 처리
  const handleSignupSuccess = (data) => {
    handleLogin(data);
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

  // 인증 가드
  useEffect(() => {
    const protectedPages = ["home", "mypage", "resume", "survey", "surveyDone"];
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

  // 탭바 노출 페이지
  const tabPages = new Set(["home", "mypage", "resume", "survey", "surveyDone", "resumeEditor"]);

 return (
    <div className="app-shell">
      <main className="frame">
        {/* ===== 화면 렌더링 ===== */}
        {currentPage === "login" && (
          <LoginScreen
            onLogin={handleLogin}
            onSignup={handleSignup}
            onForgotPassword={() => alert("비밀번호 찾기 준비중")}
          />
        )}

        {currentPage === "signup" && (
          <SignupScreen onBack={handleBackToLogin} onSignup={handleSignupSuccess} />
        )}

        {currentPage === "home" && (
          <HomeScreen
            user={currentUser}               // ✅ 간소화: localStorage 재조회 제거
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

         {currentPage === "mypage" && (
           <MyPage onLogout={handleLogout} onNavigate={handleNavigate} />
        )}

        {currentPage === "resume" && (
          <ResumeScreen
            onNavigate={handleNavigate}
            onStart={() => setCurrentPage("survey")}
          />
        )}

        {currentPage === "survey" && (
          <SurveyWizard
            onBackHome={() => setCurrentPage("home")}
            onSubmitDone={() => setCurrentPage("surveyDone")}
          />
        )}

        {currentPage === "surveyDone" && (
          <SurveyComplete
            onGoHome={() => setCurrentPage("home")}
            onGoCoach={() => alert("AI 코치 상담은 준비중입니다")}
          />

        )}
                {/* ResumeEditor */}
        {currentPage === "resumeEditor" && (
          <ResumeEditor onNavigate={handleNavigate} />
        )}

        {/* ===== 공용 하단 탭바 (로그인/회원가입 제외) ===== */}
        {tabPages.has(currentPage) && (
          <BottomTabBar currentPage={currentPage} onNavigate={handleNavigate} />
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

/* 개발 편의용: 로컬스토리지 초기화 버튼
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
}*/
