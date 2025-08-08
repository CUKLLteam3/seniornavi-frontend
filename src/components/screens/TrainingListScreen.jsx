import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { SCREENS } from '../../constants/screens';

export const TrainingListScreen = ({ onNavigate, onBack, onApply }) => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 임시 데이터
  useEffect(() => {
    setTimeout(() => {
      setTrainings([
        {
          id: 'training1',
          title: '시니어를 위한 스마트폰 기초 활용',
          company: '평생학습관',
          location: '부천시 원미구',
          period: '9/15 - 10/13',
          hours: '총 32시간 (16일)',
          target: '만 50세 이상',
          cost: '무료',
        },
        {
          id: 'training2',
          title: '건강한 한식요리 교실',
          company: '문화센터',
          location: '부천시 원미구',
          period: '9/20 - 11/1',
          hours: '총 48시간 (24일)',
          target: '요리에 관심있는 시니어',
          cost: '50,000원',
        },
        {
          id: 'training3',
          title: '컴퓨터 기초 및 인터넷 활용',
          company: '직업전문학교',
          location: '부천시 원미구',
          period: '9/10 - 11/29',
          hours: '총 80시간 (40일)',
          target: '컴퓨터 초보자',
          cost: '300,000원',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTrainings = trainings.filter(
    (training) =>
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⏳</div>
          <p>교육 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="text-2xl font-bold text-primary-600 mb-4">
          교육 프로그램
      </h1>

      {/* 검색 */}
      <div className="mb-4 gap-2 flex">
        <input
          type="text"
          placeholder="교육과정이나 기관명을 검색하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input-field flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchTerm(searchInput);
            }
          }}
        />
        <Button className="px-4" onClick={() => setSearchTerm(searchInput)}>
          검색
        </Button>
      </div>

      <div className="space-x-2 mb-6">
        <button className="px-4 text-gray-500">상세 필터</button>
        {/* <button className="px-4 text-gray-500">내 주변</button> */}
      </div>
      <h2 className="mb-4">전체 {trainings.length}개</h2>

      {/* 교육 목록 */}
      <div className="space-y-4">
        {filteredTrainings.map((training) => (
          <div
            key={training.id}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{training.title}</h3>
                <p className="text-gray-600 mb-2">{training.company}</p>
                <div className="flex flex-col flex-wrap text-sm text-gray-500">
                  <span>📆 {training.period}</span>
                  <span>⏰ {training.hours}</span>
                  <span>📍 {training.location}</span>
                  <span>👤 {training.target}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button onClick={() => onApply && onApply(training)}>
                수강 신청
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() =>
                  onNavigate && onNavigate(SCREENS.TRAINING_DETAIL, training)
                }
              >
                상세보기
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
