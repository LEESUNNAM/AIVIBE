import { Post, PostPayload } from '@/types';
import { mockPosts } from '@/data/mockData';

/** 전체 게시글 조회 — Supabase DB 연동 시 supabase.from('posts').select() 로 교체 */
export async function getPosts(): Promise<Post[]> {
  return [...mockPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/** 단일 게시글 조회 */
export async function getPost(id: string): Promise<Post | null> {
  return mockPosts.find((p) => p.id === id) ?? null;
}

/** 사용자 게시글 조회 */
export async function getPostsByUser(userId: string): Promise<Post[]> {
  return mockPosts.filter((p) => p.userId === userId);
}

/** 게시글 작성 — Supabase DB 연동 시 supabase.from('posts').insert() 로 교체 */
export async function createPost(userId: string, payload: PostPayload): Promise<Post> {
  const newPost: Post = {
    id: `post-${Date.now()}`,
    userId,
    ...payload,
    likeCount: 0,
    commentCount: 0,
    createdAt: new Date().toISOString(),
  };
  return newPost;
}

/** 게시글 수정 — Supabase DB 연동 시 supabase.from('posts').update() 로 교체 */
export async function updatePost(id: string, payload: Partial<PostPayload>): Promise<Post> {
  const post = mockPosts.find((p) => p.id === id);
  if (!post) throw new Error('게시글을 찾을 수 없습니다.');
  return { ...post, ...payload, updatedAt: new Date().toISOString() };
}

/** 게시글 삭제 — Supabase DB 연동 시 supabase.from('posts').delete() 로 교체 */
export async function deletePost(id: string): Promise<void> {
  // supabase.from('posts').delete().eq('id', id)
}

/** 좋아요 토글 — Supabase DB 연동 시 likes 테이블 upsert 로 교체 */
export async function toggleLike(postId: string, userId: string): Promise<number> {
  const post = mockPosts.find((p) => p.id === postId);
  if (!post) throw new Error('게시글을 찾을 수 없습니다.');
  return post.likeCount + 1;
}
