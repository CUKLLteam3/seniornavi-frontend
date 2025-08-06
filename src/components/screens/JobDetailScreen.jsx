import { Button } from '../ui/Button';

export const JobDetailScreen = ({ job, onBack, onApply, onToggleFavorite, isFavorite}) => {
  if (!job) return <p>선택된 일자리가 없습니다.</p>;

  return (
    <div className="page">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <button className="bg-white" onClick={onBack}>🠔</button>
          <h1 className="text-2xl font-bold text-primary-600 mb-4">
          채용공고 상세
          </h1>
        </div>

        {/* 관심 버튼 */}
      </div>
      

      <div className="card p-4 space-y-4">
        <div>
          <p className="text-xl font-semibold mb-1">{job.title}</p>
          <p className="text-gray-600 mb-2">{job.company}</p>
          <h3 className="text-blue-600 font-semibold">{job.salary}</h3>
        </div>
      </div>

      <div className="card p-4 space-y-4">
        <p className="text-lg font-semibold mb-1">근무 조건</p>

        <div className="text-sm text-gray-600 space-y-1">
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

      <div className="card p-4 space-y-4">
        <p className="text-lg font-semibold mb-1">지원 자격</p>

        <div className="text-sm text-gray-600 space-y-1">
          <div>
            <h4>학력</h4>
          </div>
          {}
          <div>
            <h4>경력</h4>
          </div>
          {}
          <div>
            <h4>고용형태</h4>
          </div>
          {}
        </div>
      </div>
    </div>
  );
};
