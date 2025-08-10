import { useMemo, useState } from "react";
import "./signup.css";

export default function SignupScreen({ onBack, onSubmit }) {
  // 기본 정보
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [name, setName] = useState("홍길동");
  const [phone, setPhone] = useState("010-1234-5678");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("서울시 강남구 역삼동");

  // 학력/경력
  const [edu, setEdu] = useState("");
  const [career, setCareer] = useState("");

  // 보유 기술 (체크박스)
  const skillList = [
    "Microsoft Office","데이터 분석","고객 상담","영어 회화","컴퓨터 활용","인터넷 검색",
    "소셜미디어","온라인 쇼핑몰","요리","청소","정리정돈","간병",
    "육아","반려동물 돌봄","운전","배송","택배","경비","관리","상품 진열",
  ];
  const [skills, setSkills] = useState(new Set());

  const toggleSkill = (s) => {
    const next = new Set(skills);
    if (next.has(s)) next.delete(s); else next.add(s);
    setSkills(next);
  };

  // 약관 동의
  const [agreeTos, setAgreeTos] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // 유효성
  const phoneDigits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const phoneValid = /^01[016789]\d{7,8}$/.test(phoneDigits);
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const pwValid = pw.length >= 6 && pw === pw2;
  const canSubmit = emailValid && pwValid && name.trim() && phoneValid && agreeTos && agreePrivacy;

  const formattedPhone = useMemo(() => {
    const d = phoneDigits;
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0,3)}-${d.slice(3)}`;
    return `${d.slice(0,3)}-${d.slice(3,7)}-${d.slice(7,11)}`;
  }, [phoneDigits]);

  function handleSubmit(e){
    e.preventDefault();
    if (!canSubmit) return;
    const payload = {
      email, pw, name,
      phone: formattedPhone,
      birth, gender, address,
      edu, career, skills: Array.from(skills),
      agreeTos, agreePrivacy
    };
    onSubmit?.(payload);
    alert("회원가입이 완료되었습니다 (더미)");
  }

  return (
    <div className="sg-page">
      {/* 헤더 */}
      <header className="sg-header">
        <button className="sg-back" onClick={onBack} aria-label="뒤로가기">
          <ArrowLeft/>
        </button>
        <h1>회원가입</h1>
      </header>

      <main className="sg-wrap">
        {/* 카드: 기본 정보 */}
        <section className="sg-card">
          <div className="sg-card-title">
            <IconUser/><span>기본 정보</span>
          </div>

          <form className="sg-form" onSubmit={handleSubmit}>
            {/* 이메일 */}
            <Field label="이메일" icon={<IconMail/>}>
              <input className="sg-input" type="email" placeholder="example@email.com"
                     value={email} onChange={(e)=>setEmail(e.target.value)}/>
              {!emailValid && email && <div className="sg-err">올바른 이메일 형식이 아닙니다.</div>}
            </Field>

            {/* 비밀번호 */}
            <Field label="비밀번호" >
              <div className="sg-input-wrap">
                <input className="sg-input" type={showPw ? "text" : "password"} placeholder="6자 이상 입력해주세요"
                       value={pw} onChange={(e)=>setPw(e.target.value)} />
                <button type="button" className="sg-icon-btn" onClick={()=>setShowPw(v=>!v)} aria-label="비밀번호 보기">
                  <IconEye open={showPw}/>
                </button>
              </div>
              {pw && pw.length<6 && <div className="sg-err">비밀번호는 6자 이상이어야 합니다.</div>}
            </Field>

            {/* 비밀번호 확인 */}
            <Field label="비밀번호 확인">
              <div className="sg-input-wrap">
                <input className="sg-input" type={showPw2 ? "text" : "password"} placeholder="비밀번호를 다시 입력해주세요"
                       value={pw2} onChange={(e)=>setPw2(e.target.value)} />
                <button type="button" className="sg-icon-btn" onClick={()=>setShowPw2(v=>!v)} aria-label="비밀번호 보기">
                  <IconEye open={showPw2}/>
                </button>
              </div>
              {pw2 && pw !== pw2 && <div className="sg-err">비밀번호가 일치하지 않습니다.</div>}
            </Field>

            {/* 이름 */}
            <Field label="이름">
              <input className="sg-input" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="이름을 입력해주세요"/>
            </Field>

            {/* 전화번호 */}
            <Field label="전화번호" icon={<IconPhone/>}>
              <input className="sg-input" type="tel" value={formattedPhone}
                     onChange={(e)=>setPhone(e.target.value)} placeholder="010-1234-5678" />
              {!phoneValid && phone && <div className="sg-err">휴대폰 번호 형식이 올바르지 않습니다.</div>}
            </Field>

            {/* 생년월일 */}
            <Field label="생년월일" icon={<IconCalendar/>}>
              <input className="sg-input" type="date" value={birth} onChange={(e)=>setBirth(e.target.value)} placeholder="년-월-일"/>
            </Field>

            {/* 성별 */}
            <Field label="성별">
              <div className="sg-select">
                <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                  <option value="">성별을 선택해주세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="none">선택 안 함</option>
                </select>
                <ChevronDown/>
              </div>
            </Field>

            {/* 주소 */}
            <Field label="주소" icon={<IconLocation/>}>
              <input className="sg-input" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="주소를 입력해주세요"/>
            </Field>

            {/* 카드 구분선 */}
            <hr className="sg-sep"/>
          </form>
        </section>

        {/* 카드: 학력 및 경력 */}
        <section className="sg-card">
          <div className="sg-card-title">
            <IconCap/><span>학력 및 경력</span>
          </div>

          <div className="sg-form">
            <Field label="최종 학력" icon={<IconHat/>}>
              <div className="sg-select">
                <select value={edu} onChange={(e)=>setEdu(e.target.value)}>
                  <option value="">학력을 선택해주세요</option>
                  <option value="element">초등학교 졸업</option>
                  <option value="middle">중학교 졸업</option>
                  <option value="high">고등학교 졸업</option>
                  <option value="college">전문대학 졸업</option>
                  <option value="univ">대학교 졸업</option>
                  <option value="master">대학원 졸업</option>
                </select>
                <ChevronDown/>
              </div>
            </Field>

            <Field label="경력" icon={<IconBag/>}>
              <div className="sg-select">
                <select value={career} onChange={(e)=>setCareer(e.target.value)}>
                  <option value="">경력을 선택해주세요</option>
                  <option value="none">신입 (경력 없음)</option>
                  <option value="1">1년 미만</option>
                  <option value="1-3">1~3년</option>
                  <option value="3-5">3~5년</option>
                  <option value="5-10">5~10년</option>
                  <option value="10+">10년 이상</option>
                </select>
                <ChevronDown/>
              </div>
            </Field>
          </div>
        </section>

        {/* 카드: 보유 기술 및 능력 */}
        <section className="sg-card">
          <div className="sg-card-title">
            <IconSkill/><span>보유 기술 및 능력</span>
          </div>
          <p className="sg-desc">해당하는 기술이나 능력을 모두 선택해주세요</p>

          <div className="sg-skill-grid">
            {skillList.map((s) => (
              <label key={s} className={`sg-skill ${skills.has(s) ? "is-on" : ""}`}>
                <input type="checkbox" checked={skills.has(s)} onChange={()=>toggleSkill(s)} />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 카드: 약관 동의 */}
        <section className="sg-card">
          <div className="sg-card-title">
            <IconDoc/><span>약관 동의</span>
          </div>

          <label className="sg-check">
            <input type="checkbox" checked={agreeTos} onChange={(e)=>setAgreeTos(e.target.checked)} />
            <div>
              <strong>(필수) 이용약관 동의</strong>
              <p>Re-fly 서비스 이용약관에 동의합니다.</p>
            </div>
          </label>

          <label className="sg-check">
            <input type="checkbox" checked={agreePrivacy} onChange={(e)=>setAgreePrivacy(e.target.checked)} />
            <div>
              <strong>(필수) 개인정보 처리방침 동의</strong>
              <p>개인정보 수집 및 이용에 동의합니다.</p>
            </div>
          </label>
        </section>

        {/* 제출 버튼 */}
        <div className="sg-bottom">
          <button className={`sg-submit ${!canSubmit ? "is-disabled":""}`} disabled={!canSubmit}
                  onClick={handleSubmit}>
            회원가입 완료
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
