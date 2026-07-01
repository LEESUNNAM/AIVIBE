/**
 * Supabase 클라이언트 설정
 *
 * 연동 방법:
 * 1. npm install @supabase/supabase-js
 * 2. .env.local 파일에 아래 환경변수 설정:
 *    NEXT_PUBLIC_SUPABASE_URL=https://{project}.supabase.co
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY={anon-public-key}
 * 3. 아래 주석을 해제하고 사용
 */

// import { createClient } from '@supabase/supabase-js';
//
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
//
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabase = null; // Supabase 미연동 시 null — 서비스 파일에서 분기 처리
