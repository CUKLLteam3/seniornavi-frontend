import React, { useState, useEffect } from "react";
import "./styles/globals.css";

// Layout Components (존재하지 않는 컴포넌트들은 임시로 주석 처리)
import Layout from "./components/screens/Layout";
// import StatusBar from "./components/layout/StatusBar";
import BottomNavigation from "./components/layout/BottomNavigation";
// import { VoiceGuide } from "./components/layout/VoiceGuide";

// 임시 더미 컴포넌트들
const StatusBar = () => <div style={{display: 'none'}}>
  <span>9:41</span>
  <span>🔋</span>
</div>;

const VoiceGuide = () => (
  <button style={{ display: "none"}}>
    🎤
  </button>
);

// Screen Components
import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import HomeScreen from "./components/screens/HomeScreen";
import ResumeScreen from "./components/screens/Resume";
import ResumeEditor from "./components/screens/ResumeEditor";
import SurveyWizard from "./components/screens/SurveyWizard";
import SurveyComplete from "./components/screens/SurveyComplete";
import MyPage from "./components/screens/MyPage";
import { JobListScreen } from "./components/screens/JobListScreen";
import { JobDetailScreen } from "./components/screens/JobDetailScreen";
import { TrainingListScreen } from "./components/screens/TrainingListScreen";
import { TrainingDetailScreen } from "./components/screens/TrainingDetailScreen";

