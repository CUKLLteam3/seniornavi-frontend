// src/components/screens/MyPage.jsx
import React, { useLayoutEffect, useEffect, useMemo, useState } from "react";
import "../../styles/mypage.css";
import { Heart, FileText, ChevronRight } from "lucide-react";

import {
  getResume,
  getSavedRecruits,
  // 삭제 기능은 현재 UI에서 사용하지 않으므로 주석
  // deleteSavedRecruit,
} from "../../utils/mypage";

import Modal from "./Modal.jsx";

const DEBUG = true;

export default function MyPage({ onLogout, onNavigate }) {
  // 고정 임시 유저
  const userId = 1;

  // ===== 상세 페이지 베이스 URL 결정 =====
  // 1) VITE_RECRUIT_DETAIL_BASE 가 있으면 그걸 사용 (예: https://bytecookie.click/recruit)
  // 2) 없으면 API 도메인에서 'api-' 접두만 제거해 일반 도메인으로 추론 후 /recruit 붙임
  const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  const INFERRED_SITE =
    API_BASE.startsWith("https://api-")
      ? API_BASE.replace("https://api-", "https://")
      : API_BASE || "https://bytecookie.click";
  const RECRUIT_DETAIL_BASE = (
    import.meta.env.VITE_RECRUIT_DETAIL_BASE || `${INFERRED_SITE}/recruit`
  ).replace(/\/$/, "");

  // 화면 상태
  const [resume, setResume] = useState(null);
  const [recruits, setRecruits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // 자소서 모달
  const [openResume, setOpenResume] = useState(false);
  const resumeText = useMemo(() => {
    if (!resume) return "";
    if (Array.isArray(resume)) return resume.join("\n");
    if (typeof resume === "string") return resume;
    try {
      return JSON.stringify(resume, null, 2);
    } catch {
      return String(resume);
    }
  }, [resume]);

  // 모달 위치 고정(왼쪽 컬럼 기준)
  const [resumePos, setResumePos] = useState({ left: 24, top: 100, width: 380 });
  useEffect(() => {
    document.body.style.overflow = openResume ? "hidden" : "";
  }, [openResume]);
  useLayoutEffect(() => {
    if (!openResume) return;
    const update = () => {
      const col = document.getElementById("mypage-left");
      if (col) {
        const r = col.getBoundingClientRect();
        setResumePos({
          left: Math.round(r.left + window.scrollX + 12),
          top: Math.round(r.top + window.scrollY + 12),
          width: Math.min(Math.round(r.width - 24), 420),
        });
      } else {
        setResumePos((p) => ({ ...p, left: 20, top: 80 }));
      }
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [openResume]);

  // 공용 유틸
  const extractArray = (v) => {
    if (Array.isArray(v)) return v;
    if (Array.isArray(v?.data)) return v.data;
    if (Array.isArray(v?.items)) return v.items;
    if (Array.isArray(v?.data?.items)) return v.data.items;
    return [];
  };
  const extractResume = (v) => {
    if (v?.ok !== undefined && v?.data !== undefined) return v.data;
    return v;
  };

  // 데이터 로드 (자소서 + 관심공고만)
  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      DEBUG && console.log("[MyPage] load for userId:", userId);
      const [a, b] = await Promise.allSettled([
        getResume(userId),
        getSavedRecruits(userId),
      ]);
      DEBUG && console.log("[MyPage] results:", { a, b });

      if (a.status === "fulfilled") setResume(extractResume(a.value));
      else setResume(null);

      if (b.status === "fulfilled") setRecruits(extractArray(b.value));
      else setRecruits([]);

      const fails = [a, b].filter((x) => x.status === "rejected").length;
      if (fails === 2) setErr("마이페이지 데이터를 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [userId]);

  // 관심 공고 보기(새 탭)
  const viewRecruit = (item) => {
    // 서버가 직접 url 필드를 줄 수도 있으니 우선 사용
    const directUrl =
      item?.url ??
      item?.link ??
      item?.detailUrl ??
      item?.href ??
      item?.detail_url ??
      item?.pageUrl;

    if (directUrl) {
      window.open(directUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // 저장 API가 sn 배열만 주는 스펙이면 번호로 상세 URL 구성
    const sn = item?.sn ?? item;
    if (sn) {
      const built = `${RECRUIT_DETAIL_BASE}/${encodeURIComponent(sn)}`;
      window.open(built, "_blank", "noopener,noreferrer");
    } else {
      alert("공고 상세 정보를 찾지 못했어요.");
    }
  };

  // 표시용 포맷터(카드 텍스트)
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

  // 버튼 스타일
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
          <section className="card-box" style={{ color: "red" }}>
            {err}
          </section>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="mini__btn" onClick={load}>
              다시 시도
            </button>
            {onLogout && (
              <button className="mini__btn" onClick={onLogout}>
                로그아웃
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  /* ───────── 정상 UI (자소서 + 일자리 관심목록만) ───────── */
  return (
    <div className="mypg v2">
      <div className="mypg__header-wrap">
        <h1 className="mypg__title">내 정보</h1>
        <p className="mypg__subtitle">내 이력과 활동 관리</p>
      </div>

      <main id="mypage-left" className="mypg__content">
        {/* 자소서 보기 */}
        <section className="card-box">
          <button
            className="row link"
            onClick={() => {
              if (!resumeText) return alert("자소서 데이터가 없습니다.");
              setOpenResume(true);
            }}
            style={{
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <span className="row__ic">
              <FileText size={24} />
            </span>
            <div className="row__txt">
              <div className="row__title">완성된 자소서</div>
              <div className="row__sub">
                클릭하시면 작성된 전체 자소서를 볼 수 있습니다.
              </div>
            </div>
            <ChevronRight className="chev" size={18} />
          </button>
        </section>

        {/* 일자리 관심목록 */}
        <section className="panel">
          <h3 className="panel__title">
            <Heart size={24} />
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
                // 버튼 텍스트 기본값 "보기"
                onClick={() => viewRecruit(it)}
              />
            );
          })}
        </section>

        <div style={{ height: 12 }} />

        {/* 자소서 모달 */}
        <Modal open={openResume} onClose={() => setOpenResume(false)}>
          <div
            style={{
              position: "fixed",
              left: resumePos.left,
              top: resumePos.top,
              width: resumePos.width,
              background: "#fff",
              borderRadius: 14,
              padding: 30,
              boxShadow: "0 20px 40px rgba(0,0,0,.12)",
              margin: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <span className="row__ic">
                <FileText size={24} />
              </span>
              <strong style={{ fontSize: 18, color: "#111827" }}>
                완성된 자소서
              </strong>
            </div>

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

            <div style={{ display: "grid", gap: 12, marginTop: 50 }}>
              <button
                onClick={() => {
                  if (typeof onNavigate === "function") onNavigate("home");
                  setOpenResume(false);
                }}
                style={{
                  ...btnPrimary,
                  borderRadius: 4,
                  fontSize: 17,
                  fontWeight: 900,
                }}
              >
                홈으로 가기
              </button>
              <button
                onClick={() => setOpenResume(false)}
                style={{
                  ...btnGhost,
                  borderRadius: 4,
                  fontSize: 17,
                  fontWeight: 900,
                }}
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
function EmptyRow({ text }) {
  return <div className="mini__empty">{text}</div>;
}

function MiniCard({
  title,
  r2Left,
  r2Right,
  r3Left,
  r3Right,
  btnText = "보기",
  onClick,
}) {
  return (
    <div className="mini">
      <div className="mini__txt">
        <div className="mini__title">{title}</div>
        {r2Left ? <div className="mini__r2l">{r2Left}</div> : <div />}
        {r2Right ? <div className="mini__r2r">{r2Right}</div> : <div />}
        {r3Left ? <div className="mini__r3l">{r3Left}</div> : <div />}
        {r3Right ? <div className="mini__r3r">{r3Right}</div> : <div />}
      </div>
      <button className="mini__btn" onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
}
