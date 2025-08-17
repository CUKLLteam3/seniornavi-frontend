import { useState, useEffect } from 'react';
import { SCREENS } from '../../constants/screens';
import Modal from './Modal';
import '../../styles/list.css';

export const TrainingListScreen = ({ onNavigate, onApply }) => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // 임시 데이터
  useEffect(() => {
    setTimeout(() => {
      setTrainings([
        {
          id: 'training1',
          title: '시니어를 위한 스마트폰 기초 활용',
          company: '평생학습관',
          location: '부천시 원미구',
          period: '9/15 - 10/13',
          hours: '총 32시간 (16일)',
          target: '만 50세 이상',
          cost: '무료',
        },
        {
          id: 'training2',
          title: '건강한 한식요리 교실',
          company: '문화센터',
          location: '부천시 원미구',
          period: '9/20 - 11/1',
          hours: '총 48시간 (24일)',
          target: '요리에 관심있는 시니어',
          cost: '50,000원',
        },
        {
          id: 'training3',
          title: '컴퓨터 기초 및 인터넷 활용',
          company: '직업전문학교',
          location: '부천시 원미구',
          period: '9/10 - 11/29',
          hours: '총 80시간 (40일)',
          target: '컴퓨터 초보자',
          cost: '300,000원',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTrainings = trainings.filter(
    (training) =>
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (training) => {
    if (onApply) {
      onApply(training);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="pg">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⏳</div>
          <p>교육 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pg">
      {/* 검색 */}
      <div className="title-box">
        <p className="title-text">교육 프로그램</p>
        <div className="search-items">
          <input
            type="text"
            placeholder="궁금하신 걸 검색해주세요"
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

      <div className="ft-box">
        <button className="ft-btn-one">
          <img
            className="ft-icon"
            src="src/components/screens/icon/filter-icon.png"
          />
          <span className="ft-text-one">상세 필터</span>
        </button>
        <button className="ft-btn-two ft-text-two">ex: 금액순</button>
      </div>
      <div className="len-latest-box">
        <p className="ft-len-text">전체 {filteredTrainings.length}개</p>
        <button className="latest">인기순</button> {/* 아직 미구현 */}
      </div>

      {/* 교육 목록 */}
      <div>
        {filteredTrainings.map((training) => (
          <div key={training.id} className="list-card">
            <div>
              <div className="card-text-t">
                <div className="card-title-box">
                  <p className="card-title-t">{training.title}</p>
                  {training.cost === '무료' && (
                    <p className="cost-type">{training.cost}</p>
                  )}
                </div>

                <div className="condition-box-t">
                  <div className="condition-line-t">
                    <img
                      className="condition-icon-t"
                      src="src/components/screens/icon/training-icon.svg"
                    />
                    <p className="condition-text-t">{training.company}</p>
                  </div>
                  <div className="condition-line-t">
                    <img
                      className="condition-icon-t"
                      src="src/components/screens/icon/calendar-icon.svg"
                    />
                    <p className="condition-text-t">{training.period}</p>
                  </div>

                  <div className="condition-line-t">
                    <img
                      className="condition-icon-t"
                      src="src/components/screens/icon/time-icon.svg"
                    />
                    <p className="condition-text-t">{training.hours}</p>
                  </div>

                  <div className="condition-line-t">
                    <img
                      className="condition-icon-t"
                      src="src/components/screens/icon/location-icon.svg"
                    />
                    <p className="condition-text-t">{training.location}</p>
                  </div>
                  <div className="condition-line-t">
                    <img
                      className="condition-icon-t"
                      src="src/components/screens/icon/user-icon.svg"
                    />
                    <p className="condition-text-t">{training.target}</p>
                  </div>
                </div>

                <p className="num">담당자: 02-1111-2222</p>
              </div>
            </div>

            <div className="btn-box">
              <button className="btn-one" onClick={() => handleSave(training)}>
                저장하기
              </button>
              <button
                className="btn-two"
                onClick={() =>
                  onNavigate && onNavigate(SCREENS.TRAINING_DETAIL, training)
                }
              >
                상세보기
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="more-btn">더 많은 교육 프로그램 보기</button>

      {showModal && (
        <Modal
          onClose={handleCloseModal}
          onNavigate={() => onNavigate(SCREENS.HOME)}
        />
      )}
    </div>
  );
};
