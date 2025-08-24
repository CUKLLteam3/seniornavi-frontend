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

      <div className="status-time">{time}</div>
      <div className="status-icons">
        <svg viewBox="0 0 24 16" aria-hidden>

          <path d="M2 7 Q12 0 22 7 L12 16 Z" fill="currentColor" />
        </svg>


        <svg viewBox="0 0 24 14" aria-hidden>
          <polygon points="6,1 6,14 20,14" fill="currentColor" />
        </svg>

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
