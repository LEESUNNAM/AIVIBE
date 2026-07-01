'use client';

import React from 'react';

/**
 * Input 컴포넌트
 *
 * Props:
 * @param {string} label - 입력 필드 레이블 [Optional]
 * @param {string} placeholder - 플레이스홀더 [Optional]
 * @param {string} value - 입력값 [Required]
 * @param {function} onChange - 변경 핸들러 [Required]
 * @param {'text' | 'email' | 'password' | 'search'} type - 입력 타입 [Optional, 기본값: 'text']
 * @param {string} error - 에러 메시지 [Optional]
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 */
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'search';
  error?: string;
  isDisabled?: boolean;
  autoComplete?: string;
}

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  isDisabled = false,
  autoComplete,
}: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          style={{
            fontSize: 'var(--font-caption)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: `1.5px solid ${error ? 'var(--color-like)' : isFocused ? 'var(--color-primary)' : 'var(--color-border)'}`,
          background: isDisabled ? 'var(--color-bg-primary)' : 'var(--color-white)',
          fontSize: 'var(--font-body)',
          color: 'var(--color-text-primary)',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
      />
      {error && (
        <span style={{ fontSize: 'var(--font-caption)', color: 'var(--color-like)' }}>
          {error}
        </span>
      )}
    </div>
  );
}
