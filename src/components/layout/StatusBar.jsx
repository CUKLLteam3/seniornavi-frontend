import React, { useEffect, useState } from "react";
import "../../styles/StatusBar.css";

function StatusBar() {
  const [time, setTime] = useState(getTimeStr());

  useEffect(() => {
    const tick = () => setTime(getTimeStr());
    tick();
    const id = setInterval(tick, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="status-bar">
      {/* 왼쪽 시간 */}
      <div className="status-time">{time}</div>

      {/* 오른쪽 아이콘들 */}
      <div className="status-icons">
        {/* ✅ Wi-Fi: 위쪽이 둥근 베지어 곡선 + 아래 꼭짓점 */}
        <svg viewBox="0 0 24 16" aria-hidden>
          {/* M(시작) → Q(곡선) → L(아래 꼭짓점) → Z(닫기) */}
          <path d="M2 7 Q12 0 22 7 L12 16 Z" fill="currentColor" />
        </svg>


        {/* ✅ 신호: 오른쪽 위 뾰족한 직각삼각형 (크게) */}
        <svg viewBox="0 0 24 14" aria-hidden>
          <polygon points="6,1 6,14 20,14" fill="currentColor" />
        </svg>

       {/* ✅ 배터리: 꽉 찬 형태 + 캡 */}
<svg viewBox="0 0 28 14" aria-hidden>
  <rect
    x="1" y="2" width="20" height="10" rx="3"
    fill="currentColor" stroke="currentColor" strokeWidth="1.8"
  />
  <rect x="21" y="5" width="3" height="4" rx="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function getTimeStr() {
  const d = new Date();
  const hh = d.getHours();
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export default StatusBar;
