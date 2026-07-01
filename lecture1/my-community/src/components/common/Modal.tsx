'use client';

import React from 'react';

/**
 * Modal 컴포넌트
 *
 * Props:
 * @param {boolean} isOpen - 모달 열림 상태 [Required]
 * @param {function} onClose - 닫기 핸들러 [Required]
 * @param {string} title - 모달 제목 [Optional]
 * @param {React.ReactNode} children - 모달 내용 [Required]
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26, 43, 53, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-white)',
          borderRadius: '20px',
          padding: '28px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: 'var(--shadow-dialog)',
          animation: 'fadeIn 0.25s ease forwards',
        }}
      >
        {title && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ fontSize: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{
                fontSize: '20px',
                color: 'var(--color-text-muted)',
                lineHeight: 1,
                cursor: 'pointer',
                background: 'none',
                border: 'none',
              }}
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
