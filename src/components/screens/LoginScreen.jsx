import React, { useState } from 'react';
import { Button } from '../ui/Button';

export const LoginScreen = ({ onLogin, onSignup, onForgotPassword }) => {
  const [phone, setPhone] = useState('');
  const [loginMethod, setLoginMethod] = useState('phone');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (loginMethod === 'phone' && phone) {
      onLogin({ method: 'phone', phone });
    } else if (loginMethod === 'kakao') {
      onLogin({ method: 'kakao' });
    }
  };

  return (
    <div className="page">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          🏠 SENiorNAVi
        </h1>
        <p className="text-gray-600">시니어를 위한 일자리 매칭 서비스</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="card">
          <h2 className="font-semibold mb-4">로그인 방식 선택</h2>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="loginMethod"
                value="phone"
                checked={loginMethod === 'phone'}
                onChange={(e) => setLoginMethod(e.target.value)}
                className="text-primary-600"
              />
              <span>📱 휴대폰 번호로 로그인</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="loginMethod"
                value="kakao"
                checked={loginMethod === 'kakao'}
                onChange={(e) => setLoginMethod(e.target.value)}
                className="text-primary-600"
              />
              <span>💬 카카오톡으로 로그인</span>
            </label>
          </div>
        </div>

        {loginMethod === 'phone' && (
          <div className="card">
            <label className="block text-sm font-medium mb-2">
              휴대폰 번호
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-1234-5678"
              className="input-field"
              required
            />
          </div>
        )}

        <Button type="submit" className="w-full">
          {loginMethod === 'phone' ? '휴대폰으로 로그인' : '카카오톡으로 로그인'}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <button 
          onClick={onSignup}
          className="text-primary-600 hover:underline"
        >
          회원가입
        </button>
        <span className="text-gray-400 mx-2">|</span>
        <button 
          onClick={onForgotPassword}
          className="text-gray-500 hover:underline"
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};