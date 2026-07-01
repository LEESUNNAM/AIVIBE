import { Comment } from '@/types';
import { mockComments } from '@/data/mockData';

/** 댓글 목록 조회 — Supabase DB 연동 시 supabase.from('comments').select() 로 교체 */
export async function getComments(postId: string): Promise<Comment[]> {
  return mockComments
    .filter((c) => c.postId === postId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/** 댓글 작성 — Supabase DB 연동 시 supabase.from('comments').insert() 로 교체 */
export async function createComment(postId: string, userId: string, content: string): Promise<Comment> {
  return {
    id: `c-${Date.now()}`,
    postId,
    userId,
    content,
    createdAt: new Date().toISOString(),
  };
}

/** 댓글 삭제 — Supabase DB 연동 시 supabase.from('comments').delete() 로 교체 */
export async function deleteComment(id: string): Promise<void> {
  // supabase.from('comments').delete().eq('id', id)
}
