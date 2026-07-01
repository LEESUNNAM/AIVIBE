import { User, SignUpPayload, LoginPayload } from '@/types';
import { mockUsers, currentUser } from '@/data/mockData';

/** 회원가입 — Supabase Auth 연동 시 supabase.auth.signUp() 로 교체 */
export async function signUp(payload: SignUpPayload): Promise<User> {
  // supabase.auth.signUp({ email, password, options: { data: { nickname } } })
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: payload.email,
    nickname: payload.nickname,
    createdAt: new Date().toISOString(),
  };
  return newUser;
}

/** 로그인 — Supabase Auth 연동 시 supabase.auth.signInWithPassword() 로 교체 */
export async function login(payload: LoginPayload): Promise<User> {
  // supabase.auth.signInWithPassword({ email, password })
  const found = mockUsers.find((u) => u.email === payload.email);
  if (!found) throw new Error('사용자를 찾을 수 없습니다.');
  return found;
}

/** 로그아웃 — Supabase Auth 연동 시 supabase.auth.signOut() 로 교체 */
export async function logout(): Promise<void> {
  // supabase.auth.signOut()
}

/** 현재 로그인 사용자 조회 — Supabase Auth 연동 시 supabase.auth.getUser() 로 교체 */
export async function getCurrentUser(): Promise<User | null> {
  // const { data } = await supabase.auth.getUser()
  return currentUser;
}
