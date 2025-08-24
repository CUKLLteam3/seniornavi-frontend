// src/pages/ResumeEditor.jsx
import React, { useState, useEffect } from 'react';
import ResumeInput from '../components/ResumeInput';
import ResumeResult from '../components/ResumeResult';
import StatusBar from '../components/layout/StatusBar';
import '../styles/resumeEditor.css';

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
      <StatusBar />
      
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