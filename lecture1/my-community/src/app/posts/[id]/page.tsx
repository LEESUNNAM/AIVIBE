import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost } from '@/services/postService';
import { getComments } from '@/services/commentService';
import { mockUsers, currentUser } from '@/data/mockData';
import Header from '@/components/layout/Header';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import CommentList from '@/components/comment/CommentList';
import LikeButton from '@/components/post/LikeButton';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const [post, comments] = await Promise.all([getPost(id), getComments(id)]);

  if (!post) notFound();

  const author = mockUsers.find((u) => u.id === post.userId);
  const isOwner = post.userId === currentUser.id;

  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px 24px 120px',
        }}
      >
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
          <div
            style={{
              padding: '28px 32px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ProfileAvatar src={author?.profileImageUrl} nickname={author?.nickname ?? '?'} size={44} />
              <div>
                <p style={{ fontSize: 'var(--font-body)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {author?.nickname}
                </p>
                <p style={{ fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
                  {formatDate(post.createdAt)}
                  {post.updatedAt && ' (수정됨)'}
                </p>
              </div>
            </div>
            {isOwner && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href={`/edit/${post.id}`}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: 'var(--font-caption)',
                    fontWeight: 600,
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    background: 'var(--color-white)',
                  }}
                >
                  수정
                </Link>
                <button
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: 'var(--font-caption)',
                    fontWeight: 600,
                    border: '1px solid var(--color-like)',
                    color: 'var(--color-like)',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </div>

          {/* 제목 */}
          <div style={{ padding: '20px 32px' }}>
            <h1
              style={{
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                lineHeight: 1.4,
              }}
            >
              {post.title}
            </h1>
          </div>

          {/* 미디어 */}
          {post.media.length > 0 && (
            <div style={{ padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {post.media.map((media) => (
                <div key={media.id}>
                  {media.type === 'image' && (
                    <img
                      src={media.url}
                      alt={media.name}
                      style={{
                        width: '100%',
                        borderRadius: '16px',
                        maxHeight: '480px',
                        objectFit: 'cover',
                        border: '1px solid var(--color-border)',
                      }}
                    />
                  )}
                  {media.type === 'audio' && (
                    <div
                      style={{
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        borderRadius: '16px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '32px' }}>🎵</span>
                      <p style={{ color: 'white', fontWeight: 600, fontSize: 'var(--font-caption)' }}>{media.name}</p>
                      <audio controls src={media.url} style={{ width: '100%' }} />
                    </div>
                  )}
                  {media.type === 'video' && (
                    <video
                      controls
                      src={media.url}
                      style={{
                        width: '100%',
                        borderRadius: '16px',
                        maxHeight: '480px',
                        background: '#000',
                        border: '1px solid var(--color-border)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 본문 */}
          <div style={{ padding: '24px 32px' }}>
            <p
              style={{
                fontSize: 'var(--font-body)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}
            >
              {post.content}
            </p>
          </div>

          {/* 좋아요 */}
          <div
            style={{
              padding: '20px 32px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <LikeButton postId={post.id} initialCount={post.likeCount} />
            <span style={{ fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
              💬 댓글 {comments.length}개
            </span>
          </div>
        </article>

        {/* 댓글 */}
        <div
          style={{
            marginTop: '32px',
            background: 'var(--color-white)',
            borderRadius: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
            padding: '32px',
          }}
        >
          <CommentList postId={post.id} initialComments={comments} />
        </div>

        <div style={{ marginTop: '24px' }}>
          <Link
            href='/home'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--font-caption)',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
            }}
          >
            ← 목록으로
          </Link>
        </div>
      </main>
    </>
  );
}
