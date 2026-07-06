import { User, SignUpPayload, LoginPayload } from '@/types';
import { mockUsers } from '@/data/mockData';

const STORAGE_USERS_KEY = 'og_registered_users';
const STORAGE_SESSION_KEY = 'og_session';

interface StoredUser extends User {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

function saveSession(user: User): void {
  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
}

/** 회원가입 — localStorage에 유저 저장 (Supabase 연동 시 supabase.auth.signUp() 로 교체) */
export async function signUp(payload: SignUpPayload): Promise<User> {
  const storedUsers = getStoredUsers();
  const allEmails = [
    ...mockUsers.map((u) => u.email),
    ...storedUsers.map((u) => u.email),
  ];
  if (allEmails.includes(payload.email)) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: payload.email,
    nickname: payload.nickname,
    createdAt: new Date().toISOString(),
  };
  saveStoredUsers([...storedUsers, { ...newUser, password: payload.password }]);
  saveSession(newUser);
  return newUser;
}

/** 로그인 — mockUsers(데모) 또는 localStorage 가입 유저 확인 (Supabase 연동 시 supabase.auth.signInWithPassword() 로 교체) */
export async function login(payload: LoginPayload): Promise<User> {
  // 1. 데모 계정(mockUsers) — 비밀번호 무관하게 이메일만 확인
  const mockFound = mockUsers.find((u) => u.email === payload.email);
  if (mockFound) {
    saveSession(mockFound);
    return mockFound;
  }
  // 2. 회원가입 유저 — 이메일 + 비밀번호 일치 확인
  const storedUsers = getStoredUsers();
  const found = storedUsers.find(
    (u) => u.email === payload.email && u.password === payload.password,
  );
  if (!found) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  const { password: _pw, ...user } = found;
  saveSession(user);
  return user;
}

/** 로그아웃 — 세션 제거 (Supabase 연동 시 supabase.auth.signOut() 로 교체) */
export async function logout(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }
}

/** 현재 로그인 사용자 조회 — localStorage 세션 확인 (Supabase 연동 시 supabase.auth.getUser() 로 교체) */
export async function getCurrentUser(): Promise<User | null> {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}
