import { Button } from '../ui/Button';

export const TrainingDetailScreen = ({ training, onBack, onApply, onToggleFavorite, isFavorite}) => {
  if (!training) return <p>선택된 교육 프로그램이 없습니다.</p>;

  return (
    <div className="page">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <button className="bg-white" onClick={onBack}>🠔</button>
          <h1 className="text-2xl font-bold text-primary-600">
          교육과정 상세
          </h1>
        </div>

        {/* 관심 버튼 */}
      </div>
      

      <div className="card p-4 space-y-4">
        <div>
          <p className="text-xl font-semibold mb-1">{training.title}</p>
          <p className="text-gray-600 mb-2">{training.company}</p>
          <h3 className="text-blue-600 font-semibold">{training.cost}</h3>
        </div>
      </div>


      <div className="card p-4 space-y-4">
        <p className="text-lg font-semibold mb-1">과정 개요</p>

        <div className="text-sm text-gray-600 space-y-1">
          <div>
            <h4>훈련 목표</h4>
          </div>
          {}
          <div>
            <h4>과정 소개</h4>
          </div>
          {}
          <div>
            <h4>부제목</h4>
          </div>
          {}
        </div>
      </div>

      <div className="card p-4 space-y-4">
        <p className="text-lg font-semibold mb-1">교육 일정</p>

        <div className="text-sm text-gray-600 space-y-1">
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

      <div className="card p-4 space-y-4">
        <p className="text-lg font-semibold mb-1">수강 정보</p>

        <div className="text-sm text-gray-600 space-y-1">
          <div>
            <h4>수강 신청 현황</h4>
            {training.period}
          </div>
          <div>
            <h4>교육대상</h4>
            {training.target}
          </div>
        </div>
      </div>

      <div className="card p-4 space-y-4">
        <p className="text-lg font-semibold mb-1">교육기관 정보</p>

        <div className="text-sm text-gray-600 space-y-1">
          <div>
            <h4>🏢 기관명</h4>
            &emsp;&ensp;{training.company}
          </div>
          <div className="card">
            <div><strong>전화번호</strong> &ensp;{training.location}</div>
            <div><strong>팩스</strong> &ensp;{training.location}</div>
            <div><strong>이메일</strong> &ensp;{training.location}</div>
            <div><strong>홈페이지</strong> &ensp;{training.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
