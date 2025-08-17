// src/components/screens/SurveyComplete.jsx
import React from "react";
import "/src/styles/survey-base.css";
import "/src/styles/survey-complete.css";
import donePenguin from "../../assets/complete-penguin.png";

/**
 * 완료 화면
 * - 전체 배경색은 survey-complete.css의 `.survey-app.done-mode`에서 제어
 * - onGoHome, onGoCoach 콜백으로 버튼 동작 연결
 */
export default function SurveyComplete({ onGoHome, onGoCoach }) {
  return (
    <div className="survey-app done-mode">
      <section className="sv-section done" aria-labelledby="done-title">
        <div className="done-topcard" role="status" aria-live="polite">
          <div className="done-hero">
            {donePenguin ? (
              <img src={donePenguin} alt="" aria-hidden="true" />
            ) : (
              <span style={{ fontSize: 56 }} aria-hidden="true">🐧✅</span>
            )}
          </div>

          <h2 id="done-title" className="done-title">
            이력 등록이<br />완료되었습니다
          </h2>
          <p className="done-sub">
            입력하신 정보를 바탕으로 <br />
            <span className="done-link">맞춤형 일자리</span>를 추천해드릴게요
          </p>
        </div>

        <div className="done-panel" aria-label="등록 요약">
          <div className="panel-h">기본 정보</div>
          <ul className="panel-list">
            <li>희망 근무 조건 <CheckIcon /></li>
            <li>보유기술/자격 <CheckIcon /></li>
            <li>지원요청 사항 <CheckIcon /></li>
          </ul>
        </div>

        <div className="done-actions v2">
          <button
            type="button"
            className="btn primary full"
            onClick={() => onGoCoach?.()}
          >
            AI 코치 상담받기
          </button>
          <button
            type="button"
            className="btn outline full"
            onClick={() => onGoHome?.()}
          >
            홈으로 돌아가기
          </button>
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="check" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18">
        <circle cx="12" cy="12" r="9" fill="none" stroke="#343741" strokeWidth="1.5" />
        <path d="M8 12.5l2.5 2.5L16 9" fill="none" stroke="#343741" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
