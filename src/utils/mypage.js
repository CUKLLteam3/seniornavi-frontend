// src/utils/mypage.js
import api from "./api";

// 내부 공통
const isOk = (s) => s === 200 || s === 204;
const toArr = (v) =>
  Array.isArray(v) ? v
  : Array.isArray(v?.data) ? v.data
  : Array.isArray(v?.items) ? v.items
  : Array.isArray(v?.data?.items) ? v.data.items
  : [];


/** =====================[ 1. 내정보 확인 ]=====================
 * GET /users/me
 * - 헤더: Authorization: Bearer <JWT>
 * - 200: { email, name, phone, birthdate, gender, address }
 * - ✅ 401: null 반환 (로그인 API가 임시유저이므로, 화면에서 안전 처리)
 */


export const getMyInfo = async ({ raw = true } = {}) => {
  try {
    const r = await api.get(`/users/me`);
    if (raw) return r.data;
    const d = r.data || {};
    return {
      email: d.email ?? "",
      name: d.name ?? "",
      phone: d.phone ?? "",
      birthdate: d.birthdate ?? "",
      gender: d.gender ?? "",
      address: d.address ?? "",
    };
  } catch (e) {
    if (e?.response?.status === 401) {
      // 로그인 API가 임시유저라 토큰 검증 실패 가능 → 화면에서 me null 처리
      return null;
    }
    throw e;
  }
};


/** =====================[ 2. 이력 내역(온보딩 설문) 조회 ]=====================
 * GET /api/profile/{userId}
 * - 200: 온보딩 설문 객체(단일)
 * - 404: null (미작성)
 * - 일부 환경에서 /profile/{userId} 일 수도 있어 폴백 처리
 */
{/*
export const getOnboardingProfile = async (userId, { fallback = true } = {}) => {
  if (userId === undefined || userId === null) {
    throw new Error("getOnboardingProfile: userId가 필요합니다.");
  }
  try {
    const r = await api.get(`/api/profile/${userId}`);
    return r.data; // 단일 객체
  } catch (e1) {
    if (e1?.response?.status === 404) return null;
    if (fallback) {
      try {
        const r2 = await api.get(`/profile/${userId}`);
        return r2.data;
      } catch (e2) {
        if (e2?.response?.status === 404) return null;
        throw e2;
      }
    }
    throw e1;
  }
};
*/}

/** =====================[ 3. 설문 저장(업서트) ]=====================
 * 스펙 미확정이라 호환 순서로 시도:
 * 1) PUT /api/profile/{userId}   body: payload
 * 2) POST /api/profile/{userId}  body: payload
 * 3) PUT /api/profile            body: { userId, ...payload }
 * 4) POST /profile/{userId}      body: payload
 * 모두 실패 시 마지막 에러 반환
 */
{/*
export const upsertOnboardingProfile = async (userId, payload = {}) => {
  if (userId === undefined || userId === null) {
    throw new Error("upsertOnboardingProfile: userId가 필요합니다.");
  }
  try {
    const r1 = await api.put(`/api/profile/${userId}`, payload);
    return { ok: isOk(r1.status), status: r1.status, data: r1.data };
  } catch (e1) {
    try {
      const r2 = await api.post(`/api/profile/${userId}`, payload);
      return { ok: isOk(r2.status), status: r2.status, data: r2.data };
    } catch (e2) {
      try {
        const r3 = await api.put(`/api/profile`, { userId, ...payload });
        return { ok: isOk(r3.status), status: r3.status, data: r3.data };
      } catch (e3) {
        try {
          const r4 = await api.post(`/profile/${userId}`, payload);
          return { ok: isOk(r4.status), status: r4.status, data: r4.data };
        } catch (e4) {
          return {
            ok: false,
            status:
              e4?.response?.status ??
              e3?.response?.status ??
              e2?.response?.status ??
              e1?.response?.status ??
              -1,
            message:
              e4?.response?.data?.message ??
              e3?.response?.data?.message ??
              e2?.response?.data?.message ??
              e1?.response?.data?.message ??
              (e4?.message || "설문 저장 실패"),
          };
        }
      }
    }
  }
};
*/}

