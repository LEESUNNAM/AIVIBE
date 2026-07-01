import { redirect } from 'next/navigation';

/** 루트 → 홈으로 리다이렉트 (로그인 상태 가정) */
export default function RootPage() {
  redirect('/home');
}
