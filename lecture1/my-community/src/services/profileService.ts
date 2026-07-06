import { User } from '@/types';
import { updateNickname as updateAuthNickname } from './authService';

/** 닉네임 변경 — localStorage 유저 정보 갱신 (Supabase 연동 시 supabase.auth.updateUser() 로 교체) */
export async function updateNickname(userId: string, nickname: string): Promise<User> {
  return updateAuthNickname(userId, nickname);
}

/** 프로필 사진 변경 — Supabase Storage 연동 시 supabase.storage.from('avatars').upload() 로 교체 */
export async function updateProfileImage(userId: string, file: File): Promise<string> {
  // const { data } = await supabase.storage.from('avatars').upload(`${userId}/avatar`, file)
  return URL.createObjectURL(file);
}

/** 사용자 정보 조회 — Supabase DB 연동 시 supabase.from('profiles').select() 로 교체 */
export async function getProfile(userId: string): Promise<User | null> {
  // supabase.from('profiles').select('*').eq('id', userId).single()
  return null;
}
