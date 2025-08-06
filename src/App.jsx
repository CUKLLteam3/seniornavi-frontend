import React, { useState } from 'react';

// 화면 컴포넌트들
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import HomeScreen from './components/screens/HomeScreen';
import { VoiceGuide } from './components/layout/VoiceGuide';

// 스타일
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null); // 사용자 정보 상태 추가

  const handleLogin = (data) => {
    console.log('로그인 정보:', data);
    // 여기서 가상 로그인 처리
    setCurrentUser({ name: '홍길동', phone: data.phone });
    setCurrentPage('home'); // 홈 화면으로 이동
  };

  const handleSignup = () => {
    setCurrentPage('signup');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="app-container">
      <VoiceGuide />

      {currentPage === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onSignup={handleSignup}
          onForgotPassword={() => alert('비밀번호 찾기 준비중')}
        />
      )}

      {currentPage === 'signup' && (
        <SignupScreen onBack={handleBackToLogin} />
      )}

      {currentPage === 'home' && currentUser && (
        <HomeScreen user={currentUser} onNavigate={(screen) => alert(`${screen}은 아직 준비 중입니다.`)} />
      )}
    </div>
  );
}

export default App;
