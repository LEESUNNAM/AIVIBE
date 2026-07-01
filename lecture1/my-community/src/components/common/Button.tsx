'use client';

import React from 'react';

/**
 * Button 컴포넌트
 *
 * Props:
 * @param {string} label - 버튼 텍스트 [Required]
 * @param {'primary' | 'secondary' | 'danger' | 'ghost'} variant - 버튼 스타일 [Optional, 기본값: 'primary']
 * @param {'sm' | 'md' | 'lg'} size - 버튼 크기 [Optional, 기본값: 'md']
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 * @param {boolean} isFullWidth - 전체 너비 여부 [Optional, 기본값: false]
 * @param {function} onClick - 클릭 핸들러 [Optional]
 * @param {'button' | 'submit'} type - 버튼 타입 [Optional, 기본값: 'button']
 * @param {React.ReactNode} children - 내부 콘텐츠 (label 대신 사용 가능) [Optional]
 */

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--color-button-primary)',
    color: 'var(--color-white)',
  },
  secondary: {
    background: 'var(--color-sky-light)',
    color: 'var(--color-primary-dark)',
    border: '1px solid var(--color-border)',
  },
  danger: {
    background: 'transparent',
    color: 'var(--color-like)',
    border: '1px solid var(--color-like)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-border)',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: 'var(--font-caption)' },
  md: { padding: '10px 20px', fontSize: 'var(--font-body)' },
  lg: { padding: '14px 28px', fontSize: '18px' },
};

export default function Button({
  label,
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  isFullWidth = false,
  onClick,
  type = 'button',
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: '999px',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        width: isFullWidth ? '100%' : undefined,
        opacity: isDisabled || isLoading ? 0.6 : 1,
        cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease',
        border: variantStyles[variant].border ?? 'none',
      }}
      onMouseEnter={(e) => {
        if (isDisabled || isLoading) return;
        if (variant === 'primary') {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-button-hover)';
        }
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        if (isDisabled || isLoading) return;
        (e.currentTarget as HTMLButtonElement).style.background = variantStyles[variant].background as string;
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
      }}
    >
      {isLoading ? '처리 중...' : (children ?? label)}
    </button>
  );
}
