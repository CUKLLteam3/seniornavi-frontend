import { SCREENS } from '../../constants/screens';
import '../../styles/recommend.css';

export const RecResultScreen = ({
  onBack,
  onNavigate,
}) => {
  // if (!result) return <p>직무 추천 결과가 없습니다.</p>;

  return (
    <div className="pg flex flex-col">
      <div className="title-box-ai">
        <button className="back-btn-r" onClick={onBack}></button>
        <div className="">
          <p className="title-text-r">AI 추천 결과</p>
          <p style={{ color: 'black', fontSize: '14px' }}>
            3개의 직무를 찾았어요
          </p>
        </div>
      </div>

      <div className="rec-card">
        <div className="text-box-r">
          <div className="line-r">
            <p style={{ fontSize: '30px' }}>➀</p>
            <p className="rec-title">프로그래머</p>
          </div>

          <div className="line-r2">
            <img src="src/components/screens/icon/bulb-icon.svg" />
            <p className="rec-reason">왜 추천했는지</p>
          </div>

          <div>
            <div className="line-r3 mb-1">
              <img src="src/components/screens/icon/check-icon.svg" />
              <p className="rec-check">
                Java 개발 이해도로 개발팀과 원활한 소통이 가능합니다
              </p>
            </div>
            <div className="line-r3">
              <img src="src/components/screens/icon/check-icon.svg" />
              <p className="rec-check">
                시니어 리더십으로 팀 관리 역량이 뛰어납니다
              </p>
            </div>
          </div>
        </div>

        <div className="point-box">
          <div>
            <p className="point-title">매칭 포인트</p>
            <p className="point-detail">기획 경험, PM 역량</p>
          </div>

          <div>
            <p className="point-title">시장 동향</p>
            <p className="point-detail">시니어 PM 수요 증가</p>
          </div>
        </div>
      </div>

      <div className="rec-card">
        <div className="text-box-r">
          <div className="line-r">
            <p style={{ fontSize: '30px' }}>➁</p>
            <p className="rec-title">프로그래머</p>
          </div>

          <div className="line-r2">
            <img src="src/components/screens/icon/bulb-icon.svg" />
            <p className="rec-reason">왜 추천했는지</p>
          </div>

          <div>
            <div className="line-r3 mb-1">
              <img src="src/components/screens/icon/check-icon.svg" />
              <p className="rec-check">
                Java 개발 이해도로 개발팀과 원활한 소통이 가능합니다
              </p>
            </div>
            <div className="line-r3">
              <img src="src/components/screens/icon/check-icon.svg" />
              <p className="rec-check">
                시니어 리더십으로 팀 관리 역량이 뛰어납니다
              </p>
            </div>
          </div>
        </div>

        <div className="point-box">
          <div>
            <p className="point-title">매칭 포인트</p>
            <p className="point-detail">기획 경험, PM 역량</p>
          </div>

          <div>
            <p className="point-title">시장 동향</p>
            <p className="point-detail">시니어 PM 수요 증가</p>
          </div>
        </div>
      </div>

      <div className="rec-card">
        <div className="text-box-r">
          <div className="line-r">
            <p style={{ fontSize: '30px' }}>➂</p>
            <p className="rec-title">프로그래머</p>
          </div>

          <div className="line-r2">
            <img src="src/components/screens/icon/bulb-icon.svg" />
            <p className="rec-reason">왜 추천했는지</p>
          </div>

          <div>
            <div className="line-r3 mb-1">
              <img src="src/components/screens/icon/check-icon.svg" />
              <p className="rec-check">
                Java 개발 이해도로 개발팀과 원활한 소통이 가능합니다
              </p>
            </div>
            <div className="line-r3">
              <img src="src/components/screens/icon/check-icon.svg" />
              <p className="rec-check">
                시니어 리더십으로 팀 관리 역량이 뛰어납니다
              </p>
            </div>
          </div>
        </div>

        <div className="point-box">
          <div>
            <p className="point-title">매칭 포인트</p>
            <p className="point-detail">기획 경험, PM 역량</p>
          </div>

          <div>
            <p className="point-title">시장 동향</p>
            <p className="point-detail">시니어 PM 수요 증가</p>
          </div>
        </div>
      </div>

      <div className="">
        <button className="btn-r">다시 분석하기</button>
        <button
          className="btn-r"
          onClick={() => onNavigate && onNavigate(SCREENS.HOME)}
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
};
