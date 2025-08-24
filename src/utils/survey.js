// src/utils/survey.js
import api from "./api";

/** 배열이면 ", "로 합치고, 아니면 문자열/빈값 반환 */
const join = (v) => Array.isArray(v) ? v.filter(Boolean).join(", ") : (v ?? "");

/** Wizard 폼 -> 서버 스펙으로 변환 */
const toPayload = (f = {}) => {
  // 출생년도 숫자만 추출
  const birthYear =
    typeof f.birth === "number" ? f.birth :
    Number(String(f.birth ?? f.birthYear ?? "").replace(/\D/g, "").slice(0, 4)) || undefined;

  return {
    // 기본
    name: f.name ?? "",
    birthYear,
    gender: f.gender ?? "",
    phone: f.phone ?? "",
    region: f.region ?? f.district ?? "",

    // 이동/거리
    transports: join(f.transport),
    commuteDistance: f.distance ?? f.commuteDistance ?? "",

    // 건강/근로
    healthStatus: f.health ?? f.healthStatus ?? "",
    workHours: f.commuteTime ?? f.workHours ?? "",
    workDays: f.workDays ?? "",

    // 고려사항
    considerations: join(f.considerations),

    // 경력/스킬
    career: f.mainCareer ?? f.career ?? "",
    certificates: join(f.certs),
    digitalSkill: f.computer ?? f.digitalSkill ?? "",

    // 희망
    jobPreferences: join(f.desiredJobs),
    workTypes: join(Array.isArray(f.workType) ? f.workType : [f.workType].filter(Boolean)),
    wagePreference: f.desiredPay ?? f.wagePreference ?? "",

    // 교육/지원/앱도움
    educationInterests: join(f.eduCompleted ?? f.educationInterests),
    supportNeeds: join(f.supportNeeds),
    appHelps: join(f.workHelp ?? f.appHelps),

    // 의견
    opinion: f.suggestions ?? f.opinion ?? "",
  };
};

/** 호출 인자: (userId, form) 또는 ({ userId, ...form }) 둘 다 허용 */
export const saveSurvey = async (...args) => {
  let userId, form;
  if (typeof args[0] === "object" && args.length === 1) {
    const { userId: uid, ...rest } = args[0];
    userId = uid ?? rest.id;
    form = rest;
  } else {
    userId = args[0];
    form = args[1] || {};
  }

  if (!userId) {
    try { userId = JSON.parse(localStorage.getItem("user") || "{}").id; } catch {}
  }
  if (!userId) throw new Error("saveSurvey: userId가 없습니다.");

  const body = toPayload(form);

  try {
    // 🔸 서버 스펙: POST /api/profile/{userId}
    const r = await api.post(`/api/profile/${userId}`, body);
    return { ok: r.status >= 200 && r.status < 300, status: r.status, data: r.data };
  } catch (e) {
    const status = e?.response?.status;
    // 아직 엔드포인트 미배포 등일 때 개발 편의용 임시 저장
    if (status === 404 || status === 405 || status === 501) {
      try { localStorage.setItem("survey.last", JSON.stringify({ userId, body })); } catch {}
      return { ok: false, status, offlineSaved: true, message: "설문 API 미배포(임시 로컬 저장)" };
    }
    // 그 외 에러는 그대로 던짐
    throw e;
  }
};
