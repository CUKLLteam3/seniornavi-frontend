// src/utils/auth.js
// 임시유저(로그인만 로컬) 모드: userId=1로 고정

const SLEEP = (ms) => new Promise((r) => setTimeout(r, ms));

// 시드 유저(참고용). 어떤 값으로 로그인해도 최종 세션은 id=1로 고정됨.
const SEED_USER = { id: 1, name: "홍길동", email: "test@refly.com", phone: "", password: "123456" };

// localStorage 키
const LS_AUTH = "auth";   // { token }
const LS_TOKEN = "token"; // "fake-token-1"
const LS_USER = "user";   // { id: 1, name, email, phone }

const TEMP_ID = 1;

// 공용 유틸
const normEmail = (v = "") => v.trim().toLowerCase();
function saveSession({ token, user }) {
  localStorage.setItem(LS_AUTH, JSON.stringify({ token }));
  localStorage.setItem(LS_TOKEN, token);
  localStorage.setItem(LS_USER, JSON.stringify(user));
}
export function loadSession() {
  try {
    const token =
      JSON.parse(localStorage.getItem(LS_AUTH) || "null")?.token ||
      localStorage.getItem(LS_TOKEN) || "";
    const user = JSON.parse(localStorage.getItem(LS_USER) || "null") || null;
    if (!token || !user) return null;
    return { token, user };
  } catch {
    return null;
  }
}
export function logout() {
  localStorage.removeItem(LS_AUTH);
  localStorage.removeItem(LS_TOKEN);
  localStorage.removeItem(LS_USER);
}

/** 로그인: 어떤 계정이든 최종 세션은 id=1로 고정 */
export async function login({ email, password }) {
  await SLEEP(200);

  // 간단한 형식/비번 체크(데모용) — 실패 시 에러
  const key = normEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(key)) {
    throw new Error("이메일 형식이 올바르지 않습니다.");
  }
  if (!password || password.length < 3) {
    throw new Error("비밀번호는 3자 이상이어야 합니다.");
  }

  // 최종 세션은 무조건 userId=1
  const session = {
    token: `fake-token-${TEMP_ID}`,
    user: {
      id: TEMP_ID,
      name: SEED_USER.name,
      email: key || SEED_USER.email, // 입력 이메일을 그대로 저장(표시용)
      phone: SEED_USER.phone,
    },
  };
  saveSession(session);
  return session;
}

/** 회원가입: 성공 후에도 세션은 id=1로 고정 */
export async function signup({ name, email, password, phone }) {
  await SLEEP(250);
  const key = normEmail(email);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(key)) {
    throw new Error("이메일 형식이 올바르지 않습니다.");
  }
  if (!password || password.length < 3) {
    throw new Error("비밀번호는 3자 이상이어야 합니다.");
  }

  const session = {
    token: `fake-token-${TEMP_ID}`,
    user: {
      id: TEMP_ID,
      name: name || SEED_USER.name,
      email: key,
      phone: phone || "",
    },
  };
  saveSession(session);
  return session;
}
