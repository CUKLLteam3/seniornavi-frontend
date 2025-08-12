import React from "react";
import "./home.css";
import penguin from "../../assets/메인_페이지.webp"; // 상단 펭귄 이미지

export default function HomeScreen({ onNavigate }) {
  return (
    <div className="home-app v3">
      {/* 상단 헤더 (펭귄 + 타이틀/서브) */}
      <header className="hf-header">
        <img className="hf-penguin" src={penguin} alt="Re-fly" />
        <div className="hf-titles">
          <h1 className="hf-title">Re-fly</h1>
          <p className="hf-sub">새로운 시작을 위한 플랫폼</p>
        </div>
      </header>

      {/* 리스트 패널(연한 박스) 안에 카드 4개 */}
      <main className="hf-list">
        <div className="hf-list-inner">
          <NavRow
            icon={<IconChat />}
            title="AI 상담"
            desc="AI를 이용해 사용자 맞춤 추천과 이력서 작성을 도와줘요"
            onClick={() => onNavigate?.("ai")}
          />
          <NavRow
            icon={<IconHat />}
            title="교육 프로그램"
            desc="새로운 기술을 배워보세요"
            onClick={() => onNavigate?.("training")}
          />
          <NavRow
            icon={<IconBag />}
            title="일자리 찾기"
            desc="일자리를 추천 받아보세요"
            onClick={() => onNavigate?.("jobs")}
          />
          <NavRow
            icon={<IconProfile />}
            title="이력 등록하기"
            desc="이력을 등록해서 맞춤 일자리를 추천 받아보세요"
            onClick={() => onNavigate?.("resume")}
          />
        </div>
      </main>
    </div>
  );
}

/* ===================== 소품 ===================== */
function NavRow({ icon, title, desc, onClick }) {
  return (
    <button type="button" className="hf-row" onClick={onClick}>
      <span className="hf-row__icon">{icon}</span>

      <span className="hf-row__text">
        <span className="hf-row__title">{title}</span>
        <span className="hf-row__desc">{desc}</span>
      </span>

      <Chevron />
    </button>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9AA1AC" strokeWidth="2">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/* 아이콘 – 보라톤/두께 고정 */
const STROKE = "#6B61D8";
const SW = 2;

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={STROKE} strokeWidth={SW}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconHat() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={STROKE} strokeWidth={SW}>
      <path d="M22 10L12 6 2 10l10 4 10-4z" />
      <path d="M6 12v5a6 6 0 0 0 12 0v-5" />
    </svg>
  );
}
function IconBag() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={STROKE} strokeWidth={SW}>
      <path d="M6 7h12a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function IconProfile() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={STROKE} strokeWidth={SW}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c2-4 14-4 16 0" />
    </svg>
  );
}
