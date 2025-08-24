import { useState, useEffect } from 'react';
import Modal from './Modal';
import '../../styles/detail.css';
import api from '../../utils/api';

export const TrainingDetailScreen = ({ trainingId, onNavigate }) => {
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 교육 상세 불러오기
  useEffect(() => {
    const getTrainingDetail = async () => {
      try {
        const res = await api.get(`/api/educations/${trainingId}`);
        console.log('✅ API 응답 성공', res.data);
        setTraining(res.data);
      } catch (err) {
        console.error('❌ API 호출 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    getTrainingDetail();
  }, [trainingId]);

  // 관심 목록에 저장하기 (이미 저장된 교육인지 확인 후에 저장)
  const handleSave = async (training) => {
    try {
      const savedRes = await api.get('/api/mypage/saved-educations?userId=1&expand=ids');
      const savedIdList = savedRes.data || [];
      const alreadySaved = savedIdList.includes(training.id);

      if (alreadySaved) {
        console.log('✅ 이미 저장된 교육', training.id);
        setModalMessage('이미 저장된 교육입니다.');
      } else {
        await api.post('/api/educations/save', {
          userId: 1,
          educationId: training.id,
        });
        console.log('✅ 관심 목록 저장 성공', training.id);
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

  // 로딩 화면
  if (loading) {
    return (
      <div className="pg">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⏳</div>
          <p>교육 상세보기를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pg">
      <div className="title-box-d">
        <p className="title-text-d">교육 프로그램 상세</p>
      </div>

      <div className="j-card-1">
        <div className="job-com-box">
          <img
            src="/icon/company2-icon.svg"
            width={'47px'}
            height={'47px'}
          />
          <div className="job-com-text-box">
            <p className="job-title">{training.title}</p>
            <p className="job-company">{training.providerName}</p>
          </div>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">과정개요</p>

        <div>
          <div>
            <p className="sm-detail mb-1">부제목</p>
            <p className="xs-detail mb-4">{training.subTitle}</p>
          </div>
          <div>
            <p className="sm-detail mb-1">교육대상</p>
            <p className="xs-detail">{training.trainTarget}</p>
          </div>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">교육일정</p>

        <div>
          <div className="sche-line mb-4">
            <img
              style={{ padding: '2px' }}
              className="sche-icon"
              src="/icon/calendar-icon.svg"
            />
            <div>
              <p className="sm-detail mb-1">교육기간</p>
              <p className="xs-detail">
                {training.startDate} ~ {training.endDate}
              </p>
            </div>
          </div>

          <div className="sche-line">
            <img
              className="sche-icon"
              src="/icon/location-icon.svg"
            />
            <div>
              <p className="sm-detail mb-1">교육장소</p>
              <p className="xs-detail">{training.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">수강정보</p>

        <div>
          <div className="flex gap-3">
            <div className="condition-line">
              <img
                className=""
                src="/icon/user-icon.svg"
                width={'25px'}
                height={'28px'}
              />
              <p className="sm-detail">모집 정원</p>
            </div>
            <p className="mini-text">{training.regCourseMan}명</p>
          </div>

          <div className="flex gap-3">
            <div className="condition-line">
              <img
                src="/icon/user2-icon.svg"
                width={'21px'}
                height={'26px'}
                style={{ marginLeft: '2px' }}
              />
              <p className="sm-detail">현재 신청인원</p>
            </div>
            <p className="mini-text">{training.yardMan}명</p>
          </div>

          <div className="flex gap-3">
            <div className="condition-line">
              <p className="sm-detail-nm">$</p>
              <p className="sm-detail-nm">수강료</p>
            </div>
            <p className="mini-text">{training.courseFee.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      <div className="j-card-2" style={{ marginBottom: '35px' }}>
        <p className="sub-title mb-6">교육기관 정보</p>

        <div>
          <div className="flex mb-2">
            <img src="/icon/company-icon.svg" />
            <p className="sm-detail-nm">기관명</p>
          </div>
          <p className="xs-detail mb-6">{training.providerName}</p>

          <div className="mini-card">
            <div className="flex justify-between">
              <div className="icon-text">
                <img
                  className="user-icon"
                  src="/icon/call-icon.svg"
                />
                <p className="sm-detail">연락처</p>
              </div>
              <p className="xs-detail">{training.telNo}</p>
            </div>

            <div className="flex justify-between">
              <div className="icon-text">
                <img
                  className="user-icon"
                  src="/icon/internet-icon.svg"
                />
                <p className="sm-detail">홈페이지</p>
              </div>
              <p className="link">
                <a href={training.homepage} target="_blank">
                  {training.homepage}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <button className="btn-3" onClick={() => handleSave(training)}>
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
