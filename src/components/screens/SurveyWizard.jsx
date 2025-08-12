// src/components/screens/SurveyWizard.jsx
import React, { useMemo, useState } from "react";
import "/src/styles/survey.css";
import donePenguin from "../../assets/complete-penguin.png"; // ✅ 완료 일러스트 (없으면 경로만 맞춰줘)

const TOTAL = 9;
const PROGRESS = [13, 28, 35, 50, 63, 72, 88, 96, 100];

export default function SurveyWizard({ onDone, onBackHome }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // step1
    name: "", birth: "", gender: "", phone: "",
    // step2
    district: "", transport: [], distance: "",
    // step3
    health: "", commuteTime: "", workDays: "", considerations: [],
    // step4
    mainCareer: "", certs: [], computer: "",
    // step5
    desiredJobs: [], workType: "", desiredPay: "",
    // step6
    eduCompleted: [], supportNeeds: [],
    // step7
    workHelp: [],
    // step8
    suggestions: "",
  });

  const pct = useMemo(() => PROGRESS[step - 1], [step]);

  const goNext  = () => setStep((s) => Math.min(TOTAL, s + 1));
  const goPrev  = () => setStep((s) => Math.max(1, s - 1));
  const setVal  = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const toggle  = (k, v) => setForm((p) => {
    const s = new Set(p[k]); s.has(v) ? s.delete(v) : s.add(v); return { ...p, [k]: [...s] };
  });

  const handleSubmit = () => {
    // TODO: 서버 전송 로직
    setStep(9); // 완료 화면으로
  };

  return (
    <div className="survey-app">
      {/* 헤더 */}
      <header className="sv-header">
        <button
          className="icon-btn"
          onClick={step === 1 ? onBackHome : goPrev}
          aria-label="back"
          type="button"
        >←</button>

        <div className="sv-step">Step {step}/{TOTAL}</div>

        <div className="sv-progress">
          <div className="bar" style={{ width: pct + "%" }} />
        </div>

        <div className="sv-pct">{pct}% 완료</div>
      </header>

      {/* 본문 */}
      <main className="sv-body">
        {step === 1 && (
          <Section title="기본 정보를 알려주세요">
            <LabeledInput label="Q1. 성함" ph="홍길동" value={form.name} onChange={(v)=>setVal("name", v)} />
            <LabeledInput label="Q2. 출생년도" ph="1958" value={form.birth} onChange={(v)=>setVal("birth", v)} />
            <LabeledRadios label="Q3. 성별" value={form.gender} onChange={(v)=>setVal("gender", v)} options={["남성","여성"]}/>
            <LabeledInput label="Q4. 연락처" ph="010-1234-5678" value={form.phone} onChange={(v)=>setVal("phone", v)} />
            <Actions step={step} onNext={goNext} />
          </Section>
        )}

        {step === 2 && (
          <Section title="거주 지역과 이동수단을 알려주세요">
            <LabeledInput label="Q5. 거주지역" ph="원미구" value={form.district} onChange={(v)=>setVal("district", v)} />
            <LabeledChips label="Q6. 이용하는 이동수단(복수선택 가능)" value={form.transport} onToggle={(v)=>toggle("transport", v)} options={["지하철","도보","자차","택시","버스"]}/>
            <LabeledChips label="Q7. 최대 출근 거리" value={[form.distance].filter(Boolean)} onToggle={(v)=>setVal("distance", v)} options={["1km이내","3km이내","5km이내","거리 무관"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} />
          </Section>
        )}

        {step === 3 && (
          <Section title="건강 상태와 근로 여건을 알려주세요">
            <LabeledRadios label="Q8. 현재 건강 상태" value={form.health} onChange={(v)=>setVal("health", v)} options={["매우 건강함","보통","약간 불편함","매우 불편함"]}/>
            <LabeledRadios label="Q9. 하루 근로 가능 시간" value={form.commuteTime} onChange={(v)=>setVal("commuteTime", v)} options={["2시간 이하","2~4시간","4~6시간","6시간 이상"]}/>
            <LabeledRadios label="Q10. 주당 근로 가능 일수" value={form.workDays} onChange={(v)=>setVal("workDays", v)} options={["1~2일","3~4일","5일","주말만"]}/>
            <LabeledChips  label="Q11. 일자리 선택 시 고려사항 (복수선택 가능)" value={form.considerations} onToggle={(v)=>toggle("considerations", v)} options={["건강에 무리","이동거리","근무시간대","급여수준"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} />
          </Section>
        )}

        {step === 4 && (
          <Section title="경력과 기술을 알려주세요">
            <LabeledInput label="Q12. 주요 경력 (간단하게 입력)" ph="예: 경비 3년" value={form.mainCareer} onChange={(v)=>setVal("mainCareer", v)} />
            <LabeledChips label="Q13. 보유 자격증/기술" value={form.certs} onToggle={(v)=>toggle("certs", v)} options={["운전면허","요양보호사","조리기능사","외국어","컴활","기타","없음"]}/>
            <LabeledRadios label="Q14. 스마트폰/컴퓨터 사용능력" value={form.computer} onChange={(v)=>setVal("computer", v)} options={["원활히 이용","보통","미숙함"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} />
          </Section>
        )}

        {step === 5 && (
          <Section title="희망하는 일자리를 알려주세요">
            <LabeledChips label="Q15. 희망 직무 (복수선택 가능)" value={form.desiredJobs} onToggle={(v)=>toggle("desiredJobs", v)} options={["경비/관리","미화/청소","조리음식","사무보조","요양보조","기타"]}/>
            <LabeledRadios label="Q16. 희망 근무 형태" value={form.workType} onChange={(v)=>setVal("workType", v)} options={["오전출근","오전/오후반","주말","기타"]}/>
            <LabeledRadios label="Q17. 희망 시급 수준" value={form.desiredPay} onChange={(v)=>setVal("desiredPay", v)} options={["최저시급","만2천원","만4천원","만6천원","협의"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} />
          </Section>
        )}

        {step === 6 && (
          <Section title="교육과 지원에 대해 알려주세요">
            <LabeledChips label="Q18. 관심있는 교육분야 (복수선택 가능)" value={form.eduCompleted} onToggle={(v)=>toggle("eduCompleted", v)} options={["컴퓨터 기초","스마트폰","공예","조리기능","외국어","기타"]}/>
            <LabeledChips label="Q19. 취업에 필요한 지원 (복수선택 가능)" value={form.supportNeeds} onToggle={(v)=>toggle("supportNeeds", v)} options={["이력서 작성","교통비 지원","면접 준비","장비 지원","멘토링","기타"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} />
          </Section>
        )}

        {step === 7 && (
          <Section title="앱 사용에 대해 알려주세요">
            <LabeledChips label="Q20. 앱 사용시 도움이 필요한 부분 (복수선택 가능)" value={form.workHelp} onToggle={(v)=>toggle("workHelp", v)} options={["음성 입력","큰 글씨","작동 방법","고객센터","기타"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} />
          </Section>
        )}

        {step === 8 && (
          <Section title="마지막으로 추가의견 말씀해주세요">
            <LabeledInput
              label="Q21. 건의사항 혹은 바라는 점"
              ph="예: 주방경력 12년"
              value={form.suggestions}
              onChange={(v)=>setVal("suggestions", v)}
            />
            <div className="sv-actions" style={{ marginTop: 16 }}>
              <button className="btn primary w100" onClick={handleSubmit}>제출하기</button>
              <button className="btn ghost w100" onClick={goPrev}>이전</button>
            </div>
          </Section>
        )}

        {step === 9 && (
          <section className="sv-section done">
            {/* 상단 카드 */}
            <div className="done-topcard">
              <div className="done-hero">
                {donePenguin ? (
                  <img src={donePenguin} alt="등록 완료" />
                ) : (
                  <span style={{fontSize:56}}>🐧✅</span>
                )}
              </div>
              <h2 className="done-title">
                이력 등록이<br/>완료되었습니다
              </h2>
              <p className="done-sub">
                입력하신 정보를 바탕으로 <br></br>
                <span className="done-link">맞춤형 일자리</span> 추천해드릴게요
              </p>
            </div>

            {/* 기본정보 체크 카드 */}
            <div className="done-panel">
              <div className="panel-h">기본 정보</div>
              <ul className="panel-list">
                <li>희망 근무 조건 <CheckIcon /></li>
                <li>보유기술/자격 <CheckIcon /></li>
                <li>지원요청 사항 <CheckIcon /></li>
              </ul>
            </div>

            {/* 버튼들 */}
            <div className="done-actions v2">
              <button className="btn primary full" onClick={() => onDone?.()}>AI 코치 상담받기</button>
              <button className="btn outline  full" onClick={() => onBackHome?.()}>홈으로 돌아가기</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ====== 재사용 UI ====== */
function Section({ title, children }) {
  return (
    <section className="sv-section">
      <h2 className="sv-title">{title}</h2>
      <div className="sv-fields">{children}</div>
    </section>
  );
}

function Actions({ step, onNext, onPrev }) {
  return (
    <div className="sv-actions">
      {step < TOTAL && <button className="btn primary w100" onClick={onNext}>다음</button>}
      {step > 1     && <button className="btn ghost   w100" onClick={onPrev}>이전</button>}
    </div>
  );
}

function LabeledInput({ label, ph, value, onChange }) {
  return (
    <div className="field">
      <label className="fl">{label}</label>
      <input className="inp" placeholder={ph} value={value} onChange={(e)=>onChange(e.target.value)} />
    </div>
  );
}

function LabeledRadios({ label, value, onChange, options }) {
  return (
    <div className="field">
      <label className="fl">{label}</label>
      <div className="radios">
        {options.map((opt) => (
          <label key={opt} className="radio">
            <input type="radio" name={label} checked={value === opt} onChange={()=>onChange(opt)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function LabeledChips({ label, value, onToggle, options }) {
  return (
    <div className="field">
      <label className="fl">{label}</label>
      <div className="chips">
        {options.map((opt) => {
          const active = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              className={"chip" + (active ? " active" : "")}
              onClick={()=>onToggle(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="check" aria-hidden>
      <svg viewBox="0 0 24 24" width="18" height="18">
        <circle cx="12" cy="12" r="9" fill="none" stroke="#343741" strokeWidth="1.5" />
        <path d="M8 12.5l2.5 2.5L16 9" fill="none" stroke="#343741" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}
