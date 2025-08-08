import { Button } from '../ui/Button';

export const TrainingDetailScreen = ({
  training,
  onBack,
  onApply,
  onToggleFavorite,
  isFavorite,
}) => {
  if (!training) return <p>선택된 교육 프로그램이 없습니다.</p>;

  return (
    <div className="page">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-3">
          <button className="bg-white" onClick={onBack}>
            &lt;
          </button>
          <h1 className="text-2xl font-bold text-primary-600">교육과정 상세</h1>
        </div>

        {/* 관심 버튼 */}
      </div>

      <div className="card">
        <div className="p-2">
          <p className="text-xl font-semibold mb-1">{training.title}</p>
          <p className="text-gray-600 mb-3">{training.company}</p>
          <h3 className="text-blue-600 font-semibold">{training.cost}</h3>
        </div>
      </div>

      <div className="card">
        <p className="text-lg font-semibold p-3">과정 개요</p>

        <div className="text-sm text-gray-600 space-y-3 p-3">
          <div>
            <h4>훈련 목표</h4>
            스마트폰 기본 조작 및 앱 활용 능력 향상
          </div>
          <div>
            <h4>과정 소개</h4>
            스마트폰 기본 조작부터 카카오톡, 인터넷 사용법까지 체계적으로 학습
          </div>
          <div>
            <h4>부제목</h4>
            디지털 시대, 스마트폰으로 소통하기
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-lg font-semibold p-3">교육 일정</p>

        <div className="text-sm text-gray-600 space-y-3 p-3">
          <div>
            <h4>📆 교육기간</h4>
            &emsp;&ensp;{training.period}
          </div>
          <div>
            <h4>⏰ 교육시간</h4>
            &emsp;&ensp;{training.hours}
          </div>
          <div>
            <h4>📍 교육장소</h4>
            &emsp;&ensp;{training.location}
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-lg font-semibold p-3">수강 정보</p>

        <div className="text-sm text-gray-600 space-y-2 p-3">
          <div className="flex justify-between">
            <h4>수강 신청 현황</h4>
            <div
              style={{
                textAlign: 'right',
                marginTop: '1px',
                color: '#4b5563',
              }}
            >
              15명/20명 (75%)
            </div>
          </div>

          <progress
            value="15"
            max="20"
            style={{ width: '100%', accentColor: 'blue' }}
          ></progress>

          <div className="flex gap-3">
            <div
              style={{
                flex: 1,
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <h4>👤 정원</h4>
              <h3 className="text-blue-600">20명</h3>
            </div>
            <div
              style={{
                flex: 1,
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <h4>💲 수강료</h4>
              <h3 className="text-blue-600">{training.cost}</h3>
            </div>
          </div>
          <div>
            <h4>교육대상</h4>
            {training.target}
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-lg font-semibold p-3">교육기관 정보</p>

        <div className="text-sm text-gray-600 space-y-3 p-3">
          <div>
            <h4>🏢 기관명</h4>
            &emsp;&ensp;{training.company}
          </div>
          <div
            style={{
              flex: 1,
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
            }}
          >
            <div className="space-y-2">
              <div>
                <strong>📞 전화번호</strong> &ensp;02-1234-5678
              </div>
              <div>
                <strong>📞 팩스</strong> &ensp;02-1234-5679
              </div>
              <div>
                <strong>✉️ 이메일</strong> &ensp;info@gmail.com
              </div>
              <div>
                <strong>🌐 홈페이지</strong> &ensp;www.naver.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
