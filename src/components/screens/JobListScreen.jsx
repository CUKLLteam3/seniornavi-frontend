import { useState, useEffect } from 'react';
import { SCREENS } from '../../constants/screens';
import Modal from './Modal';
import '../../styles/list.css';
import api from '../../utils/api';
import { makeWantListPayload } from '../../utils/mapping';

export const JobListScreen = ({ onNavigate }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [surveyData, setSurveyData] = useState(null);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const getJobList = async () => {
      try {
        // 설문 내역 불러오기
        const surveyRes = await api.get('/api/profile/1');
        const survey = surveyRes.data || null;
        setSurveyData(survey);

        // 설문 유무에 따른 일자리 목록 불러오기
        let jobRes;
        if (survey) {
          const payload = makeWantListPayload(survey);
          console.log('✅ 보낼 설문 답변:', payload);
          jobRes = await api.post('/recruit/wantlist', payload);
          console.log('✅ wantlist API 응답 성공:', jobRes.data);
        } else {
          jobRes = await api.get('/recruit/list');
          console.log('✅ list API 응답 성공:', jobRes.data);
        }

        setJobs(jobRes.data);
      } catch (err) {
        console.error('❌ API 호출 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    getJobList();
  }, []);

  // 관심 목록에 저장하기 (이미 저장된 공고인지 확인 후에 저장)
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

  // 모달 닫는 거 관리
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 로딩 화면
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

  // 검색
  const filteredJobs = jobs.filter(
    (job) =>
      job.recrutPbancTtl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.instNm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pg">
      <div className="title-box">
        <div>
          <p className="title-text">일자리 찾기</p>
          <p className="title-text-sv">
            {surveyData ? (
              <>
                등록하신 이력을 기반으로{' '}
                <span className="title-text-sv2">추천</span>할게요!
              </>
            ) : (
              <>이력을 등록해주시면 추천을 받을 수 있어요!</>
            )}
          </p>
        </div>
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
          <button
            className="search-btn"
            onClick={() => setSearchTerm(searchInput)}
          >
            검색
          </button>
        </div>
      </div>

      <div className="len-latest-box">
        <p className="ft-len-text">전체 {filteredJobs.length}개</p>
      </div>

      <div>
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="sm-title">등록한 이력이나 검색어에 맞는</p>
            <p className="sm-title">일자리가 없습니다.</p>
            <button
              className="btn-list"
              onClick={async () => {
                setLoading(true);
                try {
                  const res = await api.get('/recruit/list');
                  setJobs(res.data);
                  console.log('✅ 전체 일자리 불러오기 성공');
                } catch (err) {
                  console.error('❌ 전체 일자리 불러오기 실패:', err);
                } finally {
                  setLoading(false);
                }
              }}
            >
              전체 일자리 목록 보기
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.recrutPblntSn} className="list-card">
              <div>
                <div className="card-text">
                  <div className="card-title-box">
                    <p className="card-title">{job.recrutPbancTtl}</p>
                    <p className="work-type">
                      {job.hireTypeNmLst.split(',')[0] === '무기계약직'
                        ? '계약직'
                        : job.hireTypeNmLst.split(',')[0]}
                    </p>
                  </div>

                  <div className="company-box">
                    <div className="company-box-in">
                      <img
                        className="company-icon"
                        src="/icon/company-icon.svg"
                      />
                      <p className="card-company">{job.instNm}</p>
                    </div>
                  </div>

                  <div className="condition-box">
                    <div className="condition-line">
                      <img
                        className="condition-icon"
                        src="/icon/location-icon.svg"
                      />
                      <p className="condition-text">{job.workRgnNmLst}</p>
                    </div>
                  </div>
                  <div className="des-box">
                    <p className="des-text">
                      경력: {job.recrutSeNm} · 학력: {job.acbgCondNmLst}
                    </p>
                    <p className="des-text">
                      등록일: {''}
                      {job.pbancBgngYmd
                        ? `${job.pbancBgngYmd.slice(0, 4)}년
                      ${job.pbancBgngYmd.slice(4, 6)}월
                      ${job.pbancBgngYmd.slice(6, 8)}일`
                        : ''}
                      · 마감일: {''}
                      {job.pbancEndYmd
                        ? `${job.pbancEndYmd.slice(0, 4)}년
                      ${job.pbancEndYmd.slice(4, 6)}월
                      ${job.pbancEndYmd.slice(6, 8)}일`
                        : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="btn-box">
                <button className="btn-one" onClick={() => handleSave(job)}>
                  저장하기
                </button>
                <button
                  className="btn-two"
                  onClick={() =>
                    onNavigate &&
                    onNavigate(SCREENS.JOB_DETAIL, job.recrutPblntSn)
                  }
                >
                  상세보기
                </button>
              </div>
            </div>
          ))
        )}
      </div>

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
