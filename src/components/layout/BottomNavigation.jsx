import React from "react";
import "../../styles/tabbar.css";

export default function BottomNavigation({ currentPage, onNavigate }) {
  const tabs = [
    { key: "home",   label: "홈",     Icon: HomeIcon,   onClick: () => onNavigate?.("home") },
    { key: "jobs",   label: "일자리", Icon: BagIcon,    onClick: () => alert("일자리: 준비 중입니다") },
   // { key: "edu",    label: "교육",   Icon: BookIcon,   onClick: () => alert("교육: 준비 중입니다") },//
    { key: "ai",     label: "AI",     Icon: ChatIcon,   onClick: () => alert("AI: 준비 중입니다") },
    { key: "mypage", label: "내정보", Icon: UserIcon,   onClick: () => onNavigate?.("mypage") },
  ];

  return (
    <nav className="bnv" role="navigation" aria-label="하단 탭바">
      <div className="bnv__inner">
        {tabs.map(({ key, label, Icon, onClick }) => (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className={`bnv__tab ${currentPage === key ? "is-active" : ""}`}
            aria-current={currentPage === key ? "page" : undefined}
          >
            <span className="bnv__icon"><Icon /></span>
            <span className="bnv__label">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ====== 아이콘 (SVG) ====== */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z"
        fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h12a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2z"
        fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 7V5a3 3 0 0 1 6 0v2"
        fill="none" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h10a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V5z"
        fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M17 8h3v11h-3"
        fill="none" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13a7 7 0 1 1 4.7 6.6L4 21l1.5-3.2A6.9 6.9 0 0 1 4 13z"
        fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2"
        fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M5 19a7 7 0 0 1 14 0"
        fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round"/>
    </svg>
  );
}
