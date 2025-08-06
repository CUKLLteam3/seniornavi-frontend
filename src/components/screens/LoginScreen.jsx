import React from 'react';
import logoImg from './logo.png'; // screens 폴더에 logo.png 있어야 함

const LoginScreen = ({ onLogin, onSignup, onForgotPassword }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      method: 'phone',
      phone: e.target.phone.value,
      password: e.target.password.value,
    };
    onLogin(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-8">
      {/* 로고 */}
      <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
        <img src={logoImg} alt="로고" className="w-20 h-20 object-contain" />
      </div>

      {/* 텍스트 설명 */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Re-fly</h1>
        <p className="text-base mt-2 text-gray-700">새로운 시작을 위한</p>
        <p className="text-lg font-bold text-purple-600">시니어 취업 플랫폼</p>
      </div>

      {/* 아이콘 설명 */}
      <div className="flex space-x-4 text-sm text-gray-600 mb-6">
        <div>🔒 안전한 로그인</div>
        <div>❤️ 시니어 맞춤</div>
        <div>🕒 24시간 지원</div>
      </div>

      {/* 로그인 카드 */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">로그인</h2>
        <p className="text-sm text-center text-gray-500 mt-1 mb-6">안전하고 간편한 로그인</p>

        {/* 탭 */}
        <div className="flex mb-4">
          <button className="flex-1 py-2 border rounded-l-lg bg-blue-100 text-blue-700 font-semibold">
            📱 휴대폰
          </button>
          <button className="flex-1 py-2 border rounded-r-lg text-gray-600">
            💬 SMS 인증
          </button>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm font-medium text-gray-700">휴대폰 번호</label>
          <input
            type="text"
            name="phone"
            placeholder="010-1234-5678"
            className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-gray-200 text-pink-700 font-semibold py-2 rounded hover:bg-gray-300 transition"
          >
            📞 로그인하기
          </button>
        </form>

        {/* 구분선 */}
        <div className="flex items-center my-4 text-gray-400">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm">또는</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* 카카오 로그인 */}
        <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition mb-4">
          🟡 카카오로 간편 로그인
        </button>

        {/* 회원가입 / 비밀번호 찾기 */}
        <div className="text-center text-sm text-gray-700">
          <p className="mb-2">아직 회원이 아니신가요?</p>
          <button
            onClick={onSignup}
            className="w-full bg-gray-200 text-gray-700 font-bold py-2 rounded mb-2 hover:bg-gray-300 transition"
          >
            회원가입하기
          </button>
          <button
            onClick={onForgotPassword}
            className="w-full bg-white border text-gray-600 font-semibold py-2 rounded hover:bg-gray-100 transition"
          >
            비밀번호 찾기
          </button>
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="mt-6 text-xs text-center text-gray-500">
        <p>🔒 <span className="font-semibold">개인정보 보호:</span> 모든 정보는 안전하게 암호화 처리됩니다</p>
        <p>📞 <span className="font-semibold">고객지원:</span> 로그인에 문제가 있으신가요? 언제든 문의하세요</p>
        <div className="mt-2 underline">
          이용약관 · 개인정보처리방침 · 고객센터
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
