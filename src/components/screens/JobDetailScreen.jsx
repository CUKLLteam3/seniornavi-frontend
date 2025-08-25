import { useState, useEffect } from 'react';
import Modal from './Modal';
import '../../styles/detail.css';
import api from '../../utils/api';

export const JobDetailScreen = ({ jobId, onNavigate }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 일자리 상세 불러오기
  useEffect(() => {
    const getJobDetail = async () => {
      try {
        const res = await api.get(`/recruit/detail/${jobId}`);
        console.log('✅ API 응답 성공', res.data);
        setJob(res.data);
      } catch (err) {
        console.error('❌ API 호출 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    getJobDetail();
  }, [jobId]);

  // 관심 목록에 저장하기
  const handleSave = async (job) => {
    try {
      const savedRes = await api.get('/recruit/1');
      const savedSnList = savedRes.data || [];
      const alreadySaved = savedSnList.includes(job.recrutPblntSn);

      if (alreadySaved) {
        console.log('✅ 이미 저장된 공고', job.recrutPblntSn);
        setModalMessage('이미 저장된 공고입니다.');
      } else {
        await api.post('/recruit/save', { userId: 1, sn: job.recrutPblntSn });
        console.log('✅ 관심 목록 저장 성공', job.recrutPblntSn);
        setModalMessage('저장이 완료되었습니다!');
      }

      setShowModal(true);
    } catch (err) {
      console.error('❌ 관심 목록 저장 실패', err);
      alert('관심 목록 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  // 모달 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 뒤로가기 함수
  const handleBack = () => {
    if (onNavigate) {
      onNavigate('job-list'); // 일자리 목록으로 돌아가기
    } else {
      window.history.back();
    }
  };

  // 로딩 화면
  if (loading) {
    return (
      <div className="pg">
        {/* ✅ 헤더 추가 */}
        <header className="detail-header">
          <button 
            className="back-btn"
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="header-title">일자리 상세보기</h1>
          <div className="header-spacer" />
        </header>

        <div className="text-center py-8">
          <div className="text-4xl mb-4">⏳</div>
          <p>일자리 상세보기를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pg">
      {/* ✅ 헤더 추가 */}
      <header className="detail-header">
        <button 
          className="back-btn"
          onClick={handleBack}
          aria-label="뒤로가기"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="header-title">일자리 상세보기</h1>
        <div className="header-spacer" />
      </header>

      {/* ✅ 기존 title-box-d 제거하고 콘텐츠만 유지 */}
      <div className="j-card-1">
        <div className="job-com-box">
          <img
            src="/icon/company2-icon.svg"
            width={'47px'}
            height={'47px'}
          />
          <div className="job-com-text-box">
            <p className="job-title">{job.recrutPbancTtl}</p>
            <p className="job-company">{job.instNm}</p>
          </div>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title">근무조건</p>

        <div className="condition-line-d">
          <img src="/icon/location-icon.svg" />
          <p className="sm-title">근무지역</p>
        </div>
        <p className="sm-detail-rg">{job.workRgnNmLst}</p>
        <div className="condition-line-d">
          <img src="/icon/user-icon.svg" />
          <p className="sm-title">고용형태</p>
        </div>
        <p className="sm-detail-rg">{job.hireTypeNmLst}</p>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">지원자격</p>

        <div className="flex flex-col">
          <div className="mb-2">
            <div className="flex justify-between mb-2">
              <p className="sm-title">학력</p>
              <p className="detail-text">{job.acbgCondNmLst}</p>
            </div>
            <hr></hr>
          </div>

          <div className="mb-2">
            <div className="flex justify-between mb-2">
              <p className="sm-title">경력</p>
              <p className="detail-text">{job.recrutSeNm}</p>
            </div>
            <hr></hr>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <p className="sm-title">우대사항</p>
              <p className="detail-text">
                {job.prefCondCn
                  ? job.prefCondCn.split(',').slice(0, 3).join(', ')
                  : '없음'}
              </p>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">지원방법</p>

        <div>
          <div>
            <p className="sm-title mb-1">접수방법</p>
            <p className="sm-detail mb-6">이메일, 우편, 방문접수</p>
          </div>
          <div>
            <p className="sm-title mb-1">제출서류</p>
            <p className="sm-detail mb-6">이력서, 자기소개서</p>
          </div>
          <p className="sm-detail">자세한 사항은 홈페이지를 참고해주세요.</p>
          <div className="mini-card">
            <div className="flex justify-between">
              <div className="icon-text">
                <img
                  className="user-icon"
                  src="/icon/internet-icon.svg"
                />
                <p className="sm-detail">홈페이지</p>
              </div>
              <p className="link">
                <a href={job.srcUrl} target="_blank">
                  {job.srcUrl}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="j-card-3">
        <p className="sm-title mb-1">지원 마감일</p>
        <p className="xs-detail">
          {job.pbancEndYmd
            ? `${job.pbancEndYmd.slice(0, 4)}년
            ${job.pbancEndYmd.slice(4, 6)}월
            ${job.pbancEndYmd.slice(6, 8)}일`
            : ''}
        </p>
      </div>

      <button className="btn-3" onClick={() => handleSave(job)}>
        저장하기
      </button>

      {showModal && (
        <Modal
          onNavigate={onNavigate}
          onClose={handleCloseModal}
          message={modalMessage}
        />
      )}
    </div>
  );
};