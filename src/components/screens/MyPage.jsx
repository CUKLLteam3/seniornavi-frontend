import React, { useState } from "react";
import "../../styles/mypage.css";
import {
  Pencil, MapPin, Target, Wrench, Heart, Briefcase, GraduationCap, Bell
} from "lucide-react";

export default function MyPage({ onLogout }) {
  const [topTab, setTopTab] = useState("resume");     // resume | likes
  const [midTab, setMidTab] = useState("edu");        // edu | job

  return (
    <div className="mypg">
      {/* 상단 타이틀 (피그마: 얇은 보조텍스트 + 제목) */}
      <header className="mypg__hdr">
        <h1 className="mypg__title">마이페이지</h1>
        <div className="mypg__hint">내 정보와 활동 관리</div>
      </header>

      {/* 상단 2-탭 (채워진/비활성 회색배경) */}
      <div className="mypg__seg">
        <button
          type="button"
          className={`seg__btn ${topTab === "resume" ? "is-active" : ""}`}
          onClick={() => setTopTab("resume")}
        >
          <Pencil size={16} />
          <span>내 이력</span>
        </button>
        <button
          type="button"
          className={`seg__btn ${topTab === "likes" ? "is-active" : ""}`}
          onClick={() => setTopTab("likes")}
        >
          <Heart size={16} />
          <span>나의 관심목록</span>
        </button>
      </div>

      {/* ── 내 이력 섹션 ───────────────────────────── */}
      {topTab === "resume" && (
        <section className="mypg__card list">
          <Row icon={<Pencil size={18} />} title="내 이력" />
          <Divider />
          <Row icon={<MapPin size={18} />} title="거주지 & 건강상태" sub="경기도 & 건강함" />
          <Divider />
          <Row icon={<Target size={18} />} title="희망 직종" sub="사무보조" />
          <Divider />
          <Row icon={<Wrench size={18} />} title="보유 기술" sub="한글" />
        </section>
      )}

      {/* ── 관심목록 섹션 ─────────────────────────── */}
      {topTab === "likes" && (
        <section className="mypg__panel">
          <h3 className="panel__cap">
            <Heart size={14} />
            <span>나의 관심목록</span>
          </h3>

          <SubHead>일자리</SubHead>
          <Card title="아파트 관리사무소 접수원" sub1="경기도 부천시 ◎◎아파트 관리사무소" sub2="월 250만원" cta />

          <Card title="아파트 관리사무소 접수원" sub1="경기도 부천시 ◎◎아파트 관리사무소" sub2="월 250만원" cta />

          <SubHead>교육</SubHead>
          <Card title="시니어 디지털 역량 강화" sub1="부천시 평생학습관" cta />
          <Card title="시니어 디지털 역량 강화" sub1="부천시 평생학습관" cta />
        </section>
      )}

      {/* 중단 외곽선 탭 (좌측 채움, 우측 아웃라인) */}
      <div className="mypg__seg-ol">
        <button
          type="button"
          className={`segol__btn ${midTab === "edu" ? "is-active" : ""}`}
          onClick={() => setMidTab("edu")}
        >
          <GraduationCap size={16} />
          <span>교육 지원</span>
        </button>
        <button
          type="button"
          className={`segol__btn ${midTab === "job" ? "is-active" : ""}`}
          onClick={() => setMidTab("job")}
        >
          <Briefcase size={16} />
          <span>일자리 지원</span>
        </button>
      </div>

      {/* 교육 지원 */}
      {midTab === "edu" && (
        <section className="mypg__panel">
          <h3 className="panel__cap">
            <GraduationCap size={14} />
            <span>교육 지원</span>
            <small className="muted">접수중 / 교육중</small>
          </h3>

          <Card title="중장년 디지털 역량 강화"
                sub1="부천시 평생학습관" sub2="2025.08.27~2025.09.27" />

          <Card title="시니어 창업 실무과정"
                sub1="경기 일자리센터" sub2="2025.10.27~2025.12.28" />
        </section>
      )}

      {/* 일자리 지원 */}
      {midTab === "job" && (
        <section className="mypg__panel">
          <h3 className="panel__cap">
            <Briefcase size={14} />
            <span>일자리 지원</span>
            <small className="muted">신청중 / 신청완료</small>
          </h3>

          <Card title="마트 계산원" sub1="◎◎마트 본점" sub2="지원일: 2025.08.17" badge="신청중" />
          <Card title="시니어 창업 실무과정" sub1="경기 일자리센터" sub2="2025.10.27~2025.12.28" badge="신청완료" />
        </section>
      )}

      {/* 알림 + 로그아웃 (피그마 레이아웃) */}
      <section className="mypg__panel">
        <h3 className="panel__cap">
          <Bell size={14} />
          <span>알림 설정</span>
        </h3>

        <SwitchRow title="일자리 알림" sub="새로운 일자리 정보 알림 허용" />
        <Divider light />
        <SwitchRow title="교육 알림" sub="새로운 교육 프로그램 알림 허용" />
      </section>

      <button type="button" className="mypg__logout" onClick={onLogout}>
        로그아웃
      </button>

      <div style={{ height: 16 }} />
    </div>
  );
}

/* ───────── 소품들 ───────── */
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
function Divider({ light = false }) {
  return <div className={`divline ${light ? "light" : ""}`} />;
}

function SubHead({ children }) {
  return <div className="subhead">{children}</div>;
}

function Card({ title, sub1, sub2, cta, badge }) {
  return (
    <div className="card">
      <div className="card__main">
        <div className="card__title">{title}</div>
        {sub1 && <div className="card__sub1">{sub1}</div>}
        {sub2 && <div className="card__sub2">{sub2}</div>}
      </div>
      {cta && <button className="btn-ghost sm">보기</button>}
      {badge && <span className="badge">{badge}</span>}
    </div>
  );
}

function SwitchRow({ title, sub }) {
  return (
    <div className="switchrow">
      <div className="row__txt">
        <div className="row__title">{title}</div>
        <div className="row__sub">{sub}</div>
      </div>
      <label className="sw">
        <input type="checkbox" className="sw__inp" defaultChecked />
        <span className="sw__bar"><i /></span>
      </label>
    </div>
  );
}
