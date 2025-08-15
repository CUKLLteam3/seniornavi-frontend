import '../../styles/detail.css';

export const JobDetailScreen = ({
  job,
  onBack,
  onApply,
  onToggleFavorite,
  isFavorite,
}) => {
  if (!job) return <p>선택된 일자리가 없습니다.</p>;

  return (
    <div className="pg">
      <div className="title-box-d">
        <button className="back-btn" onClick={onBack}></button>
        <p className="title-text-d">일자리 상세보기</p>
      </div>

      <div className="j-card-1">
        <div className="job-com-box">
          <img
            src="src/components/screens/icon/company2-icon.svg"
            width={'47px'}
            height={'47px'}
          />
          <div className="job-com-text-box">
            <p className="job-title">{job.title}</p>
            <p className="job-company">{job.company}</p>
          </div>
        </div>
        <p className="job-salary">{job.salary}</p>
      </div>

      <div className="j-card-2">
        <p className="sub-title">근무조건</p>

        <div className="">
          <div className="condition-line-d">
            <img src="src/components/screens/icon/location-icon.svg" />
            <p className="sm-title">근무지역</p>
          </div>
          <p className="sm-detail">{job.location}</p>
          <hr></hr>

          <div className="condition-line-d">
            <img src="src/components/screens/icon/time-icon.svg" />
            <p className="sm-title">근무시간</p>
          </div>
          <p className="sm-detail">{job.workingHours}</p>
          <hr></hr>

          <div className="condition-line-d">
            <img
              src="src/components/screens/icon/calendar-icon.svg"
              width={'22px'}
              height={'22px'}
            />
            <p className="sm-title">근무형태</p>
          </div>
          <p className="sm-detail">주 5일</p>
          <hr></hr>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">지원자격</p>

        <div className="flex flex-col">
          <div className="mb-2">
            <div className="flex justify-between mb-2">
              <p className="sm-title">학력</p>
              <p className="sm-title">고등학교졸업</p>
            </div>
            <hr></hr>
          </div>

          <div className="mb-2">
            <div className="flex justify-between mb-2">
              <p className="sm-title">경력</p>
              <p className="sm-title">경력무관</p>
            </div>
            <hr></hr>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <p className="sm-title">고용형태</p>
              <p className="sm-title">정규직</p>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">복리후생</p>

        <div className="li">
          <li className="sm-title mb-4">4대보험</li>
          <li className="sm-title mb-4">퇴직금</li>
          <li className="sm-title">연차, 경조휴가, 명절상여금</li>
        </div>
      </div>

      <div className="j-card-2">
        <p className="sub-title mb-6">지원방법</p>

        <div>
          <div className="">
            <p className="sm-title mb-1">접수방법</p>
            <p className="sm-detail mb-6">이메일, 우편, 방문접수</p>
          </div>
          <div>
            <p className="sm-title mb-1">제출서류</p>
            <p className="sm-detail mb-6">이력서, 자기소개서</p>
          </div>

          <div className="mini-card">
            <div className="flex justify-between">
              <div className="icon-text">
                <img
                  className="user-icon"
                  src="src/components/screens/icon/user-icon.svg"
                />
                <p className="sm-detail">채용담당자</p>
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
                <a 
                  href="https://likelion.net/" 
                  target="_blank"
                >https://likelion.net/</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="j-card-3">
        <p className="sm-title mb-1">지원 마감일</p>
        <p className="xs-detail">2025년 9월 15일</p>
      </div>

      <button className="btn-3" onClick={() => onApply && onApply(job)}>
        지원하기
      </button>
    </div>
  );
};
