// src/utils/mypage.js
import api from "./api";

/** 자소서(이력서) 조회 */
export const getResume = (userId) =>
  api.get(`/resume/${userId}/read`).then((r) => r.data);

/** 저장한 공고 목록 */
export const getSavedRecruits = (userId) =>
  api.get(`/recruit/${userId}`).then((r) => r.data);

/** 저장한 공고 삭제
 *  1차: DELETE body { userId, sn }
 *  2차: DELETE ?userId=&sn=
 *  3차: POST /recruit/delete (일부 서버가 이렇게 받기도 함)
 *  실패 시 { ok:false, status } 반환
 */
export const deleteSavedRecruit = async (userId, sn) => {
  try {
    const r = await api.delete(`/recruit/delete`, { data: { userId, sn } });
    return { ok: r.status === 200 || r.status === 204 };
  } catch (e1) {
    const s1 = e1?.response?.status;

    // 쿼리스트링 방식 재시도
    try {
      const r2 = await api.delete(`/recruit/delete`, { params: { userId, sn } });
      return { ok: r2.status === 200 || r2.status === 204 };
    } catch (e2) {
      const s2 = e2?.response?.status;

      // POST로 처리하는 서버 대비
      try {
        const r3 = await api.post(`/recruit/delete`, { userId, sn });
        return { ok: r3.status === 200 || r3.status === 204 };
      } catch (e3) {
        return { ok: false, status: e3?.response?.status ?? s2 ?? s1 };
      }
    }
  }
};

/** 저장한 교육 목록 (404면 빈 배열로) */
export const getSavedEducation = async (userId) => {
  try {
    const r = await api.get(`/mypage/saved-education`, { params: { userId } });
    return r.data;
  } catch (e) {
    if (e?.response?.status === 404) return [];
    throw e;
  }
};

/** 저장한 교육 삭제 (403/404/405 대응) */
export const deleteSavedEducation = async (userId, sn) => {
  try {
    const r = await api.delete(`/mypage/saved-education`, { data: { userId, sn } });
    return { ok: r.status === 200 || r.status === 204 };
  } catch (e1) {
    try {
      const r2 = await api.delete(`/mypage/saved-education`, { params: { userId, sn } });
      return { ok: r2.status === 200 || r2.status === 204 };
    } catch (e2) {
      try {
        const r3 = await api.post(`/mypage/saved-education/delete`, { userId, sn });
        return { ok: r3.status === 200 || r3.status === 204 };
      } catch (e3) {
        return { ok: false, status: e3?.response?.status ?? e2?.response?.status ?? e1?.response?.status };
      }
    }
  }
};
