import React, { useState } from 'react';

const SignupScreen = ({ onBack }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birth: '',
    gender: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">회원가입</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">👤 기본 정보</h2>

        {/** 이메일 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">이메일</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/** 비밀번호 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/** 비밀번호 확인 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/** 이름 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/** 전화번호 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">전화번호</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/** 생년월일 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">생년월일</label>
          <input
            type="date"
            name="birth"
            value={form.birth}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/** 성별 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">성별</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">선택</option>
            <option value="남">남성</option>
            <option value="여">여성</option>
          </select>
        </div>

        {/** 주소 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">주소</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4">
          가입하기
        </button>

        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:underline mt-2 block text-center"
        >
          ← 로그인 화면으로
        </button>
      </div>
    </div>
  );
};

export default SignupScreen;
