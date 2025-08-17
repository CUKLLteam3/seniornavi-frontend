import React, { useEffect, useMemo, useRef, useState } from "react";
import "/src/styles/survey-base.css";
import "/src/styles/survey-wizard.css";

const TOTAL = 8;
const PROGRESS = [13, 25, 35, 50, 63, 72, 88, 100];
const STORAGE_KEY = "surveyWizard.v1";

export default function SurveyWizard({ onBackHome, onSubmitDone }) {
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.form) setForm((p) => ({ ...p, ...saved.form }));
        if (saved?.step && saved.step >= 1 && saved.step <= TOTAL) setStep(saved.step);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, form }));
  }, [step, form]);

  const prevStepRef = useRef(step);
  useEffect(() => {
    if (prevStepRef.current !== step) {
      window.scrollTo({ top: 0, behavior: "auto" });
      prevStepRef.current = step;
    }
  }, [step]);

  const pct = useMemo(() => PROGRESS[step - 1], [step]);

  const goNext  = () => setStep((s) => Math.min(TOTAL, s + 1));
  const goPrev  = () => setStep((s) => Math.max(1, s - 1));
  const setVal  = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const toggle  = (k, v) => setForm((p) => {
    const s = new Set(p[k]); s.has(v) ? s.delete(v) : s.add(v); return { ...p, [k]: [...s] };
  });

  const has = (v) => (typeof v === "string" ? v.trim().length > 0 : !!v);

  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return has(form.name) && has(form.birth) && has(form.gender) && has(form.phone);
      case 2:
        return has(form.district) && form.transport.length > 0 && has(form.distance);
      case 3:
        return has(form.health) && has(form.commuteTime) && has(form.workDays) && form.considerations.length > 0;
      case 4:
        return has(form.mainCareer) && form.certs.length > 0 && has(form.computer);
      case 5:
        return form.desiredJobs.length > 0 && has(form.workType) && has(form.desiredPay);
      case 6:
        return form.eduCompleted.length > 0 && form.supportNeeds.length > 0;
      case 7:
        return form.workHelp.length > 0;
      case 8:
        return has(form.suggestions);
      default:
        return true;
    }
  }, [step, form]);

  const handleSubmit = () => {
    if (!isStepValid) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    onSubmitDone?.(form);
  };

  return (
    <div className="survey-app">
      <header className="sv-header">
        <button
          className="icon-btn"
          onClick={step === 1 ? onBackHome : goPrev}
          aria-label="뒤로 가기"
          type="button"
        >←</button>

        <div className="sv-step">Step {step}/{TOTAL}</div>

        <div className="sv-progress" aria-hidden>
          <div className="bar" style={{ width: pct + "%" }} />
        </div>

        <div className="sv-pct" aria-live="polite">{pct}% 완료</div>
      </header>

      <main className="sv-body">
        {step === 1 && (
          <Section title="기본 정보를 알려주세요">
            <LabeledInput label="Q1. 성함" ph="홍길동" value={form.name} onChange={(v)=>setVal("name", v)} />
            <LabeledInput label="Q2. 출생년도" ph="1958" value={form.birth} onChange={(v)=>setVal("birth", v)} />
            <LabeledRadios name="gender" label="Q3. 성별" value={form.gender} onChange={(v)=>setVal("gender", v)} options={["남성","여성"]}/>
            <LabeledInput label="Q4. 연락처" ph="010-1234-5678" value={form.phone} onChange={(v)=>setVal("phone", v)} />
            <Actions step={step} onNext={goNext} canNext={isStepValid} />
          </Section>
        )}

        {step === 2 && (
          <Section title="거주 지역과 이동수단을 알려주세요">
            <LabeledInput label="Q5. 거주지역" ph="원미구" value={form.district} onChange={(v)=>setVal("district", v)} />
            <ChipGroup
              label="Q6. 이용하는 이동수단(복수선택 가능)"
              mode="multi"
              value={form.transport}
              onChange={(vals)=>setVal("transport", vals)}
              options={["지하철","도보","자차","택시","버스"]}
            />
            <ChipGroup
              label="Q7. 최대 출근 거리"
              mode="single"
              value={form.distance}
              onChange={(v)=>setVal("distance", v)}
              options={["1km이내","3km이내","5km이내","거리 무관"]}
            />
            <Actions step={step} onNext={goNext} onPrev={goPrev} canNext={isStepValid} />
          </Section>
        )}

        {step === 3 && (
          <Section title="건강 상태와 근로 여건을 알려주세요">
            <LabeledRadios name="health" label="Q8. 현재 건강 상태" value={form.health} onChange={(v)=>setVal("health", v)} options={["매우 건강함","보통","약간 불편함","매우 불편함"]}/>
            <ChipGroup label="Q9. 하루 근로 가능 시간" mode="single" value={form.commuteTime} onChange={(v)=>setVal("commuteTime", v)} options={["2시간 이하","2~4시간","4~6시간","6시간 이상"]}/>
            <ChipGroup label="Q10. 주당 근로 가능 일수" mode="single" value={form.workDays} onChange={(v)=>setVal("workDays", v)} options={["1~2일","3~4일","5일","주말만"]}/>
            <ChipGroup label="Q11. 일자리 선택 시 고려사항 (복수선택 가능)" mode="multi" value={form.considerations} onChange={(vals)=>setVal("considerations", vals)} options={["건강에 무리","이동거리","근무시간대","급여수준"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} canNext={isStepValid} />
          </Section>
        )}

        {step === 4 && (
          <Section title="경력과 기술을 알려주세요">
            <LabeledInput label="Q12. 주요 경력 (간단하게 입력)" ph="예: 경비 3년" value={form.mainCareer} onChange={(v)=>setVal("mainCareer", v)} />
            <ChipGroup label="Q13. 보유 자격증/기술" mode="multi" value={form.certs} onChange={(vals)=>setVal("certs", vals)} options={["운전면허","요양보호사","조리기능사","외국어","컴활","기타","없음"]}/>
            <LabeledRadios name="computer" label="Q14. 스마트폰/컴퓨터 사용능력" value={form.computer} onChange={(v)=>setVal("computer", v)} options={["원활히 이용","보통","미숙함"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} canNext={isStepValid} />
          </Section>
        )}

        {step === 5 && (
          <Section title="희망하는 일자리를 알려주세요">
            <ChipGroup label="Q15. 희망 직무 (복수선택 가능)" mode="multi" value={form.desiredJobs} onChange={(vals)=>setVal("desiredJobs", vals)} options={["경비/관리","미화/청소","조리음식","사무보조","요양보조","기타"]}/>
            <ChipGroup label="Q16. 희망 근무 형태(복수선택 가능)" mode="single" value={form.workType} onChange={(v)=>setVal("workType", v)} options={["주중 근무","주말 근무","야간 근무","장기","단기"]}/>
            <ChipGroup label="Q17. 희망 시급 수준" mode="single" value={form.desiredPay} onChange={(v)=>setVal("desiredPay", v)} options={["최저시급","만2천원","만4천원","만6천원"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} canNext={isStepValid} />
          </Section>
        )}

        {step === 6 && (
          <Section title="교육과 지원에 대해 알려주세요">
            <ChipGroup label="Q18. 관심있는 교육분야 (복수선택 가능)" mode="multi" value={form.eduCompleted} onChange={(vals)=>setVal("eduCompleted", vals)} options={["컴퓨터 기초","스마트폰","공예","조리기능","외국어","기타"]}/>
            <ChipGroup label="Q19. 취업에 필요한 지원 (복수선택 가능)" mode="multi" value={form.supportNeeds} onChange={(vals)=>setVal("supportNeeds", vals)} options={["이력서 작성","교통비 지원","면접 준비","장비 지원","멘토링","기타"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} canNext={isStepValid} />
          </Section>
        )}

        {step === 7 && (
          <Section title="앱 사용에 대해 알려주세요">
            <ChipGroup label="Q20. 앱 사용시 도움이 필요한 부분 (복수선택 가능)" mode="multi" value={form.workHelp} onChange={(vals)=>setVal("workHelp", vals)} options={["음성 입력","큰 글씨","작동 방법","고객센터","기타"]}/>
            <Actions step={step} onNext={goNext} onPrev={goPrev} canNext={isStepValid} />
          </Section>
        )}

        {step === 8 && (
          <Section title="마지막으로 추가의견을 알려주세요">
            <LabeledInput
              label="Q21. 서술할 의견을 작성해주세요"
              ph="예: "
              value={form.suggestions}
              onChange={(v)=>setVal("suggestions", v)}
            />
            <div className="sv-actions" style={{ marginTop: 16 }}>
              <button className="btn primary w100" onClick={handleSubmit} disabled={!isStepValid}>제출하기</button>
            </div>
          </Section>
        )}
      </main>
    </div>
  );
}

/* ===== 재사용 UI ===== */
function Section({ title, children }) {
  return (
    <section className="sv-section">
      <h2 className="sv-title">{title}</h2>
      <div className="sv-fields">{children}</div>
    </section>
  );
}

function Actions({ step, onNext, onPrev, canNext = true }) {
  return (
    <div className="sv-actions">
      {step < TOTAL && (
        <button
          className="btn primary w100"
          onClick={canNext ? onNext : undefined}
          disabled={!canNext}
          aria-disabled={!canNext}
          title={!canNext ? "모든 항목을 입력/선택해주세요" : undefined}
          type="button"
        >
          다음
        </button>
      )}
      {step > 1 && (
        <button className="btn ghost w100" onClick={onPrev} type="button">
          이전
        </button>
      )}
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

function LabeledRadios({ name, label, value, onChange, options }) {
  const groupName = React.useMemo(
    () => `${name || label}-${Math.random().toString(36).slice(2,7)}`,
    [name, label]
  );
  return (
    <div className="field">
      <label className="fl">{label}</label>
      <div className="radios">
        {options.map((opt) => (
          <label key={opt} className="radio">
            <input type="radio" name={groupName} checked={value === opt} onChange={()=>onChange(opt)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ChipGroup({ label, mode = "multi", value, onChange, options }) {
  const isSingle = mode === "single";
  const isActive = (opt) => (isSingle ? value === opt : Array.isArray(value) && value.includes(opt));
  const handleClick = (opt) => {
    if (isSingle) onChange(value === opt ? "" : opt);
    else {
      const set = new Set(value || []);
      set.has(opt) ? set.delete(opt) : set.add(opt);
      onChange([...set]);
    }
  };
  return (
    <div className="field">
      <label className="fl">{label}</label>
      <div className="chips" role={isSingle ? "radiogroup" : "group"} aria-label={label}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={"chip" + (isActive(opt) ? " active" : "")}
            aria-pressed={isActive(opt)}
            onClick={() => handleClick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
