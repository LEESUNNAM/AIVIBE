'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { mockUsers } from '@/data/mockData';
import ProfileAvatar from '@/components/profile/ProfileAvatar';

/**
 * PostCard 컴포넌트
 *
 * Props:
 * @param {Post} post - 게시글 데이터 [Required]
 */
interface PostCardProps {
  post: Post;
}

const MEDIA_ICON: Record<string, string> = {
  image: '🖼️',
  audio: '🎵',
  video: '🎬',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function PostCard({ post }: PostCardProps) {
  const author = mockUsers.find((u) => u.id === post.userId);
  const [isHovered, setIsHovered] = useState(false);
  const thumbnail = post.media.find((m) => m.type === 'image');
  const mediaTypes = [...new Set(post.media.map((m) => m.type))];

  return (
    <Link
      href={`/posts/${post.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        style={{
          background: 'var(--color-white)',
          borderRadius: '24px',
          border: '1px solid var(--color-border)',
          boxShadow: isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
          overflow: 'hidden',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 썸네일 */}
        <div
          style={{
            height: '200px',
            background: thumbnail
              ? 'none'
              : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {thumbnail ? (
            <img
              src={thumbnail.url}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
              }}
            >
              {post.media[0]?.type === 'audio' ? '🎵' : post.media[0]?.type === 'video' ? '🎬' : '🌊'}
            </div>
          )}
          {/* 미디어 타입 뱃지 */}
          {mediaTypes.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                display: 'flex',
                gap: '4px',
              }}
            >
              {mediaTypes.map((type) => (
                <span
                  key={type}
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '999px',
                    padding: '2px 8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--color-primary-dark)',
                  }}
                >
                  {MEDIA_ICON[type]}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 카드 본문 */}
        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3
            style={{
              fontSize: '17px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {post.title}
          </h3>
          <p
            style={{
              fontSize: 'var(--font-caption)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              flex: 1,
            }}
          >
            {post.content}
          </p>

          {/* 하단 메타 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '12px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ProfileAvatar src={author?.profileImageUrl} nickname={author?.nickname ?? '?'} size={26} />
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  {author?.nickname}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{formatDate(post.createdAt)}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-like)', fontWeight: 600 }}>
                ♥ {post.likeCount}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                💬 {post.commentCount}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
