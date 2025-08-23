// 일자리 wantlist를 위한 매핑
export const workRegionMap = {
  "서울": "R3010",
  "서울시": "R3010",
  "서울특별시": "R3010",

  "인천": "R3011",
  "인천시": "R3011",
  "인천광역시": "R3011",

  "대전": "R3012",
  "대전시": "R3012",
  "대전광역시": "R3012",

  "대구": "R3013",
  "대구시": "R3013",
  "대구광역시": "R3013",

  "부산": "R3014",
  "부산시": "R3014",
  "부산광역시": "R3014",

  "광주": "R3015",
  "광주시": "R3015",
  "광주광역시": "R3015",

  "울산": "R3016",
  "울산시": "R3016",
  "울산광역시": "R3016",

  "경기": "R3017",
  "경기도": "R3017",

  "강원": "R3018",
  "강원도": "R3018",

  "충남": "R3019",
  "충청남도": "R3019",

  "충북": "R3020",
  "충청북도": "R3020",

  "경북": "R3021",
  "경상북도": "R3021",

  "경남": "R3022",
  "경상남도": "R3022",

  "전남": "R3023",
  "전라남도": "R3023",

  "전북": "R3024",
  "전라북도": "R3024",

  "제주": "R3025",
  "제주도": "R3025",

  "세종": "R3026",
  "세종특별자치시": "R3026",

  "해외": "R3030"
};

export const recruitTypeMap = {
  "신입": "R2010",
  "경력": 'R2020',
  "신입+경력": "R2030",
};

export function getRecrutSe(careerText) {
  const codes = [];
  if (!careerText || careerText.includes('없')) {
    codes.push(recruitTypeMap['신입']);
  } else {
    codes.push(recruitTypeMap['경력']);
  }
  codes.push(recruitTypeMap['신입+경력']);
  return codes.join(',');
}

export function makeWantListPayload(surveyData) {
  const region = surveyData.region?.split(' ')[0];

  return {
    ncsCdLst: null,
    hireTypeLst: null,
    workRgnLst: workRegionMap[region] || null,
    recrutSe: getRecrutSe(surveyData.career),
  };
}

// 교육 상세필터를 위한 매핑
export const programMap = {
  '전체': 'both',
  '국민내일배움카드': 'card',
  '일학습병행 훈련과정': 'apprentice',
};

export const areaMap = {
  '서울': '11',
  '경기': '41',
  '인천': '28',
};

export const gbnMap = {
  '일반과정': 'M1001',
  '인터넷과정': 'M1005',
  '혼합과정': 'M1010',
  '스마트혼합훈련': 'M1014',
};
