'use client';

import React, { useState } from 'react';
import { toggleLike } from '@/services/postService';
import { currentUser } from '@/data/mockData';

/**
 * LikeButton 컴포넌트
 *
 * Props:
 * @param {string} postId - 게시글 ID [Required]
 * @param {number} initialCount - 초기 좋아요 수 [Required]
 */
interface LikeButtonProps {
  postId: string;
  initialCount: number;
}

export default function LikeButton({ postId, initialCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    setIsAnimating(true);
    const newCount = await toggleLike(postId, currentUser.id);
    setLiked((prev) => !prev);
    setCount(liked ? newCount - 2 : newCount);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleLike}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 18px',
        borderRadius: '999px',
        border: `1.5px solid ${liked ? 'var(--color-like)' : 'var(--color-border)'}`,
        background: liked ? '#FFF0F0' : 'transparent',
        color: liked ? 'var(--color-like)' : 'var(--color-text-muted)',
        fontSize: 'var(--font-caption)',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <span
        style={{
          fontSize: '18px',
          display: 'inline-block',
          transform: isAnimating ? 'scale(1.35)' : 'scale(1)',
          transition: 'transform 0.25s ease',
        }}
      >
        {liked ? '♥' : '♡'}
      </span>
      <span>{count}</span>
    </button>
  );
}
