const SLEEP = (ms) => new Promise(r => setTimeout(r, ms));

let USERS = [
  { id: 1, name: "홍길동", phone: "01012345678", password: "1234" },
];

export async function login({ phone, password }) {
  await SLEEP(300);
  const u = USERS.find(u => u.phone === phone && u.password === password);
  if (!u) throw new Error("전화번호 또는 비밀번호가 올바르지 않습니다.");
  return { token: "fake-token-" + u.id, user: { id: u.id, name: u.name, phone: u.phone } };
}

export async function signup({ name, phone, password }) {
  await SLEEP(300);
  if (USERS.some(u => u.phone === phone)) {
    throw new Error("이미 가입된 번호입니다.");
  }
  const id = USERS.length + 1;
  USERS.push({ id, name, phone, password });
  return { token: "fake-token-" + id, user: { id, name, phone } };
}
