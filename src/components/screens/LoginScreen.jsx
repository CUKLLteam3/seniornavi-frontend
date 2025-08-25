// src/components/screens/LoginScreen.jsx
import { useState } from "react";
import "../screens/login.css";
import { login } from "../../utils/auth"; // { token, user(id=1) } 저장
import logoPenguin from "/src/assets/이력_등록하기.webp";

export default function LoginScreen({ onLogin, onSignup }) {
  const [tab] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const canSubmit =
    tab === "password" && emailValid && password.length >= 6 && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      const data = await login({ email, password }); // 세션 저장 + user.id=1
      onLogin?.(data);
    } catch (err) {
      setError(err?.message || "로그인에 실패했어요");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin() {
    setEmail("test@refly.com");
    setPassword("123456");
    setTimeout(() => handleSubmit({ preventDefault: () => {} }), 0);
  }

  return (
    <div className="rf-page">
      <div className="rf-wrap">
        <div className="rf-logo-badge">
          <div className="rf-logo-inner">
            <img src={logoPenguin} alt="Re-fly 로고" />
          </div>
        </div>

        <div className="rf-title">
          <h1>Re-fly</h1>
          <p className="rf-sub1">새로운 시작을 위한</p>
          <p className="rf-sub2">시니어 취업 플랫폼</p>
        </div>

        <div className="rf-points">
          <div className="rf-point">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              className="rf-icon"
            >
              <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span>안전한 로그인</span>
          </div>
          <div className="rf-point">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="#F43F5E"
              className="rf-icon"
            >
              <path d="M12 21s-7-4.35-10-8.5C-0.5 8 3 3 7.5 5.5 9 6.3 10 7.7 12 9c2-1.3 3-2.7 4.5-3.5C21 3 24.5 8 22 12.5 19 16.65 12 21 12 21z" />
            </svg>
            <span>시니어 맞춤</span>
          </div>
          <div className="rf-point">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#6366F1"
              strokeWidth="2"
              className="rf-icon"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span>24시간 지원</span>
          </div>
        </div>

        <div className="rf-card">
          <div className="rf-card-title">
            <h2>로그인</h2>
            <span className="rf-badge">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <p className="rf-card-sub">안전하고 간편한 로그인</p>

          <form onSubmit={handleSubmit} className="rf-form">
            <div className="rf-field">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className={`rf-input ${email && !emailValid ? "rf-error" : ""}`}
                autoComplete="email"
                inputMode="email"
              />
              {email && !emailValid && (
                <div className="rf-help-err">
                  이메일 형식이 올바르지 않습니다.
                </div>
              )}
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

            {error && (
              <div className="rf-help-err" style={{ marginTop: 4 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className={`rf-btn rf-btn-gray ${
                !canSubmit ? "is-disabled" : ""
              }`}
            >
              {loading ? "로그인 중..." : "로그인하기"}
            </button>
          </form>

          {/* 무조건 항상 버튼이 뜨도록 수정 */}
          <button
            onClick={handleDemoLogin}
            className="rf-btn rf-btn-outline"
            style={{ marginTop: 8, backgroundColor: "#e8ecff", color: "#333333" }}
            type="button"
          >
            Test 계정으로 로그인
          </button>

          <div className="rf-center-txt">아직 회원이 아니신가요?</div>
          <button onClick={onSignup} className="rf-btn rf-btn-primary">
            회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
