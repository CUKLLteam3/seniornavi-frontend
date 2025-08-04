import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

export const JobListScreen = ({ onNavigate, onApply, onToggleFavorite, isFavorite }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 임시 데이터
  useEffect(() => {
    setTimeout(() => {
      setJobs([
        {
          id: 'job1',
          title: '부천시청 민원도우미',
          company: '부천시청',
          location: '부천시 원미구',
          salary: '시급 12,000원',
          type: '시간제',
          description: '시민들의 민원 접수 및 안내 업무',
          workingHours: '09:00-13:00',
          distance: '1.2km'
        },
        {
          id: 'job2',
          title: '학교 급식 도우미',
          company: '부천초등학교',
          location: '부천시 소사구',
          salary: '월 80만원',
          type: '시간제',
          description: '초등학교 급식 준비 및 배식 보조',
          workingHours: '10:00-14:00',
          distance: '2.1km'
        },
        {
          id: 'job3',
          title: '도서관 사서 보조',
          company: '부천시립도서관',
          location: '부천시 오정구',
          salary: '시급 11,500원',
          type: '시간제',
          description: '도서 정리 및 이용자 안내',
          workingHours: '13:00-17:00',
          distance: '3.5km'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⏳</div>
          <p>일자리 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="text-2xl font-bold text-primary-600 mb-4">
        💼 일자리 목록
      </h1>

      {/* 검색 */}
      <div className="card mb-4">
        <input
          type="text"
          placeholder="일자리나 회사명으로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
      </div>

      {/* 일자리 목록 */}
      <div className="space-y-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                  <span>⏰ {job.workingHours}</span>
                  <span>🚗 {job.distance}</span>
                </div>
              </div>
              <button
                onClick={() => onToggleFavorite && onToggleFavorite(job)}
                className="text-2xl"
              >
                {isFavorite && isFavorite(job.id) ? '❤️' : '🤍'}
              </button>
            </div>
            
            <p className="text-gray-700 text-sm mb-4">{job.description}</p>
            
            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={() => onNavigate && onNavigate('job-detail', job)}
              >
                상세보기
              </Button>
              <Button 
                variant="secondary"
                onClick={() => onApply && onApply(job)}
                className="bg-green-500 hover:bg-green-600 px-6"
              >
                지원하기
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 프론트엔드2 개발 영역 안내 */}
      <div className="card mt-6 border-dashed border-2 border-purple-300 bg-purple-50">
        <h3 className="font-semibold text-purple-800 mb-2">
          🎯 프론트엔드2 개발 영역
        </h3>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>✅ 일자리 목록 렌더링</li>
          <li>✅ 검색 및 필터링</li>
          <li>⏳ 상세 페이지 구현</li>
          <li>⏳ 교육 프로그램 목록</li>
          <li>⏳ 무한 스크롤 또는 페이지네이션</li>
        </ul>
      </div>
    </div>
  );
};