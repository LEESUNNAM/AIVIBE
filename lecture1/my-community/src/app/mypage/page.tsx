import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/services/authService';
import { getPostsByUser } from '@/services/postService';
import Header from '@/components/layout/Header';
import ProfileEditor from '@/components/profile/ProfileEditor';
import PostCard from '@/components/post/PostCard';
import EmptyState from '@/components/common/EmptyState';

export default async function MyPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const myPosts = await getPostsByUser(user.id);

  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px 120px',
        }}
      >
        {/* 페이지 제목 */}
        <h1
          style={{
            fontSize: 'var(--font-title)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '32px',
          }}
        >
          👤 마이페이지
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '32px',
            alignItems: 'start',
          }}
          className='mypage-grid'
        >
          <style>{`
            @media (max-width: 768px) {
              .mypage-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* 프로필 편집 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ProfileEditor user={user} />

            {/* 좋아요한 글 (확장 가능 영역) */}
            <div
              style={{
                background: 'var(--color-white)',
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
                padding: '24px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                ♥ 좋아요한 글
              </h3>
              <p style={{ fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
                Supabase 연동 후 좋아요 기록이 표시됩니다.
              </p>
            </div>
          </div>

          {/* 내 게시글 목록 */}
          <section>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h2 style={{ fontSize: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                내가 쓴 글 ({myPosts.length})
              </h2>
              <Link
                href='/write'
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  background: 'var(--color-button-primary)',
                  color: 'var(--color-white)',
                  fontSize: 'var(--font-caption)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                + 새 글쓰기
              </Link>
            </div>

            {myPosts.length === 0 ? (
              <EmptyState />
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                }}
                className='my-posts-grid'
              >
                <style>{`
                  @media (max-width: 600px) {
                    .my-posts-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>
                {myPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
