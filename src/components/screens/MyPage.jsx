// src/components/screens/MyPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../../styles/mypage.css";
import { Pencil, MapPin, Target, Wrench, Heart, FileText, ChevronRight } from "lucide-react";

import {
  getResume,
  getSavedRecruits,
  deleteSavedRecruit,
  getSavedEducation,
  deleteSavedEducation,
} from "../../utils/mypage";

import Modal from "./Modal.jsx";

export default function MyPage({ onLogout, onNavigate }) {
  // 로그인 유저 (id 없으면 임시 1)
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  }, []);
  const userId = user?.id ?? 1;

  const [resume, setResume] = useState(null);
  const [recruits, setRecruits] = useState(null);
  const [educations, setEducations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // 모달
  const [openResume, setOpenResume] = useState(false);
  const resumeText = useMemo(
    () => (typeof resume === "string" ? resume : JSON.stringify(resume ?? {}, null, 2)),
    [resume]
  );
  useEffect(() => { document.body.style.overflow = openResume ? "hidden" : ""; }, [openResume]);

  // 버튼 스타일(컴포넌트 내부에 선언)
  const btnPrimary = {
    background: "#4F46E5",
    color: "#fff",
    border: "none",
    padding: "12px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 14,
  };
  const btnGhost = {
    background: "#fff",
    color: "#4F46E5",
    border: "2px solid #C7D2FE",
    padding: "12px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 14,
  };

  // 데이터 로드 (일부 실패해도 나머지 표시)
  const load = async () => {
    setLoading(true);
    setErr("");
    const [a, b, c] = await Promise.allSettled([
      getResume(userId),
      getSavedRecruits(userId),
      getSavedEducation(userId),
    ]);
    if (a.status === "fulfilled") setResume(a.value); else setResume(null);
    if (b.status === "fulfilled") setRecruits(Array.isArray(b.value) ? b.value : []); else setRecruits([]);
    if (c.status === "fulfilled") setEducations(Array.isArray(c.value) ? c.value : []); else setEducations([]);
    const fails = [a, b, c].filter((x) => x.status === "rejected").length;
    if (fails === 3) setErr("마이페이지 데이터를 불러오지 못했어요.");
    setLoading(false);
  };
  useEffect(() => { load(); }, [userId]);

  // 삭제 (403이면 개발 모드로 로컬만 삭제)
  const removeRecruit = async (sn) => {
    if (!window.confirm("이 공고를 저장 목록에서 삭제할까요?")) return;
    const res = await deleteSavedRecruit(userId, sn);
    if (res.ok) {
      setRecruits((prev) => (prev || []).filter((x) => (x?.sn ?? x) !== sn));
    } else if (res.status === 401 || res.status === 403) {
      setRecruits((prev) => (prev || []).filter((x) => (x?.sn ?? x) !== sn));
      alert("개발 모드: 서버 권한 때문에 로컬에서만 삭제했어요. (배포용은 로그인 연동 필요)");
    } else {
      alert("공고 삭제에 실패했어요.");
    }
  };

  const removeEducation = async (sn) => {
    if (!window.confirm("이 교육을 저장 목록에서 삭제할까요?")) return;
    const res = await deleteSavedEducation(userId, sn);
    if (res.ok) {
      setEducations((prev) => (prev || []).filter((x) => (x?.sn ?? x) !== sn));
    } else if (res.status === 401 || res.status === 403) {
      setEducations((prev) => (prev || []).filter((x) => (x?.sn ?? x) !== sn));
      alert("개발 모드: 서버 권한 때문에 로컬에서만 삭제했어요. (배포용은 로그인 연동 필요)");
    } else {
      alert("교육 삭제에 실패했어요.");
    }
  };

  // 표시용 포맷터
  const fmtRecruit = (item) => {
    const sn = item?.sn ?? item;
    return {
      sn,
      title: item?.title ?? `공고 #${sn}`,
      org: item?.org ?? item?.company ?? "",
      area: item?.area ?? item?.region ?? "",
      pay: item?.payText ?? item?.salary ?? "",
    };
  };
  const fmtEducation = (item) => {
    const sn = item?.sn ?? item;
    return {
      sn,
      title: item?.title ?? `교육 #${sn}`,
      org: item?.org ?? item?.center ?? "",
      area: item?.area ?? item?.region ?? "",
    };
  };

  /* ───────── 상태별 UI ───────── */
  if (loading) {
    return (
      <div className="mypg v2">
        <div className="mypg__header-wrap">
          <h1 className="mypg__title">내 정보</h1>
          <p className="mypg__subtitle">내 이력과 활동 관리</p>
        </div>
        <main className="mypg__content">
          <section className="card-box">불러오는 중...</section>
        </main>
      </div>
    );
  }
  if (err) {
    return (
      <div className="mypg v2">
        <div className="mypg__header-wrap">
          <h1 className="mypg__title">내 정보</h1>
          <p className="mypg__subtitle">내 이력과 활동 관리</p>
        </div>
        <main className="mypg__content">
          <section className="card-box" style={{ color: "red" }}>{err}</section>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="mini__btn" onClick={load}>다시 시도</button>
            {onLogout && <button className="mini__btn" onClick={onLogout}>로그아웃</button>}
          </div>
        </main>
      </div>
    );
  }

  /* ───────── 정상 UI ───────── */
  return (
    <div className="mypg v2">
      <div className="mypg__header-wrap">
        <h1 className="mypg__title">내 정보</h1>
        <p className="mypg__subtitle">내 이력과 활동 관리</p>
      </div>

      <main className="mypg__content">
        {/* 1) 내 이력 */}
        <section className="card-box">
          <Row icon={<Pencil size={18} />} title="내 이력" />
          <Divider />
          <Row icon={<MapPin size={18} />} title="거주지역 & 건강상태" sub="경기도 & 건강함" />
          <Divider />
          <Row icon={<Target size={18} />} title="희망 직종" sub="사무보조" />
          <Divider />
          <Row icon={<Wrench size={18} />} title="보유 기술" sub="한글" />
        </section>

        {/* 2) 완성된 자소서 (클릭 → 모달) */}
        <section className="card-box">
          <button
            className="row link"
            onClick={() => {
              if (!resume) return alert("자소서 데이터가 없습니다.");
              setOpenResume(true);
            }}
            style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: 0 }}
          >
            <span className="row__ic"><FileText size={18} /></span>
            <div className="row__txt">
              <div className="row__title">완성된 자소서</div>
              <div className="row__sub">클릭하면 확인할 수 있어요.</div>
            </div>
            <ChevronRight className="chev" size={18} />
          </button>
        </section>

        {/* 3) 일자리 관심목록 */}
        <section className="panel">
          <h3 className="panel__title">
            <Heart size={14} />
            <span>일자리 관심목록</span>
          </h3>

          {!recruits?.length && <EmptyRow text="저장한 공고가 없습니다." />}

          {recruits?.map((it, idx) => {
            const r = fmtRecruit(it);
            return (
              <MiniCard
                key={`${r.sn}-${idx}`}
                title={r.title}
                r2Left={r.org}
                r3Left={r.area}
                r3Right={r.pay}
                btnText="삭제"
                onClick={() => removeRecruit(r.sn)}
              />
            );
          })}
        </section>

        {/* 4) 교육 관심목록 */}
        <section className="panel">
          <h3 className="panel__title">
            <Heart size={14} />
            <span>교육 관심목록</span>
          </h3>

          {!educations?.length && <EmptyRow text="저장한 교육이 없습니다." />}

          {educations?.map((it, idx) => {
            const e = fmtEducation(it);
            return (
              <MiniCard
                key={`${e.sn}-${idx}`}
                title={e.title}
                r2Left={e.org}
                r3Left={e.area}
                btnText="삭제"
                onClick={() => removeEducation(e.sn)}
              />
            );
          })}
        </section>

        <div style={{ height: 12 }} />

        {/* ── 자소서 모달 (스크린샷 동일 스타일) ── */}
        <Modal open={openResume} onClose={() => setOpenResume(false)}>
          {/* 카드 */}
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 30,
              margin: "10px 15px 15px",
            }}
          >
            {/* 제목 */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "#F1F5FF",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 15,
                }}
                aria-hidden
              >
                📄
              </span>
              <strong style={{ fontSize: 18, color: "#111827" }}>완성된 자소서</strong>
            </div>

            {/* 텍스트박스 */}
            <textarea
              readOnly
              value={resumeText || "작성된 자소서가 없습니다."}
              style={{
                width: "100%",
                minHeight: 240,
                resize: "vertical",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                padding: 12,
                lineHeight: 1.6,
                fontSize: 15,
                color: "#111827",
              }}
            />

            {/* 버튼 2개 */}
            <div style={{ display: "grid", gap: 12, marginTop: 50 }}>
              <button
                onClick={() => {
                  if (typeof onNavigate === "function") onNavigate("home");
                  setOpenResume(false);
                }}
                style={{...btnPrimary, borderRadius: 4 }}
              >
                홈으로 가기
              </button>
              <button
                onClick={() => setOpenResume(false)}
                style={{...btnGhost, borderRadius: 4 }}
              >
                내 정보 가기
              </button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}

/* ───────── 소품 ───────── */
function Row({ icon, title, sub }) {
  return (
    <div className="row">
      <span className="row__ic">{icon}</span>
      <div className="row__txt">
        <div className="row__title">{title}</div>
        {sub && <div className="row__sub">{sub}</div>}
      </div>
    </div>
  );
}
function Divider() { return <div className="divline" />; }
function EmptyRow({ text }) { return <div className="mini__empty">{text}</div>; }

function MiniCard({ title, r2Left, r2Right, r3Left, r3Right, btnText = "보기", onClick }) {
  return (
    <div className="mini">
      <div className="mini__txt">
        <div className="mini__title">{title}</div>
        {r2Left ? <div className="mini__r2l">{r2Left}</div> : <div />}
        {r2Right ? <div className="mini__r2r">{r2Right}</div> : <div />}
        {r3Left ? <div className="mini__r3l">{r3Left}</div> : <div />}
        {r3Right ? <div className="mini__r3r">{r3Right}</div> : <div />}
      </div>
      <button className="mini__btn" onClick={onClick}>{btnText}</button>
    </div>
  );
}
