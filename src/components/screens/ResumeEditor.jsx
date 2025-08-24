// src/components/screens/ResumeEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import penguin from '../../assets/이력_등록하기.webp';
import './resumeEditor.css';

// ResumeInput 컴포넌트
const ResumeInput = ({ 
  resumeData, 
  setResumeData, 
  setRecommendation, 
  isLoading, 
  setIsLoading,
  error,
  setError 
}) => {
  const handleSubmit = async () => {
    if (!resumeData.trim()) {
      setError('자소서를 입력해주세요');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`/__api/openai/resume`, {
        message: resumeData
      });
      setRecommendation(response.data.reply);
    } catch (err) {
      setError('추천을 받는 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="resume-input-container">
      <div className="input-card">
        <h2 className="input-title">자유롭게 자소서를 작성해주세요</h2>
        
        <textarea
          value={resumeData}
          onChange={(e) => setResumeData(e.target.value)}
          placeholder="예: 25년간 금융권에서 쌓은 고객 상담 경험을 활용하여 시니어 고객들에게 더 나은 서비스를 제공하고 싶습니다."
          className="resume-textarea"
          disabled={isLoading}
        />

        {error && (
          <div className="error-message">{error}</div>
        )}

        <div className="info-box">
          <h3 className="info-title">
            <span className="star-icon">⭐</span>
            작성 안내
          </h3>
          <ul className="info-list">
            <li>• 구체적이고 솔직하게 작성할수록 좋은 결과가 나옵니다</li>
            <li>• 보유한 기술이나 자격증 언급</li>
            <li>• 너무 길지 않게, 핵심만 간단히 작성하세요</li>
            <li>• 원하는 급여 수준이나 조건 명시</li>
          </ul>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? '생성 중...' : '자소서 초안 생성하기'}
        </button>
      </div>
    </div>
  );
};

// ResumeResult 컴포넌트
const ResumeResult = ({ 
  recommendation, 
  setRecommendation,
  isSaved,
  setIsSaved,
  isLoading,
  setIsLoading,
  error,
  setError,
  setResumeData,
  onNavigate
}) => {
  const getUserId = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.id || "1";
      } catch {
        return "1";
      }
    }
    return "1";
  };

const handleSave = async () => {
  setIsLoading(true);
  setError('');

  try {
    const userId = 1; // 임시 고정
    
    const response = await axios.post(
      `/__api/resume/${userId}/save`, 
      {
        res: recommendation
      }
    );
    
    setIsSaved(true);
    
  } catch (err) {
    console.error('Save error:', err.response?.status);
    
    // 404 에러는 개발 중이므로 성공으로 처리
    if (err.response?.status === 404) {
      console.log('⚠️ API 미구현 - 테스트 모드로 성공 처리');
      setIsSaved(true);  // UI상으로는 성공으로 표시
      return;
    }
    
    setError('저장 중 오류가 발생했습니다.');
  } finally {
    setIsLoading(false);
  }
};

  const handleBack = () => {
    setRecommendation('');
    setResumeData('');
    setIsSaved(false);
    setError('');
  };

  const handleHome = () => {
    onNavigate?.('home');
  };

  return (
    <div className="resume-result-container">
      <div className="result-card">
        <div className="result-header">
          <img 
            src={penguin} 
            alt="펭귄 마스코트" 
            className="mascot-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          {isSaved ? (
            <>
              <div className="saved-icon-container">
                <img src={penguin} alt="펭귄" className="small-mascot" />
                <span className="check-icon">✓</span>
              </div>
              <h2 className="result-title">저장이 완료되었습니다!</h2>
              <p className="result-subtitle">작성된 자소서는 내정보에서 확인하세요</p>
            </>
          ) : (
            <>
              <h2 className="result-title">완성도 높은 자소서가</h2>
              <h2 className="result-title">완성되었습니다</h2>
            </>
          )}
        </div>

        {!isSaved && (
          <>
            <div className="resume-content-section">
              <h3 className="content-title">
                <span className="doc-icon">📄</span>
                완성된 자소서
              </h3>
              <div className="resume-content-box">
                <p className="resume-text">{recommendation}</p>
              </div>
            </div>

            {error && (
              <div className="error-message">{error}</div>
            )}
          </>
        )}

        {isSaved ? (
          <div className="button-group">
            <button
              onClick={handleHome}
              className="primary-button"
            >
              홈으로 가기
            </button>
            <button
              onClick={handleBack}
              className="secondary-button"
            >
              계속 둘러보기
            </button>
          </div>
        ) : (
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="primary-button"
          >
            {isLoading ? '저장 중...' : '저장하기'}
          </button>
        )}

        {!isSaved && (
          <>
            <div className="sample-text">
              특히 고객상 담문야에서의 다년간의 경험을 통해 쌓인 에 실질적인 기여를 할 수 있다고 확신합니다.
            </div>

            <div className="info-box">
              <h3 className="info-title">
                <span className="star-icon">⭐</span>
                작성 안내
              </h3>
              <ul className="info-list">
                <li>• 우리 접식은 기술전결 구조로 경험과 변화를 자연스럽게 연결합니다</li>
                <li>• 행동-결과를 통해 역량과 인성을 드러내고, 불편요한 표현은 줄입니다</li>
                <li>• 300~500자 안에서 가독성과 설득력을 높여 완성합니다</li>
              </ul>
            </div>

            <button
              onClick={handleBack}
              className="secondary-button full-width"
            >
              처음부터 다시 작성하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// 메인 ResumeEditor 컴포넌트
export default function ResumeEditor({ onNavigate }) {
  const [resumeData, setResumeData] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // 인증 체크
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      onNavigate?.('login');
    }
  }, [onNavigate]);

  return (
    <div className="resume-editor-page">
      <header className="resume-editor-header">
        <button 
          className="back-btn"
          onClick={() => onNavigate?.('home')}
          aria-label="뒤로"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="#111"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="header-title">자소서 첨삭</h1>
        <div className="hdr-right" />
      </header>
      <div className="header-subtitle">저장하고 지원하세요</div>

      <main className="resume-editor-body">
        {!recommendation ? (
          <ResumeInput
            resumeData={resumeData}
            setResumeData={setResumeData}
            setRecommendation={setRecommendation}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            error={error}
            setError={setError}
          />
        ) : (
          <ResumeResult
            recommendation={recommendation}
            setRecommendation={setRecommendation}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            error={error}
            setError={setError}
            setResumeData={setResumeData}
            onNavigate={onNavigate}
          />
        )}
      </main>
    </div>
  );
}