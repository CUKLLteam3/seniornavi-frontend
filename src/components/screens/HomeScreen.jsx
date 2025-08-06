import React from "react";
import { FaUser, FaBriefcase, FaGraduationCap, FaRobot, FaClipboardList } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

const HomeScreen = ({ user, onNavigate }) => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* 헤더 */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
            <span className="text-white text-2xl">🐧</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Re-fly</h1>
            <p className="text-sm text-gray-500">새로운 시작을 위한 플랫폼</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full border flex items-center justify-center text-lg">⌨️</button>
      </div>

      {/* 사용자 인사 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 flex items-center space-x-3">
        <span className="text-2xl">🐧</span>
        <div>
          <p className="font-bold">안녕하세요, {user.name}님! 👋</p>
          <p className="text-sm text-gray-600">오늘도 새로운 기회를 찾아보세요</p>
        </div>
      </div>

      {/* 기능 카드 */}
      <div className="space-y-3 mb-6">
        <Card icon={<FaBriefcase />} title="일자리 찾기" subtitle="나에게 맞는 일자리를 추천받아보세요" onClick={() => onNavigate("job-search")} />
        <Card icon={<FaGraduationCap />} title="교육 프로그램" subtitle="새로운 기술을 배워보세요" onClick={() => onNavigate("education")} orange />
        <Card icon={<FaClipboardList />} title="이력 등록하기" subtitle="3분 간단 설문으로 맞춤 일자리를 찾아보세요" onClick={() => onNavigate("resume")} blue />
        <Card icon={<FaRobot />} title="AI 코치 상담" subtitle="맞춤형 취업 전략을 받아보세요" onClick={() => onNavigate("ai-coach")} purple />
      </div>

      {/* 추천 일자리 */}
      <SectionHeader title="추천 일자리" />
      <div className="space-y-3 mb-6">
        <JobCard title="아파트 관리사무소 접수원 모집" company="○○아파트 관리사무소" location="서울특별시 강남구" type="정규직" salary="2,000,000원" />
        <JobCard title="마트 계산원 및 고객응대 직원" company="△△마트" location="서울특별시 마포구" type="파트타임" salary="10,000원" />
      </div>

      {/* 추천 교육과정 */}
      <SectionHeader title="추천 교육과정" />
      <div className="space-y-3 mb-6">
        <EduCard title="시니어를 위한 스마트폰 기초 활용" org="○○평생학습관" tag="만 50세 이상" type="일반과정" isFree />
        <EduCard title="건강한 한식요리 교실" org="△△문화센터" tag="요리에 관심있는 시니어" type="일반과정" isFree />
      </div>

      <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl">+ 더 많은 일자리 보기</button>
    </div>
  );
};

const Card = ({ icon, title, subtitle, onClick, orange, blue, purple }) => {
  let bgColor = "bg-blue-100 text-blue-700";
  if (orange) bgColor = "bg-orange-100 text-orange-700";
  if (blue) bgColor = "bg-indigo-100 text-indigo-700";
  if (purple) bgColor = "bg-purple-100 text-purple-700";

  return (
    <div
      className="bg-white rounded-xl shadow p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${bgColor}`}>{icon}</div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <HiOutlineArrowRight className="text-gray-400" size={20} />
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <div className="flex items-center justify-between mb-2">
    <h2 className="text-lg font-bold">{title}</h2>
    <button className="text-sm text-purple-600 font-medium border border-purple-600 px-3 py-1 rounded-full">전체보기 →</button>
  </div>
);

const JobCard = ({ title, company, location, type, salary }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <h3 className="font-semibold text-base mb-1">{title}</h3>
    <p className="text-sm text-gray-600 mb-2">{company}</p>
    <div className="flex text-sm text-gray-500 space-x-3 mb-2">
      <span>📍 {location}</span>
      <span>💼 {type}</span>
    </div>
    <p className="text-indigo-600 font-bold">{salary}</p>
  </div>
);

const EduCard = ({ title, org, tag, type, isFree }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <h3 className="font-semibold text-base mb-1">{title}</h3>
    <p className="text-sm text-gray-600 mb-2">{org}</p>
    <div className="flex items-center text-sm text-gray-500 space-x-3 mb-2">
      <span>📅 {tag}</span>
      <span>👤 {type}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-green-600 font-semibold">✔ 수강 신청 가능</span>
      {isFree && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">무료</span>}
    </div>
  </div>
);

export default HomeScreen;