// Utils (임시 더미 함수들)
// import { getCurrentUser, logout } from "./utils/auth";
const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    // 토큰과 사용자 정보가 모두 있어야 로그인 상태로 인정
    if (!token || !user) {
      return null;
    }
    
    return JSON.parse(user);
  } catch {
    return null;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Constants (임시)
// import { SCREENS } from "./constants/screens";
const SCREENS = {
  HOME: 'home',
  LOGIN: 'login', 
  SIGNUP: 'signup',
  JOB_LIST: 'job-list',
  JOB_DETAIL: 'job-detail',
  TRAINING_LIST: 'training-list',
  TRAINING_DETAIL: 'training-detail'
};

function App() {
  // 인증 상태
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // 네비게이션 상태 (초기값을 LOGIN으로 변경)
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LOGIN);
  const [screenParams, setScreenParams] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);
  
  // 설문 상태
  const [showSurvey, setShowSurvey] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // 초기 인증 체크
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = getCurrentUser();
        console.log('인증 체크 결과:', user); // 디버깅용
        
        setCurrentUser(user);
        
        // '로그인되어 있으면 홈으로, 아니면 로그인으로' 였다가 로그인 안 되어 있으면 로그인
        // if (user) {
        //   setCurrentScreen(SCREENS.HOME);
        // }
        if(!user) {
          setCurrentScreen(SCREENS.LOGIN);
        }
      } catch (error) {
        console.error('인증 체크 실패:', error);
        setCurrentUser(null);
        setCurrentScreen(SCREENS.LOGIN);
      } finally {
        setAuthLoading(false);
      }
    };

    // localStorage 클리어 (개발 중 테스트를 위해)
    // localStorage.clear(); // 이 줄의 주석을 해제하면 항상 로그인 화면부터 시작
    
    checkAuth();
  }, []);

  // 네비게이션 핸들러
  const handleNavigate = (screen, params = null) => {
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  // 로그인 성공 핸들러
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentScreen(SCREENS.HOME);
    setShowSignup(false);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setCurrentScreen(SCREENS.LOGIN);
    setShowSurvey(false);
  };

  // 회원가입 관련 핸들러
  const handleShowSignup = () => {
    setShowSignup(true);
    setCurrentScreen(SCREENS.SIGNUP);
  };

  const handleBackToLogin = () => {
    setShowSignup(false);
    setCurrentScreen(SCREENS.LOGIN);
  };

  const handleSignupComplete = () => {
    setShowSignup(false);
    setCurrentScreen(SCREENS.LOGIN);
  };

  // 설문 관련 핸들러
  const handleStartSurvey = () => {
    setShowSurvey(true);
    setCurrentScreen('survey-wizard');
  };

  const handleSurveyComplete = () => {
    setShowSurvey(false);
    setCurrentScreen('survey-complete');
  };

  const handleBackToHome = () => {
    setCurrentScreen(SCREENS.HOME);
    setShowSurvey(false);
  };

  const handleGoToAI = () => {
    setCurrentScreen('resumeEditor');
  };

  // 현재 페이지 컴포넌트 결정
  const getCurrentPageComponent = () => {
    // 로딩 중
    if (authLoading) {
      return (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="text-4xl mb-4">⏳</div>
            <p>로딩 중...</p>
          </div>
        </div>
      );
    }

    // 로그인 필요한 화면들
    const protectedScreens = [
      SCREENS.HOME,
      'resumeEditor',
      'survey-wizard',
      'survey-complete',
      SCREENS.JOB_LIST,
      SCREENS.JOB_DETAIL,
      SCREENS.TRAINING_LIST,
      SCREENS.TRAINING_DETAIL,
      'mypage'
    ];

    if (!currentUser && protectedScreens.includes(currentScreen)) {
      return (
        <LoginScreen 
          onLogin={handleLogin} 
          onSignup={handleShowSignup}
        />
      );
    }

    // 화면 라우팅
    switch (currentScreen) {
      case SCREENS.LOGIN:
        return (
          <LoginScreen 
            onLogin={handleLogin} 
            onSignup={handleShowSignup}
          />
        );

      case SCREENS.SIGNUP:
        return (
          <SignupScreen 
            onBack={handleBackToLogin}
            onSignup={handleSignupComplete}
          />
        );

      case SCREENS.HOME:
        return (
          <HomeScreen 
            onNavigate={(screen) => {
              if (screen === 'resume') {
                setCurrentScreen('resume-intro');
              } else if (screen === 'ai') {
                setCurrentScreen('resumeEditor');
              } else if (screen === 'jobs') {
                setCurrentScreen(SCREENS.JOB_LIST);
              } else if (screen === 'training') {
                setCurrentScreen(SCREENS.TRAINING_LIST);
              } else {
                handleNavigate(screen);
              }
            }}
          />
        );

      case 'resume-intro':
        return (
          <ResumeScreen 
            onNavigate={handleNavigate}
            onStart={handleStartSurvey}
          />
        );

      case 'resumeEditor':
        return <ResumeEditor onNavigate={handleNavigate} />;

      case 'survey-wizard':
        return (
          <SurveyWizard 
            onBackHome={handleBackToHome}
            onSubmitDone={handleSurveyComplete}
          />
        );

      case 'survey-complete':
        return (
          <SurveyComplete 
            onGoHome={handleBackToHome}
            onGoCoach={handleGoToAI}
          />
        );

      case SCREENS.JOB_LIST:
        return <JobListScreen onNavigate={handleNavigate} />;

      case SCREENS.JOB_DETAIL:
        return (
          <JobDetailScreen 
            jobId={screenParams}
            onNavigate={handleNavigate}
          />
        );

      case SCREENS.TRAINING_LIST:
        return <TrainingListScreen onNavigate={handleNavigate} />;

      case SCREENS.TRAINING_DETAIL:
        return (
          <TrainingDetailScreen 
            trainingId={screenParams}
            onNavigate={handleNavigate}
          />
        );

      case 'mypage':
        return (
          <MyPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );

      default:
        return (
          <HomeScreen 
            onNavigate={(screen) => {
              if (screen === 'resume') {
                setCurrentScreen('resume-intro');
              } else if (screen === 'ai') {
                setCurrentScreen('resumeEditor');
              } else if (screen === 'jobs') {
                setCurrentScreen(SCREENS.JOB_LIST);
              } else if (screen === 'training') {
                setCurrentScreen(SCREENS.TRAINING_LIST);
              } else {
                handleNavigate(screen);
              }
            }}
          />
        );
    }
  };

  // 하단 네비게이션이 표시되지 않을 화면들
  const hideBottomNavScreens = [
    SCREENS.LOGIN,
    SCREENS.SIGNUP,
    'survey-wizard',
    'survey-complete'
  ];

  const showBottomNav = !hideBottomNavScreens.includes(currentScreen);

  // 상단 상태바가 표시되지 않을 화면들
  const hideStatusBarScreens = [
    SCREENS.LOGIN,
    SCREENS.SIGNUP
  ];

  const showStatusBar = !hideStatusBarScreens.includes(currentScreen);

  return (
    <div
      className="app"
      style={{
        paddingBottom: '80px',
        minHeight: '100vh',
        backgroundColor: '#ffffff'
      }}
    >
      {/* 상단 상태바 */}
      {showStatusBar && <StatusBar />}
      
      {/* 음성 가이드 */}
      {currentUser && <VoiceGuide />}
      
      {/* 메인 레이아웃 */}
      <Layout>
        <div style={{ width: "401px", margin: "0 auto" }}>
          {getCurrentPageComponent()}
        </div>
      </Layout>
      
      {/* 하단 네비게이션 */}
      {showBottomNav && currentUser && (
        <BottomNavigation 
          currentPage={currentScreen}
          onNavigate={(page) => {
            if (page === 'home') {
              setCurrentScreen(SCREENS.HOME);
            } else if (page === 'jobs') {
              setCurrentScreen(SCREENS.JOB_LIST);
            } else if (page === 'training') {
              setCurrentScreen(SCREENS.TRAINING_LIST);
            } else if (page === 'ai') {
              setCurrentScreen('resumeEditor');
            } else if (page === 'mypage') {
              setCurrentScreen('mypage');
            } else {
              handleNavigate(page);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;