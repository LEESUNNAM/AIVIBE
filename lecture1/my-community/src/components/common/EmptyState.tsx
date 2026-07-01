import React from 'react';
import Link from 'next/link';

/**
 * EmptyState 컴포넌트
 *
 * Props:
 * @param {string} message - 메인 메시지 [Optional]
 * @param {string} subMessage - 서브 메시지 [Optional]
 * @param {boolean} hasWriteLink - 글쓰기 링크 표시 여부 [Optional, 기본값: true]
 */
interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  hasWriteLink?: boolean;
}

export default function EmptyState({
  message = '아직 작성된 글이 없습니다.',
  subMessage = '첫 번째 이야기를 남겨보세요.',
  hasWriteLink = true,
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        gap: '12px',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '48px' }}>🌊</span>
      <p style={{ fontSize: 'var(--font-subtitle)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
        {message}
      </p>
      <p style={{ fontSize: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
        {subMessage}
      </p>
      {hasWriteLink && (
        <Link
          href='/write'
          style={{
            marginTop: '12px',
            padding: '10px 24px',
            background: 'var(--color-button-primary)',
            color: 'var(--color-white)',
            borderRadius: '999px',
            fontWeight: 600,
            fontSize: 'var(--font-body)',
            transition: 'background 0.2s ease',
          }}
        >
          글쓰기
        </Link>
      )}
    </div>
  );
}
