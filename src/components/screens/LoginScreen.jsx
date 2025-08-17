import { useMemo, useState } from "react";
import "./login.css";
// ✅ 더미 로그인 API 불러오기
import { login } from "../../utils/auth";

export default function LoginScreen({ onLogin, onSignup, onForgotPassword }) {
  const [tab, setTab] = useState("password"); // 'password' | 'sms'(비활성)
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");     // ✅ 에러 메시지 상태

  // 010-1234-5678 포맷 표시
  const formattedPhone = useMemo(() => {
    const d = phone.replace(/\D/g, "");
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
  }, [phone]);

  const phoneValid = /^01[016789]-?\d{3,4}-?\d{4}$/.test(phone);
  const canSubmit = tab === "password" && phoneValid && password.length >= 4 && !loading;

  // ✅ 실제 로그인 흐름(지금은 mock 호출)
  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      // 전화번호는 숫자만 전달
      const rawPhone = phone.replace(/\D/g, "");
      // { token, user } 형태로 반환됨 (auth.mock.js)
      const data = await login({ phone: rawPhone, password });
      // 부모로 전달 → App.jsx에서 localStorage 저장 + 홈으로 전환
      onLogin?.(data);
    } catch (err) {
      setError(err?.message || "로그인에 실패했어요");
    } finally {
      setLoading(false);
    }
  }

  // (선택) 카카오 버튼은 그대로 유지
  function handleKakao() {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin?.({ token: "kakao-fake", user: { name: "카카오유저" } });
    }, 400);
  }

  return (
    <div className="rf-page">
      <div className="rf-wrap">
        {/* 로고 배지 */}
        <div className="rf-logo-card">
          <div className="rf-logo-grad">
            <span className="rf-emoji">🛫</span>
          </div>
        </div>

        {/* 타이틀 */}
        <div className="rf-title">
          <h1>Re-fly</h1>
          <p className="rf-sub1">새로운 시작을 위한</p>
          <p className="rf-sub2">시니어 취업 플랫폼</p>
        </div>

        {/* 포인트 3개 */}
        <div className="rf-points">
          <div className="rf-point">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10B981" strokeWidth="2" className="rf-icon">
              <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span>안전한 로그인</span>
          </div>
          <div className="rf-point">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#F43F5E" className="rf-icon">
              <path d="M12 21s-7-4.35-10-8.5C-0.5 8 3 3 7.5 5.5 9 6.3 10 7.7 12 9c2-1.3 3-2.7 4.5-3.5C21 3 24.5 8 22 12.5 19 16.65 12 21 12 21z" />
            </svg>
            <span>시니어 맞춤</span>
          </div>
          <div className="rf-point">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#6366F1" strokeWidth="2" className="rf-icon">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span>24시간 지원</span>
          </div>
        </div>

        {/* 로그인 카드 */}
        <div className="rf-card">
          <div className="rf-card-title">
            <h2>로그인</h2>
            <span className="rf-badge">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <p className="rf-card-sub">안전하고 간편한 로그인</p>

          {/* 탭 */}
          <div className="rf-tabs">
            <button
              type="button"
              onClick={() => setTab("password")}
              className={`rf-tab ${tab === "password" ? "is-active" : ""}`}
            >
              휴대폰
            </button>
            <button type="button" className="rf-tab" disabled title="SMS 인증 준비 중">
              SMS 인증
            </button>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="rf-form">
            <div className="rf-field">
              <label>휴대폰 번호</label>
              <input
                type="tel"
                name="phone"
                value={formattedPhone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                className={`rf-input ${phone && !phoneValid ? "rf-error" : ""}`}
                inputMode="tel"
                autoComplete="tel"
              />
              {phone && !phoneValid && <div className="rf-help-err">휴대폰 번호 형식이 올바르지 않습니다.</div>}
            </div>

            <div className="rf-field">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
                className="rf-input"
              />
            </div>

            {/* ✅ 에러 메시지 */}
            {error && <div className="rf-help-err" style={{ marginTop: 4 }}>{error}</div>}

            <button
              type="submit"
              disabled={!canSubmit}
              className={`rf-btn rf-btn-gray ${!canSubmit ? "is-disabled" : ""}`}
            >
              {loading ? "로그인 중..." : "로그인하기"}
            </button>
          </form>

          {/* 회원가입 */}
          <div className="rf-center-txt">아직 회원이 아니신가요?</div>
          <button onClick={onSignup} className="rf-btn rf-btn-primary">
            회원가입하기
          </button>
        </div>

        {/* 하단 안내 */}
        <div className="rf-footer">
          <p><b>개인정보 보호:</b> 모든 정보는 암호화되어 안전하게 처리됩니다</p>
          <p><b>고객센터:</b> 로그인에 어려움이 있으면 언제든 문의하세요</p>
          <div className="rf-links">
            <a href="#">이용약관</a> | <a href="#">개인정보처리방침</a> | <a href="#">고객센터</a>
          </div>
        </div>
      </div>
    </div>
  );
}
