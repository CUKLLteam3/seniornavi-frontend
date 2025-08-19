// src/components/screens/SignupScreen.jsx
import { useMemo, useState } from "react";
import "./signup.css";
import { signup } from "../../utils/auth"; // ✅ mock 회원가입 API

export default function SignupScreen({ onBack, onSignup }) {
  // 기본 정보
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  // 약관 동의
  const [agreeTos, setAgreeTos] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // ===== 유효성 =====
  const phoneDigits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const phoneValid = /^01[016789]\d{7,8}$/.test(phoneDigits);

  // 이메일 정리(NFKC 정규화 + 제로폭 제거 + trim)
  const cleanEmail = useMemo(
    () =>
      String(email ?? "")
        .normalize("NFKC")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .trim(),
    [email]
  );
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  const pwValid = pw.length >= 6 && pw === pw2;

  const canSubmit =
    emailValid &&
    pwValid &&
    name.trim().length > 0 &&
    phoneValid &&
    agreeTos &&
    agreePrivacy;

  const formattedPhone = useMemo(() => {
    const d = phoneDigits;
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
  }, [phoneDigits]);

  // ✅ 로딩/에러
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e?.preventDefault?.();
    if (!canSubmit || loading) return;

    setErr("");
    setLoading(true);
    try {
      // 🔴 핵심 수정: email도 함께 전달!
      const data = await signup({
        name: name.trim(),
        email: cleanEmail,     // <-- 추가
        password: pw,
        phone: phoneDigits,    // 숫자만
      });

      // 로그인 화면 프리필(편의)
      sessionStorage.setItem(
        "loginPrefill",
        JSON.stringify({ email: cleanEmail, phone: phoneDigits })
      );

      // 회원가입 완료 후 로그인 화면으로 이동
      if (typeof onBack === "function") onBack();

      // 필요하면 후처리 콜백
      // onSignup?.(data);
    } catch (e) {
      setErr(e?.message || "회원가입에 실패했어요");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sg-page">
      {/* 헤더 */}
      <header className="sg-header">
        <button className="sg-back" onClick={onBack} aria-label="뒤로가기">
          <ArrowLeft />
        </button>
        <h1>회원가입</h1>
      </header>

      <main className="sg-wrap">
        {/* 카드: 기본 정보 */}
        <section className="sg-card">
          <div className="sg-card-title">
            <IconUser />
            <span>기본 정보</span>
          </div>

          <form className="sg-form" onSubmit={handleSubmit} noValidate>
            {/* 이메일 */}
            <Field label="이메일" icon={<IconMail />}>
              <input
                className="sg-input"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputMode="email"
                autoComplete="email"
                aria-invalid={!!cleanEmail && !emailValid}
              />
              {!emailValid && cleanEmail && (
                <div className="sg-err">올바른 이메일 형식이 아닙니다.</div>
              )}
            </Field>

            {/* 비밀번호 */}
            <Field label="비밀번호">
              <div className="sg-input-wrap">
                <input
                  className="sg-input"
                  type={showPw ? "text" : "password"}
                  placeholder="6자 이상 입력해주세요"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoComplete="new-password"
                  aria-invalid={!!pw && pw.length < 6}
                />
                <button
                  type="button"
                  className="sg-icon-btn"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label="비밀번호 보기"
                >
                  <IconEye open={showPw} />
                </button>
              </div>
              {pw && pw.length < 6 && (
                <div className="sg-err">비밀번호는 6자 이상이어야 합니다.</div>
              )}
            </Field>

            {/* 비밀번호 확인 */}
            <Field label="비밀번호 확인">
              <div className="sg-input-wrap">
                <input
                  className="sg-input"
                  type={showPw2 ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                  autoComplete="new-password"
                  aria-invalid={!!pw2 && pw !== pw2}
                />
                <button
                  type="button"
                  className="sg-icon-btn"
                  onClick={() => setShowPw2((v) => !v)}
                  aria-label="비밀번호 보기"
                >
                  <IconEye open={showPw2} />
                </button>
              </div>
              {pw2 && pw !== pw2 && (
                <div className="sg-err">비밀번호가 일치하지 않습니다.</div>
              )}
            </Field>

            {/* 이름 */}
            <Field label="이름">
              <input
                className="sg-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                autoComplete="name"
              />
            </Field>

            {/* 전화번호 */}
            <Field label="전화번호" icon={<IconPhone />}>
              <input
                className="sg-input"
                type="tel"
                value={formattedPhone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                inputMode="numeric"
                autoComplete="tel"
                aria-invalid={!!phone && !phoneValid}
              />
              {!phoneValid && phone && (
                <div className="sg-err">휴대폰 번호 형식이 올바르지 않습니다.</div>
              )}
            </Field>

            {/* 생년월일 */}
            <Field label="생년월일" icon={<IconCalendar />}>
              <input
                className="sg-input"
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                placeholder="년-월-일"
                autoComplete="bday"
              />
            </Field>

            {/* 성별 */}
            <Field label="성별">
              <div className="sg-select">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">성별을 선택해주세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="none">선택 안 함</option>
                </select>
                <ChevronDown />
              </div>
            </Field>

            {/* 주소 */}
            <Field label="주소" icon={<IconLocation />}>
              <input
                className="sg-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="서울시 강남구 역삼동"
                autoComplete="street-address"
              />
            </Field>

            {/* 카드 구분선 */}
            <hr className="sg-sep" />

            {/* (폼 하단에 에러 노출) */}
            {err && <div className="sg-err" style={{ marginTop: 8 }}>{err}</div>}
          </form>
        </section>

        {/* 카드: 약관 동의 */}
        <section className="sg-card">
          <div className="sg-card-title">
            <span>약관 동의</span>
          </div>

          <label className="sg-check">
            <input
              type="checkbox"
              checked={agreeTos}
              onChange={(e) => setAgreeTos(e.target.checked)}
            />
            <div>
              <strong>(필수) 이용약관 동의</strong>
              <p>Re-fly 서비스 이용약관에 동의합니다.</p>
            </div>
          </label>

          <label className="sg-check">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={(e) => setAgreePrivacy(e.target.checked)}
            />
            <div>
              <strong>(필수) 개인정보 처리방침 동의</strong>
              <p>개인정보 수집 및 이용에 동의합니다.</p>
            </div>
          </label>
        </section>

        {/* 제출 버튼 */}
        <div className="sg-bottom">
          <button
            className={`sg-submit ${!canSubmit || loading ? "is-disabled" : ""}`}
            disabled={!canSubmit || loading}
            type="button"
            onClick={handleSubmit}
          >
            {loading ? "가입 중..." : "회원가입 완료"}
          </button>
        </div>
      </main>
    </div>
  );
}

/* ---------- 작은 컴포넌트 ---------- */
function Field({ label, icon, children }) {
  return (
    <div className="sg-field">
      <label className="sg-label">
        {icon ? <span className="sg-label-icon">{icon}</span> : null}
        <span>{label}</span>
      </label>
      {children}
    </div>
  );
}

/* ---------- SVG 아이콘 ---------- */
function ArrowLeft(){return(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>);}
function IconUser(){return(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c2-4 14-4 16 0"/></svg>);}
function IconMail(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M4 6h16v12H4z"/><path d="M22 6l-10 7L2 6"/></svg>);}
function IconPhone(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.14a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z"/></svg>);}
function IconCalendar(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);}
function IconLocation(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>);}
function ChevronDown(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>);}
function IconCap(){return(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M22 10L12 6 2 10l10 4 10-4z"/><path d="M6 12v5a6 6 0 0 0 12 0v-5"/></svg>);}
function IconHat(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 3l9 4-9 4L3 7l9-4z"/><path d="M21 10v3c0 4-4 8-9 8s-9-4-9-8v-3"/></svg>);}
function IconBag(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M6 7h12l1 14H5L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>);}
function IconSkill(){return(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M3 12h18"/><path d="M12 3v18"/></svg>);}
function IconDoc(){return(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12V8z"/><path d="M14 2v6h6"/></svg>);}
function IconEye({open}){return open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/><line x1="2" y1="22" x2="22" y2="2"/></svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
);}
