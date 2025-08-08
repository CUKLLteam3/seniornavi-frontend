import { Button } from '../ui/Button';

export const JobDetailScreen = ({
  job,
  onBack,
  onApply,
  onToggleFavorite,
  isFavorite,
}) => {
  if (!job) return <p>선택된 일자리가 없습니다.</p>;

  return (
    <div className="page">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-3">
          <button className="bg-white" onClick={onBack}>
            &lt;
          </button>
          <h1 className="text-2xl font-bold text-primary-600">채용공고 상세</h1>
        </div>

        {/* 관심 버튼 */}
      </div>

      <div className="card">
        <div className="p-2">
          <p className="text-xl font-semibold mb-1">{job.title}</p>
          <p className="text-gray-600 mb-3">{job.company}</p>
          <h3 className="text-blue-600 font-semibold">{job.salary}</h3>
        </div>
      </div>

      <div className="card">
        <p className="text-lg font-semibold p-3">근무 조건</p>

        <div className="text-sm text-gray-600 space-y-3 p-3">
          <div>
            <h4>📍 근무지역</h4>
            &emsp;&ensp;{job.location}
          </div>
          <div>
            <h4>⏰ 근무시간</h4>
            &emsp;&ensp;{job.workingHours}
          </div>
          <div>
            <h4>📆 근무형태</h4>
            &emsp;&ensp;{job.workingHours}
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-lg font-semibold p-3">지원 자격</p>

        <div className="text-sm text-gray-600 space-y-4 p-3">
          <div className="flex items-center justify-between">
            <h4>학력</h4> 고등학교졸업
          </div>{' '}
          <hr></hr>
          <div className="flex items-center justify-between">
            <h4>경력</h4> 경력무관
          </div>{' '}
          <hr></hr>
          <div className="flex items-center justify-between">
            <h4>고용형태</h4> 정규직
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-lg font-semibold p-3">복리후생</p>

        <div className="text-sm text-gray-600 space-y-3 p-3">
          <p>🟣 4대보험</p>
          <p>🟣 퇴직금</p>
          <p>🟣 연차, 경조휴가, 명절상여금</p>
        </div>
      </div>

      <div className="card">
        <p className="text-lg font-semibold p-3">지원 방법</p>

        <div className="text-sm text-gray-600 space-y-3 p-3">
          <div>
            <h4>접수방법</h4>
            이메일, 우편, 방문접수
          </div>
          <div>
            <h4>제출서류</h4>
            이력서, 자기소개서
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
            <div className="space-y-1">
              <div>
                <strong>👤 채용담당자</strong> &ensp;김관리
              </div>
              <div>
                <strong>📞 연락처</strong> &ensp;02-1234-5678
              </div>
              <div>
                <strong>🌐 홈페이지</strong> &ensp;www.naver.com
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex space-x-2 p-3">
          <div>📆</div>
          <div>
            <h4>지원 마감일</h4>
            2024년 9월 15일
          </div>
        </div>
      </div>
    </div>
  );
};
