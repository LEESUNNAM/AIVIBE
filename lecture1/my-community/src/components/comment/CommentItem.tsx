'use client';

import React from 'react';
import { Comment } from '@/types';
import { mockUsers, currentUser } from '@/data/mockData';
import ProfileAvatar from '@/components/profile/ProfileAvatar';

/**
 * CommentItem 컴포넌트
 *
 * Props:
 * @param {Comment} comment - 댓글 데이터 [Required]
 * @param {function} onDelete - 삭제 핸들러 [Optional]
 */
interface CommentItemProps {
  comment: Comment;
  onDelete?: (id: string) => void;
}

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return '방금 전';
  if (min < 60) return `${min}분 전`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  return `${d}일 전`;
}

export default function CommentItem({ comment, onDelete }: CommentItemProps) {
  const author = mockUsers.find((u) => u.id === comment.userId);
  const isOwner = comment.userId === currentUser.id;

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px 0',
        borderBottom: '1px solid var(--color-border)',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <ProfileAvatar src={author?.profileImageUrl} nickname={author?.nickname ?? '?'} size={36} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div>
            <span style={{ fontSize: 'var(--font-caption)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {author?.nickname}
            </span>
            <span
              style={{
                marginLeft: '8px',
                fontSize: '11px',
                color: 'var(--color-text-muted)',
              }}
            >
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          {isOwner && onDelete && (
            <button
              onClick={() => onDelete(comment.id)}
              style={{
                fontSize: '11px',
                color: 'var(--color-like)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                flexShrink: 0,
              }}
            >
              삭제
            </button>
          )}
        </div>
        <p style={{ marginTop: '4px', fontSize: 'var(--font-body)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          {comment.content}
        </p>
      </div>
    </div>
  );
}
