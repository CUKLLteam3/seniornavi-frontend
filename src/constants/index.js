// 사용자 프로필 기본 구조
export const DEFAULT_USER_PROFILE = {
  name: '김철수',
  gender: '남성',
  birthDate: '1955-03-15',
  phone: '010-1234-5678',
  address: '부천시 원미구',
  previousJobs: ['교사', '사무직'],
  physicalCondition: '양호',
  recentWorkExperience: '있음',
  healthCondition: '좋음',
  interests: ['교육', '상담'],
  workPreferences: ['시간제', '실내 근무'],
  workType: '시간제',
  availableDays: ['월', '화', '수'],
  availableTime: '오전 (09:00-12:00)',
  travelDistance: '2km 이내',
  personality: ['꼼꼼함', '친근함'],
  hobbies: ['독서', '산책'],
  profileCompleted: true,
  completedSteps: 1
};

// 초기 지원 내역
export const INITIAL_APPLICATIONS = [
  {
    id: '1',
    type: 'job',
    itemId: 'job1',
    title: '부천시청 민원도우미',
    company: '부천시청',
    appliedDate: '2024.12.25',
    status: 'pending'
  },
  {
    id: '2',
    type: 'training',
    itemId: 'training1',
    title: '디지털 활용 기초교육',
    company: '부천시 평생학습관',
    appliedDate: '2024.12.20',
    status: 'approved'
  }
];

// 초기 즐겨찾기
export const INITIAL_FAVORITES = [
  {
    id: '1',
    type: 'job',
    itemId: 'job2',
    title: '학교 급식 도우미',
    company: '부천초등학교',
    addedDate: '2024.12.22'
  }
];