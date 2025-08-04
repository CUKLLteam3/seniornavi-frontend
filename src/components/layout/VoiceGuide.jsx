import React, { useState } from 'react';

export const VoiceGuide = () => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // TODO: 음성 가이드 기능 구현
    console.log('음성 가이드:', isListening ? '종료' : '시작');
  };

  return (
    <button
      onClick={handleVoiceToggle}
      className={`fixed top-4 left-4 z-50 p-3 rounded-full shadow-lg transition-all ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white`}
    >
      <span className="text-lg">
        {isListening ? '🔴' : '🎤'}
      </span>
    </button>
  );
};