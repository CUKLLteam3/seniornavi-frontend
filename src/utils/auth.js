// utils/auth.js
const SLEEP = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 더미 유저 DB
 * - email 기반으로 로그인/중복 체크
 * - phone은 선택(기존 데이터 호환용)
 */
let USERS = [
  { id: 1, name: "홍길동", email: "test@refly.com", phone: "01012345678", password: "1234" },
];

/** 이메일 정규화(소문자/trim) */
const normEmail = (v = "") => v.trim().toLowerCase();

/** 로그인: 이메일 + 비밀번호 */
export async function login({ email, password }) {
  await SLEEP(300);

  const key = normEmail(email);
  const u = USERS.find(
    (u) => normEmail(u.email) === key && u.password === password
  );

  if (!u) throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");

  // 호환을 위해 phone도 함께 반환(있으면)
  return {
    token: "fake-token-" + u.id,
    user: { id: u.id, name: u.name, email: u.email, phone: u.phone },
  };
}

/**
 * 회원가입: 이름/이메일/비밀번호 (phone은 선택)
 *  - 같은 이메일 존재 시 에러
 *  - 간단한 이메일 형식 검증 포함
 */
export async function signup({ name, email, password, phone }) {
  await SLEEP(300);

  const key = normEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(key)) {
    throw new Error("이메일 형식이 올바르지 않습니다.");
  }

  if (USERS.some((u) => normEmail(u.email) === key)) {
    throw new Error("이미 가입된 이메일입니다.");
  }

  const id = USERS.length + 1;
  USERS.push({ id, name, email: key, password, phone });

  return {
    token: "fake-token-" + id,
    user: { id, name, email: key, phone },
  };
}
