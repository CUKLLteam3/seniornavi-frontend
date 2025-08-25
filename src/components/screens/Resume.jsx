import React from "react";
import "../screens/resume.css";
import penguin from "../../assets/이력_등록하기.webp"; 

export default function ResumeScreen({ onNavigate, onStart }) {
  const handleStart = () => (onStart ? onStart() : alert("설문 시작!"));

  return (
    <div className="resume-page">
      {/* 헤더 */}
      <header className="resume-header">
        <button
          className="back-btn"
          aria-label="뒤로"
          onClick={() => onNavigate?.("home")}
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="#111"
            strokeWidth="2.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="hdr-right" />
      </header>

      {/* 본문 */}
      <main className="resume-body">
        {/* 흰색 카드(이미지+텍스트 중앙) */}
        <section className="resume-card">
          <div className="resume-illust">
            <img src={penguin} alt="펭귄이 노트북을 보고 있어요" />
          </div>

          <h1 className="resume-title">Re-fly 이력 등록하기</h1>
          <p className="resume-sub">약 3분, 8단계 질문으로 뚝딱!</p>
        </section>

        {/* 버튼 */}
        <button
          className="resume-start-btn"
          onClick={handleStart}
          type="button"
        >
          등록 시작
        </button>
      </main>
    </div>
  );
}
