import { Post, PostPayload } from '@/types';
import { mockPosts } from '@/data/mockData';

const STORAGE_POSTS_KEY = 'og_posts';
const STORAGE_DELETED_KEY = 'og_deleted_posts';

function getStoredPosts(): Post[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_POSTS_KEY) || '[]');
  } catch {
    return [];
  }
}

function getDeletedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_DELETED_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveStoredPosts(posts: Post[]): void {
  localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
}

function getAllPosts(): Post[] {
  const deletedIds = getDeletedIds();
  const storedPosts = getStoredPosts();
  const storedIds = new Set(storedPosts.map((p) => p.id));
  const basePosts = mockPosts.filter((p) => !deletedIds.includes(p.id) && !storedIds.has(p.id));
  return [...basePosts, ...storedPosts.filter((p) => !deletedIds.includes(p.id))];
}

/** 전체 게시글 조회 — Supabase DB 연동 시 supabase.from('posts').select() 로 교체 */
export async function getPosts(): Promise<Post[]> {
  return getAllPosts().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** 단일 게시글 조회 */
export async function getPost(id: string): Promise<Post | null> {
  const deletedIds = getDeletedIds();
  if (deletedIds.includes(id)) return null;
  const stored = getStoredPosts().find((p) => p.id === id);
  if (stored) return stored;
  return mockPosts.find((p) => p.id === id) ?? null;
}

/** 사용자 게시글 조회 */
export async function getPostsByUser(userId: string): Promise<Post[]> {
  return getAllPosts().filter((p) => p.userId === userId);
}

/** 게시글 작성 — localStorage에 저장 (Supabase DB 연동 시 supabase.from('posts').insert() 로 교체) */
export async function createPost(userId: string, payload: PostPayload): Promise<Post> {
  const newPost: Post = {
    id: `post-${Date.now()}`,
    userId,
    ...payload,
    likeCount: 0,
    commentCount: 0,
    createdAt: new Date().toISOString(),
  };
  saveStoredPosts([...getStoredPosts(), newPost]);
  return newPost;
}

/** 게시글 수정 — localStorage에 반영 (Supabase DB 연동 시 supabase.from('posts').update() 로 교체) */
export async function updatePost(id: string, payload: Partial<PostPayload>): Promise<Post> {
  const post = await getPost(id);
  if (!post) throw new Error('게시글을 찾을 수 없습니다.');
  const updated = { ...post, ...payload, updatedAt: new Date().toISOString() };
  const storedPosts = getStoredPosts();
  const idx = storedPosts.findIndex((p) => p.id === id);
  if (idx >= 0) {
    storedPosts[idx] = updated;
  } else {
    storedPosts.push(updated);
  }
  saveStoredPosts(storedPosts);
  return updated;
}

/** 게시글 삭제 — localStorage에서 제거 (Supabase DB 연동 시 supabase.from('posts').delete() 로 교체) */
export async function deletePost(id: string): Promise<void> {
  saveStoredPosts(getStoredPosts().filter((p) => p.id !== id));
  const deletedIds = getDeletedIds();
  if (!deletedIds.includes(id)) {
    localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify([...deletedIds, id]));
  }
}

/** 좋아요 토글 — Supabase DB 연동 시 likes 테이블 upsert 로 교체 */
export async function toggleLike(postId: string, userId: string): Promise<number> {
  const post = await getPost(postId);
  if (!post) throw new Error('게시글을 찾을 수 없습니다.');
  return post.likeCount + 1;
}
