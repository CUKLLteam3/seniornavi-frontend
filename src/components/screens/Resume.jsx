import React from "react";
import "./resume.css";

export default function ResumeScreen({ onNavigate, onStart }) {
  const handleStart = () => {
    if (onStart) onStart();
    else alert("설문 시작! (onStart 콜백 연결 가능)");
  };

  return (
    <div className="resume-page">
      {/* 상단 헤더 */}
      <header className="resume-header">
        <button
          className="back-btn"
          aria-label="뒤로"
          onClick={() => onNavigate?.("home")}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#111" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </header>

      {/* 본문 */}
      <main className="resume-body">
        <div className="resume-hero">
          <div className="resume-penguin" role="img" aria-label="펭귄">🐧</div>
        </div>

        <h1 className="resume-title">Re-fly 이력 등록하기</h1>
        <p className="resume-sub">약 3분, 8단계 질문으로 뚝딱!</p>

        <button className="resume-start-btn" onClick={handleStart}>
          등록 시작
        </button>
      </main>
    </div>
  );
}
