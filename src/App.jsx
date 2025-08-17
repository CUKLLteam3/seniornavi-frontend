import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 상수
import { DEFAULT_USER_PROFILE, INITIAL_APPLICATIONS, INITIAL_FAVORITES } from './constants/index';
import { SCREENS } from './constants/screens';

// 유틸리티
import { createApplicationHandlers } from './utils/appHandlers';

// 컴포넌트
import { HomeScreen } from './components/screens/HomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { JobListScreen } from './components/screens/JobListScreen';
import { JobDetailScreen } from './components/screens/JobDetailScreen';
import { TrainingListScreen } from './components/screens/TrainingListScreen';
import { TrainingDetailScreen } from './components/screens/TrainingDetailScreen';
import { RecResultScreen } from './components/screens/RecResultScreen';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { VoiceGuide } from './components/layout/VoiceGuide';

// 스타일
import './styles/globals.css';

function App() {
  // 인증 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // 현재 화면
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);

  
  // 앱 데이터
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  
  // 지원/즐겨찾기 핸들러
  const { handleApply, handleToggleFavorite, isFavorite, hasApplied } = createApplicationHandlers(
    applications,
    setApplications,
    favorites,
    setFavorites,
    null // 모달은 나중에 구현
  );
  
  // 로그인 처리
  const handleLogin = (loginData) => {
    console.log('로그인 시도:', loginData);
    
    let userData;
    
    if (loginData.method === 'phone') {
      userData = {
        ...DEFAULT_USER_PROFILE,
        phone: loginData.phone
      };
    } else if (loginData.method === 'kakao') {
      userData = {
        ...DEFAULT_USER_PROFILE,
        name: '이영희',
        phone: '010-9876-5432'
      };
    }
    
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setCurrentScreen(SCREENS.HOME);
  };
  
  // 로그아웃 처리
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentScreen(SCREENS.HOME);
  };
  
  // 화면 네비게이션
  const handleNavigate = (screen, data = null) => {
    console.log('화면 이동:', screen, data);
    setCurrentScreen(screen);

    if (screen === SCREENS.JOB_DETAIL && data) {
      setSelectedJob(data);
    } else if (screen === SCREENS.TRAINING_DETAIL && data) {
      setSelectedTraining(data);
    }

  };
  
  // 회원가입 (임시)
  const handleSignup = () => {
    alert('회원가입 기능은 준비 중입니다.');
  };
  
  // 비밀번호 찾기 (임시)
  const handleForgotPassword = () => {
    alert('비밀번호 찾기 기능은 준비 중입니다.');
  };

  // 로그인하지 않은 경우
  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <VoiceGuide />
        <LoginScreen
          onLogin={handleLogin}
          onSignup={handleSignup}
          onForgotPassword={handleForgotPassword}
        />
      </div>
    );
  }

  // 메인 앱
  return (
    <div className="app-container">
      <VoiceGuide />
      
      <div className="main-content">
        {/* 화면 렌더링 */}
        {currentScreen === SCREENS.HOME && (
          <HomeScreen 
            user={currentUser} 
            onNavigate={handleNavigate}
          />
        )}
        
        {currentScreen === SCREENS.JOB_LIST && (
          <JobListScreen
            onNavigate={handleNavigate}
            onApply={handleApply}
          />
        )}

        {currentScreen === SCREENS.JOB_DETAIL && (
          <JobDetailScreen
            job={selectedJob}
            onNavigate={handleNavigate}
            onApply={handleApply}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {currentScreen === SCREENS.TRAINING_LIST && (
          <TrainingListScreen
            onNavigate={handleNavigate}
            onApply={handleApply}
          />
        )}
        
        {currentScreen === SCREENS.TRAINING_DETAIL && (
          <TrainingDetailScreen
            training={selectedTraining}
            onNavigate={handleNavigate}
            onApply={handleApply}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {currentScreen === SCREENS.REC_RESULT && (
          <RecResultScreen
            onNavigate={handleNavigate}
          />
        )}

        {/* TODO: 다른 화면들 팀원들이 추가 */}
        
        {/* 기본 화면 (개발 중) */}
        {![SCREENS.HOME, SCREENS.JOB_LIST].includes(currentScreen) && (
          <div className="page">
            <h1>🚧 개발 중인 화면</h1>
            <div className="card">
              <p>현재 화면: <strong>{currentScreen}</strong></p>
              <p>이 화면은 팀원들이 개발 중입니다.</p>
              <button 
                className="btn-primary mt-4"
                onClick={() => setCurrentScreen(SCREENS.HOME)}
              >
                홈으로 가기
              </button>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation 
       currentScreen={currentScreen}
       onNavigate={handleNavigate}
       notificationCounts={{
         applications: applications.length,
         favorites: favorites.length
       }}
     />
   </div>
 );
}

export default App;