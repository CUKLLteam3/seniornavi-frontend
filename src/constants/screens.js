// 화면 목록 (TypeScript Screen 타입 대신)
export const SCREENS = {
  HOME: 'home',
  LOGIN: 'login',
  SIGNUP: 'signup',
  ONBOARDING_INTRO: 'onboarding-intro',
  ONBOARDING_STEP_1: 'onboarding-step-1',
  ONBOARDING_STEP_2: 'onboarding-step-2',
  ONBOARDING_STEP_3: 'onboarding-step-3',
  ONBOARDING_STEP_4: 'onboarding-step-4',
  JOB_MATCHING_METHOD: 'job-matching-method',
  JOB_SURVEY: 'job-survey',
  AI_CONVERSATION: 'ai-conversation',
  DIRECT_WRITE: 'direct-write',
  JOB_RECOMMENDATIONS: 'job-recommendations',
  TRAINING_RECOMMENDATIONS: 'training-recommendations',
  JOB_LIST: 'job-list',
  JOB_DETAIL: 'job-detail',
  TRAINING_LIST: 'training-list',
  TRAINING_DETAIL: 'training-detail',
  MY_INFO: 'my-info',
  PROFILE: 'profile',
  HELP_CENTER: 'help-center'
};

// 팀원별 담당 화면
export const TEAM_SCREENS = {
  FRONTEND_1: [
    SCREENS.HOME,
    SCREENS.SIGNUP,
    SCREENS.ONBOARDING_INTRO,
    SCREENS.ONBOARDING_STEP_1,
    SCREENS.ONBOARDING_STEP_2,
    SCREENS.ONBOARDING_STEP_3,
    SCREENS.ONBOARDING_STEP_4,
    SCREENS.MY_INFO,
    SCREENS.PROFILE,
    SCREENS.JOB_SURVEY,
    SCREENS.AI_CONVERSATION,
    SCREENS.DIRECT_WRITE
  ],
  FRONTEND_2: [
    SCREENS.JOB_RECOMMENDATIONS,
    SCREENS.TRAINING_RECOMMENDATIONS,
    SCREENS.JOB_LIST,
    SCREENS.JOB_DETAIL,
    SCREENS.TRAINING_LIST,
    SCREENS.TRAINING_DETAIL
  ],
  TEAM_LEADER: [
    SCREENS.LOGIN,
    SCREENS.JOB_MATCHING_METHOD
  ]
};