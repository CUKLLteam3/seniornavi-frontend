import React from "react";
import "./home.css";

export default function HomeScreen({ user, onNavigate }) {
  const name = user?.name || "사용자님";

  return (
    <div className="home-app">
      {/* 상단 히어로(파랑 배경) */}
      <div className="hero">
        {/* 헤더: 중앙 정렬, 알림 제거 */}
        <header className="home-header">
          <div className="brand-mark">🧰</div>
          <div className="brand-center">
            <div className="brand-name">Re-fly</div>
            <div className="brand-sub">새로운 시작을 위한 플랫폼</div>
          </div>
          <div className="brand-right" /> {/* 자릿수 맞춤용 빈칸 */}
        </header>

        {/* 인사 카드 (흰 박스) */}
        <section className="hello-card">
          <div className="hello-icon">🐧</div>
          <div className="hello-text">
            <h2>안녕하세요, {name}님!</h2>
            <p>오늘도 새로운 기회를 찾아보세요</p>
          </div>
        </section>
      </div>

      {/* 본문(여기부터 흰 배경) */}
      <main className="home-body">
        <h3 className="section-title">무엇을 도와드릴까요?</h3>

        <nav className="feature-list">
          <FeatureItem
            icon={<ChatIcon />}
            title="AI 코치 상담"
            desc="맞춤형 취업 전략을 받아보세요"
            onClick={() => onNavigate?.("ai")}
          />
          <FeatureItem
            icon={<BagIcon />}
            title="일자리 찾기"
            desc="나에게 맞는 일자리를 추천받아보세요"
            onClick={() => onNavigate?.("jobs")}
          />
          <FeatureItem
            icon={<ProfileIcon />}
            title="이력 등록하기"
            desc="맞춤형 취업 전략을 받아보세요"
            onClick={() => onNavigate?.("resume")}
          />
          <FeatureItem
            icon={<HatIcon />}
            title="교육 프로그램"
            desc="새로운 기술을 배워보세요"
            onClick={() => onNavigate?.("training")}
          />
        </nav>
      </main>

      {/* 하단 탭 (아이콘 + 라벨) */}
      <footer className="home-tabbar">
         <div className="home-tabbar__inner">
        {[
          {
            key: "home",
            label: "홈",
            icon: (
              <svg viewBox="0 0 24 24">
                <path
                  d="M3 10.5 12 3l9 7.5v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
          {
            key: "bag",
            label: "일자리",
            icon: (
              <svg viewBox="0 0 24 24">
                <path
                  d="M6 7h12a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M9 7V5a3 3 0 0 1 6 0v2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            ),
          },
          {
            key: "book",
            label: "교육",
            icon: (
              <svg viewBox="0 0 24 24">
                <path
                  d="M4 5h10a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M17 8h3v11h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            ),
          },
          {
            key: "chat",
            label: "AI",
            icon: (
              <svg viewBox="0 0 24 24">
                <path
                  d="M4 13a7 7 0 1 1 4.7 6.6L4 21l1.5-3.2A6.9 6.9 0 0 1 4 13z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
          {
            key: "user",
            label: "내정보",
            icon: (
              <svg viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="8"
                  r="3.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M5 19a7 7 0 0 1 14 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ),
          },
        ].map((t, i) => (
          <button key={t.key} className={"tab" + (i === 0 ? " active" : "")}>
            <span className="ti">{t.icon}</span>
            <span className="tl">{t.label}</span>
          </button>
        ))}
        </div>
      </footer>
    </div>
  );
}

/* --------- 소품들 --------- */
function FeatureItem({ icon, title, desc, onClick }) {
  return (
    <button className="feature-item" onClick={onClick}>
      <div className="feature-icon">{icon}</div>

      {/* 제목과 설명을 한 줄에 */}
      <div className="feature-line">
        <span className="feature-title">{title}</span>
        <span className="feature-desc-inline">{desc}</span>
      </div>

      <ChevronRight />
    </button>
  );
}

/* --------- 아이콘 --------- */
function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="#A6AAB4"
      strokeWidth="2"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#5B5BEF" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function BagIcon({ stroke = "#7C3AED" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={stroke} strokeWidth="2">
      <path d="M6 7h12l1 14H5L6 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#574AE2" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c2-4 14-4 16 0" />
    </svg>
  );
}
function HatIcon({ stroke = "#F59E0B" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={stroke} strokeWidth="2">
      <path d="M22 10L12 6 2 10l10 4 10-4z" />
      <path d="M6 12v5a6 6 0 0 0 12 0v-5" />
    </svg>
  );
}
