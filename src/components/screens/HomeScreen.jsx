import React from 'react';
import { Button } from '../ui/Button';
import { SCREENS } from '../../constants/screens';

export const HomeScreen = ({ user, onNavigate }) => {
  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-600 mb-2">
          안녕하세요, {user?.name || '사용자'}님! 👋
        </h1>
        <p className="text-gray-600">오늘도 새로운 기회를 찾아보세요</p>
      </div>

      {/* 추천 섹션 */}
      <div className="card mb-4">
        <h2 className="font-semibold mb-3 flex items-center">
          ⭐ 오늘의 추천
        </h2>
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="font-medium text-blue-800">부천시청 민원도우미</h3>
            <p className="text-sm text-blue-600">부천시청 · 시간제 · 오전근무</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <h3 className="font-medium text-green-800">디지털 활용 교육</h3>
            <p className="text-sm text-green-600">부천시 평생학습관 · 무료 · 2주과정</p>
          </div>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="space-y-3">
        <Button 
          className="w-full"
          onClick={() => onNavigate && onNavigate(SCREENS.JOB_MATCHING_METHOD)}
        >
          🤖 AI 일자리 추천 받기
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="secondary" 
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg"
            onClick={() => onNavigate && onNavigate(SCREENS.JOB_LIST)}
          >
            💼 일자리 찾기
          </Button>
          <Button 
            variant="secondary"
            className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg"
            onClick={() => onNavigate && onNavigate(SCREENS.TRAINING_LIST)}
          >
            🎓 교육 프로그램
          </Button>
        </div>
      </div>

      {/* 프론트엔드1 개발 영역 안내 */}
      <div className="card mt-6 border-dashed border-2 border-orange-300 bg-orange-50">
        <h3 className="font-semibold text-orange-800 mb-2">
          🎯 프론트엔드1 개발 영역
        </h3>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>✅ 홈 대시보드 레이아웃</li>
          <li>⏳ 개인화된 추천 알고리즘</li>
          <li>⏳ 마이페이지 연결</li>
          <li>⏳ 온보딩 프로세스</li>
          <li>⏳ 설문조사 시스템</li>
        </ul>
      </div>
    </div>
  );
};