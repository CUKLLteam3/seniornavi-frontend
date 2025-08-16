import '../../styles/detail.css';

export const TrainingDetailScreen = ({
  training,
  onBack,
  onApply,
  onToggleFavorite,
  isFavorite,
}) => {
  if (!training) return <p>선택된 교육 프로그램이 없습니다.</p>;

  return (
    <div className="pg">
      <div className="title-box-d">
        <button className="back-btn" onClick={onBack}></button>
        <p className="title-text-d">교육 프로그램 상세</p>
      </div>

      <div className="j-card-1">
        <div className="job-com-box">
          <img
            src="src/components/screens/icon/company2-icon.svg"
            width={'47px'}
            height={'47px'}
          />
          <div className="job-com-text-box">
            <p className="detail-title">{training.title}</p>
            <p className="job-company">{training.company}</p>
          </div>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">과정개요</p>

        <div className="">
          <div>
            <p className="sm-detail mb-1">훈련목표</p>
            <p className="xs-detail mb-4">
              스마트폰 기본 조작 및 앱 활용 능력 향상
            </p>
          </div>
          <div>
            <p className="sm-detail mb-1">과정소개</p>
            <p className="xs-detail mb-4">
              스마트폰 기본 조작부터 카카오톡, 인터넷 사용법까지 체계적으로 학습
            </p>
          </div>
          <div>
            <p className="sm-detail mb-1">부제목</p>
            <p className="xs-detail">디지털 시대, 스마트폰으로 소통하기</p>
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
              src="src/components/screens/icon/calendar-icon.svg"
            />
            <div>
              <p className="sm-detail mb-1">교육기간</p>
              <p className="xs-detail">{training.period}</p>
            </div>
          </div>

          <div className="sche-line mb-4">
            <img
              className="sche-icon"
              src="src/components/screens/icon/time-icon.svg"
            />
            <div>
              <p className="sm-detail mb-1">교육시간</p>
              <p className="xs-detail">{training.hours}</p>
            </div>
          </div>

          <div className="sche-line">
            <img
              className="sche-icon"
              src="src/components/screens/icon/location-icon.svg"
            />
            <div>
              <p className="sm-detail mb-1">교육장소</p>
              <p className="xs-detail">서울특별시 강남구 학습로 123</p>
            </div>
          </div>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">수강정보</p>

        <div className="">
          <p className="sm-detail mb-1">수강 신청 현황</p>

          <progress
            value="15" // 현재 신청 인원
            max="20" // 정원
            style={{ width: '100%', accentColor: '#7565ffff' }}
          ></progress>

          <div className="flex gap-3 mb-6">
            <div
              style={{
                flex: 1,
                border: '1px solid #e5e5e5',
                borderRadius: '7px',
                padding: '15px',
                height: '85px',
                backgroundColor: '#F8F9FB',
              }}
            >
              <div className="mini-line">
                <img src="src/components/screens/icon/user2-icon.png" />
                <p className="xs-detail">정원</p>
              </div>

              <p className="mini-text">20명</p>
            </div>

            <div
              style={{
                flex: 1,
                border: '1px solid #e5e5e5',
                borderRadius: '7px',
                padding: '15px',
                height: '85px',
                backgroundColor: '#F8F9FB',
              }}
            >
              <div className="mini-line">
                $ <p className="xs-detail">수강료</p>
              </div>

              <p className="mini-text">{training.cost}</p>
            </div>
          </div>
          <div>
            <p className="sm-detail mb-1">교육대상</p>
            <p className="xs-detail">{training.target}</p>
          </div>
        </div>
      </div>

      <div className="j-card-2" style={{ marginBottom: '35px' }}>
        <p className="sub-title mb-6">교육기관 정보</p>

        <div>
          <div className="mini-line gap-2">
            <img
              src="src/components/screens/icon/company-icon.svg"
              width={'23px'}
              height={'23px'}
            />
            <p className="sm-detail mb-1">기관명</p>
          </div>
          <p className="xs-detail">{training.company}</p>

          <div className="mini-card">
            <div className="flex justify-between">
              <div className="icon-text">
                <img
                  className="user-icon"
                  src="src/components/screens/icon/user-icon.svg"
                />
                <p className="sm-detail">담당자</p>
              </div>
              <p className="xs-detail">김관리</p>
            </div>

            <div className="flex justify-between">
              <div className="icon-text">
                <img
                  className="user-icon"
                  src="src/components/screens/icon/call-icon.svg"
                />
                <p className="sm-detail">연락처</p>
              </div>
              <p className="xs-detail">02-1234-5678</p>
            </div>

            <div className="flex justify-between">
              <div className="icon-text">
                <img
                  className="user-icon"
                  src="src/components/screens/icon/internet-icon.svg"
                />
                <p className="sm-detail">홈페이지</p>
              </div>
              <p className="link">
                <a href="https://likelion.net/" target="_blank">
                  https://likelion.net/
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <button className="btn-3" onClick={() => onApply && onApply(training)}>
        저장하기
      </button>
    </div>
  );
};
