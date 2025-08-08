import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { SCREENS } from '../../constants/screens';

export const JobListScreen = ({
  onNavigate,
  onBack,
  onApply,
}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
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
          distance: '1.2km',
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
          distance: '2.1km',
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
          distance: '3.5km',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
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
        일자리 찾기
      </h1>

      {/* 검색 */}
      <div className="mb-4 gap-2 flex">
        <input
          type="text"
          placeholder="일자리나 회사명을 검색하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input-field flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchTerm(searchInput);
            }
          }}
        />
        <Button className="px-4" onClick={() => setSearchTerm(searchInput)}>검색</Button>
      </div>
      
      <div className="space-x-2 mb-6">
        <button className="px-4 text-gray-500">상세 필터</button>
        <button className="px-4 text-gray-500">내 주변</button>
      </div>
      <h2 className="mb-4">전체 {jobs.filter.length}개</h2>
      
      {/* 일자리 목록 */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex flex-col flex-wrap text-sm text-gray-500">
                  <span className="font-semibold text-lg text-gray-700">
                    {job.salary}
                  </span>
                  <span>📍 {job.location}</span>
                  <span>⏰ {job.workingHours}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4">{job.description}</p>

            <div className="flex flex-col gap-2">
              <Button onClick={() => onApply && onApply(job)}>지원하기</Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() =>
                  onNavigate && onNavigate(SCREENS.JOB_DETAIL, job)
                }
              >
                상세보기
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