/** =====================[ 4. 자소서(이력서) 조회 ]=====================
 * GET /resume/{userId}/read
 * 응답 예: [ { res: "333my_resume_file_name.pdf" } ]
 * 404면 []
 */
export const getResume = async (userId, { raw = false } = {}) => {
  try {
    const r = await api.get(`/resume/${userId}/read`);
    if (raw) return r.data;
    const d = r.data;
    if (Array.isArray(d)) return d.map((v) => v?.res ?? v).filter(Boolean);
    return d?.res ? [d.res] : [];
  } catch (e) {
    if (e?.response?.status === 404) return [];
    throw e;
  }
};

/** =====================[ 5. 저장한 공고 ]=====================
 * 목록: GET /recruit/{userId} (404면 [])
 * 삭제: DELETE /recruit/delete  body: { userId, sn }
 */
export const getSavedRecruits = async (userId) => {
  try {
    const r = await api.get(`/recruit/${userId}`);
    const arr = toArr(r.data);
    // 숫자/문자만 온 경우 {sn} 객체로 맞춰주기
    return arr.map((v) =>
      (typeof v === "number" || typeof v === "string") ? { sn: String(v) } : v
    );
  } catch (e) {
    if (e?.response?.status === 404) return [];
    throw e;
  }
};

/** =====================[ 6. 저장한 교육 ]=====================
 * 목록(신규 우선 → 구스펙 폴백)
 * 1) GET /api/mypage/saved-educations?userId=&expand=summary
 * 2) GET /mypage/saved-education?userId=
 * 404면 []
 * 삭제는 기존 다중 폴백 유지
 */

/*
export const getSavedEducation = async (userId, { expand = "summary", limit } = {}) => {
  const params = { userId, ...(expand ? { expand } : {}), ...(limit ? { limit } : {}) };
  try {
    const r1 = await api.get(`/api/mypage/saved-educations`, { params });
    return toArr(r1.data);
  } catch (e1) {
    if (e1?.response?.status === 404) return [];
    try {
      const r2 = await api.get(`/mypage/saved-education`, { params: { userId } });
      return toArr(r2.data);
    } catch (e2) {
      if (e2?.response?.status === 404) return [];
      throw e2;
    }
  }
};

export const deleteSavedEducation = async (userId, sn) => {
  // 1) /api/mypage/saved-educations
  try {
    const r = await api.delete(`/api/mypage/saved-educations`, { data: { userId, sn } });
    return { ok: isOk(r.status), status: r.status };
  } catch (e1) {
    // 2) /mypage/saved-educations
    try {
      const r2 = await api.delete(`/mypage/saved-educations`, { data: { userId, sn } });
      return { ok: isOk(r2.status), status: r2.status };
    } catch (e2) {
      // 3) /mypage/saved-education
      try {
        const r3 = await api.delete(`/mypage/saved-education`, { data: { userId, sn } });
        return { ok: isOk(r3.status), status: r3.status };
      } catch (e3) {
        // 4) 쿼리스트링 / 5) POST /delete 백업
        try {
          const r4 = await api.delete(`/api/mypage/saved-educations`, { params: { userId, sn } });
          return { ok: isOk(r4.status), status: r4.status };
        } catch (e4) {
          try {
            const r5 = await api.post(`/api/mypage/saved-educations/delete`, { userId, sn });
            return { ok: isOk(r5.status), status: r5.status };
          } catch (e5) {
            return {
              ok: false,
              status:
                e5?.response?.status ??
                e4?.response?.status ??
                e3?.response?.status ??
                e2?.response?.status ??
                e1?.response?.status ??
                -1,
              message: e5?.response?.data?.message ?? e5.message,
            };
          }
        }
      }
    }
  }
};
*/
