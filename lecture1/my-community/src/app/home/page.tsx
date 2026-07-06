'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts } from '@/services/postService';
import { Post } from '@/types';
import Header from '@/components/layout/Header';
import PostGrid from '@/components/post/PostGrid';

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'image', label: '🖼️ 이미지' },
  { key: 'audio', label: '🎵 음원' },
  { key: 'video', label: '🎬 동영상' },
  { key: 'text', label: '📝 텍스트' },
] as const;

type FilterKey = (typeof FILTERS)[number]['key'];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'text') return post.media.length === 0;
    return post.media.some((media) => media.type === activeFilter);
  });

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
        {/* 히어로 */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            borderRadius: '24px',
            padding: '48px 40px',
            marginBottom: '40px',
            color: 'var(--color-white)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }}
          />
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>🌊</p>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 700, marginBottom: '8px' }}>
            Ocean Gallery Community
          </h1>
          <p style={{ fontSize: 'var(--font-body)', opacity: 0.85, maxWidth: '480px' }}>
            맑고 투명한 바다처럼, 당신의 이야기를 이곳에 담아보세요.
          </p>
          <Link
            href='/write'
            style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '10px 24px',
              background: 'var(--color-accent)',
              color: 'var(--color-white)',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: 'var(--font-body)',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
          >
            ✍️ 이야기 쓰기
          </Link>
        </section>

        {/* 필터 탭 */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}
        >
          {FILTERS.map((filter) => {
            const isActive = filter.key === activeFilter;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: isActive ? 'var(--color-primary)' : 'var(--color-white)',
                  color: isActive ? 'var(--color-white)' : 'var(--color-text-secondary)',
                  fontSize: 'var(--font-caption)',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* 게시글 그리드 */}
        <PostGrid posts={filteredPosts} />
      </main>

      {/* 플로팅 글쓰기 버튼 (모바일) */}
      <Link
        href='/write'
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-button-primary)',
          color: 'var(--color-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 8px 24px rgba(172, 106, 42, 0.4)',
          zIndex: 50,
          textDecoration: 'none',
        }}
        title='새 글쓰기'
      >
        ✏️
      </Link>
    </>
  );
}
