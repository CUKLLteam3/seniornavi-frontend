import { useState, useEffect } from 'react';
import { SCREENS } from '../../constants/screens';
import './JobTraining.css';

export const JobListScreen = ({ onNavigate, onApply }) => {
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
          salary: '12,000원 (시급)',
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
      <div className="pg">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⏳</div>
          <p>일자리 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pg">

      {/* 검색 */}
      <div className="title-box">
        <p className="title-text">일자리 찾기</p>
        <div className="search-items">
          <input
            type="text"
            placeholder="일자리나 회사명을 검색하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-bar"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchTerm(searchInput);
              }
            }}
          />
          <button className="search-btn" onClick={() => setSearchTerm(searchInput)}>
            검색
          </button>
        </div>

      </div>

      <div className="ft-box">
        <button className="ft-btn-one">
          <img className="ft-icon" src="src/components/screens/filter-icon.png"/>
          <span className="ft-text-one">상세 필터</span>
        </button>
        <button className="ft-btn-two ft-text-two">ex: 금액순</button>
      </div>
      <div className="len-latest-box">
        <p className="ft-len-text">전체 {filteredJobs.length}개</p>
        <button className="latest">최신순</button> {/* 아직 미구현 */}
      </div>

      {/* 일자리 목록 */}
      <div>
        {filteredJobs.map((job) => (
          <div key={job.id} className="list-card">
            <div className="">

              <div className="card-text">
                <div className="card-title-box">
                  <p className="card-title">{job.title}</p>
                  <p className="work-type">파트타임</p>
                </div>
                
                <div className="company-box">
                  <div className="company-box-in">
                    <img className="company-icon" src="src/components/screens/company-icon.svg"/>
                    <p className="card-company">{job.company}</p>
                  </div>
                  <p className="company-type">중소기업</p>
                </div>
                <div className="salary-box">
                  <p className="card-salary">{job.salary}</p>
                  <p className="working-days">주5일근무</p>
                </div>
                
                <div className="condition-box">
                  <div className="condition-line">
                    <img className="condition-icon" src="src/components/screens/location-icon.svg"/>
                    <p className="condition-text">{job.location}</p>
                  </div>
                  <div className="condition-line">
                    <img className="condition-icon" src="src/components/screens/time-icon.svg"/>
                    <p className="condition-text">{job.workingHours}</p>
                  </div>
                </div>
                <div className="des-box">
                  <p className="des-text">{job.description}</p>
                  <p className="des-text">{job.description}</p>
                </div>
              </div>
            </div>

            <div className="btn-box">
              <button className="btn-one" onClick={() => onApply && onApply(job)}>저장하기</button>
              <button
                className="btn-two"
                onClick={() =>
                onNavigate && onNavigate(SCREENS.JOB_DETAIL, job)
                }
              >
                상세보기
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="more-btn">더 많은 일자리 보기</button>
    </div>
  );
};
