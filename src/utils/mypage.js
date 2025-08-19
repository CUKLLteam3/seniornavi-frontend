import api from "./api";

// 내부 공통
const isOk = (s) => s === 200 || s === 204;
const toArr = (v) =>
  Array.isArray(v) ? v
  : Array.isArray(v?.data) ? v.data
  : Array.isArray(v?.items) ? v.items
  : Array.isArray(v?.data?.items) ? v.data.items
  : [];

/** 자소서(이력서) 조회
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

/** 저장한 공고 목록
 * GET /recruit/{userId}
 * 404면 []
 */
export const getSavedRecruits = async (userId) => {
  try {
    const r = await api.get(`/recruit/${userId}`);
    return toArr(r.data);
  } catch (e) {
    if (e?.response?.status === 404) return [];
    throw e;
  }
};

/** 저장한 공고 삭제
 * DELETE /recruit/delete  body: { userId, sn }
 */
export const deleteSavedRecruit = async (userId, sn) => {
  try {
    const r = await api.delete(`/recruit/delete`, { data: { userId, sn } });
    return { ok: isOk(r.status), status: r.status };
  } catch (e) {
    return {
      ok: false,
      status: e?.response?.status ?? -1,
      message: e?.response?.data?.message ?? e.message,
    };
  }
};

/** 저장한 교육 목록(신규 스펙 우선)
 * 1차: GET /api/mypage/saved-educations?userId=&expand=summary
 * 2차: GET /mypage/saved-education?userId=   (구 스펙 폴백)
 * 404면 []
 */
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

/** 저장한 교육 삭제(신규 → 구스펙 순서로 재시도) */
export const deleteSavedEducation = async (userId, sn) => {
  // 1) /api/mypage/saved-educations
  try {
    const r = await api.delete(`/api/mypage/saved-educations`, { data: { userId, sn } });
    return { ok: isOk(r.status), status: r.status };
  } catch (e1) {
    // 2) /mypage/saved-educations (혹시 복수형만 열려있는 경우)
    try {
      const r2 = await api.delete(`/mypage/saved-educations`, { data: { userId, sn } });
      return { ok: isOk(r2.status), status: r2.status };
    } catch (e2) {
      // 3) /mypage/saved-education (구 스펙)
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
