'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPost, deletePost } from '@/services/postService';
import { getComments } from '@/services/commentService';
import { getCurrentUser } from '@/services/authService';
import { Post, Comment, User } from '@/types';
import { mockUsers } from '@/data/mockData';
import Header from '@/components/layout/Header';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import CommentList from '@/components/comment/CommentList';
import LikeButton from '@/components/post/LikeButton';

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function getAllUsers(): User[] {
  if (typeof window === 'undefined') return mockUsers;
  try {
    const stored: (User & { password: string })[] = JSON.parse(
      localStorage.getItem('og_registered_users') || '[]',
    );
    return [...mockUsers, ...stored.map(({ password: _p, ...u }) => u)];
  } catch {
    return mockUsers;
  }
}

function PostPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([getPost(id), getComments(id), getCurrentUser()]).then(
      ([p, c, u]) => {
        if (!p) { router.replace('/home'); return; }
        setPost(p);
        setComments(c);
        setCurrentUser(u);
      },
    );
  }, [id, router]);

  const handleDelete = async () => {
    if (!post || !confirm('게시글을 삭제하시겠습니까?')) return;
    setIsDeleting(true);
    await deletePost(post.id);
    router.replace('/home');
  };

  if (!post) return null;

  const allUsers = getAllUsers();
  const author = allUsers.find((u) => u.id === post.userId);
  const isOwner = currentUser?.id === post.userId;

  return (
    <>
      <Header />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 120px' }}>
        <article
          style={{
            background: 'var(--color-white)',
            borderRadius: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {/* 작성자 정보 */}
          <div style={{ padding: '28px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ProfileAvatar src={author?.profileImageUrl} nickname={author?.nickname ?? '?'} size={44} />
              <div>
                <p style={{ fontSize: 'var(--font-body)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {author?.nickname ?? '익명'}
                </p>
                <p style={{ fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
                  {formatDate(post.createdAt)}{post.updatedAt && ' (수정됨)'}
                </p>
              </div>
            </div>
            {isOwner && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href={`/edit?id=${post.id}`}
                  style={{
                    padding: '6px 14px', borderRadius: '999px', fontSize: 'var(--font-caption)',
                    fontWeight: 600, border: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)', textDecoration: 'none', background: 'var(--color-white)',
                  }}
                >
                  수정
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  style={{
                    padding: '6px 14px', borderRadius: '999px', fontSize: 'var(--font-caption)',
                    fontWeight: 600, border: '1px solid var(--color-like)',
                    color: 'var(--color-like)', background: 'transparent', cursor: 'pointer',
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </div>

          {/* 제목 */}
          <div style={{ padding: '20px 32px' }}>
            <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>
              {post.title}
            </h1>
          </div>

          {/* 미디어 */}
          {post.media.length > 0 && (
            <div style={{ padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {post.media.map((media) => (
                <div key={media.id}>
                  {media.type === 'image' && (
                    <img src={media.url} alt={media.name}
                      style={{ width: '100%', borderRadius: '16px', maxHeight: '480px', objectFit: 'cover', border: '1px solid var(--color-border)' }} />
                  )}
                  {media.type === 'audio' && (
                    <div style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '32px' }}>🎵</span>
                      <p style={{ color: 'white', fontWeight: 600, fontSize: 'var(--font-caption)' }}>{media.name}</p>
                      <audio controls src={media.url} style={{ width: '100%' }} />
                    </div>
                  )}
                  {media.type === 'video' && (
                    <video controls src={media.url}
                      style={{ width: '100%', borderRadius: '16px', maxHeight: '480px', background: '#000', border: '1px solid var(--color-border)' }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 본문 */}
          <div style={{ padding: '24px 32px' }}>
            <p style={{ fontSize: 'var(--font-body)', color: 'var(--color-text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {post.content}
            </p>
          </div>

          {/* 좋아요 */}
          <div style={{ padding: '20px 32px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LikeButton postId={post.id} initialCount={post.likeCount} />
            <span style={{ fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
              💬 댓글 {comments.length}개
            </span>
          </div>
        </article>

        {/* 댓글 */}
        <div style={{ marginTop: '32px', background: 'var(--color-white)', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)', padding: '32px' }}>
          <CommentList postId={post.id} initialComments={comments} />
        </div>

        <div style={{ marginTop: '24px' }}>
          <Link href='/home' style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            ← 목록으로
          </Link>
        </div>
      </main>
    </>
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={null}>
      <PostPageContent />
    </Suspense>
  );
}
