'use client';

import React from 'react';

/**
 * Textarea 컴포넌트
 *
 * Props:
 * @param {string} label - 레이블 [Optional]
 * @param {string} placeholder - 플레이스홀더 [Optional]
 * @param {string} value - 입력값 [Required]
 * @param {function} onChange - 변경 핸들러 [Required]
 * @param {number} rows - 행 수 [Optional, 기본값: 5]
 * @param {string} error - 에러 메시지 [Optional]
 */
interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  error?: string;
}

export default function Textarea({ label, placeholder, value, onChange, rows = 5, error }: TextareaProps) {
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
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: `1.5px solid ${error ? 'var(--color-like)' : isFocused ? 'var(--color-primary)' : 'var(--color-border)'}`,
          background: 'var(--color-white)',
          fontSize: 'var(--font-body)',
          color: 'var(--color-text-primary)',
          outline: 'none',
          resize: 'vertical',
          lineHeight: 1.7,
          transition: 'border-color 0.2s ease',
          fontFamily: 'inherit',
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
