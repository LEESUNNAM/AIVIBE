import React from 'react';

/**
 * ProfileAvatar 컴포넌트
 *
 * Props:
 * @param {string} src - 이미지 URL [Optional]
 * @param {string} nickname - 닉네임 (이미지 없을 때 이니셜 표시) [Required]
 * @param {number} size - 아바타 크기(px) [Optional, 기본값: 36]
 */
interface ProfileAvatarProps {
  src?: string;
  nickname: string;
  size?: number;
}

export default function ProfileAvatar({ src, nickname, size = 36 }: ProfileAvatarProps) {
  const initial = nickname.charAt(0).toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={nickname}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid var(--color-border)',
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      aria-label={nickname}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-white)',
        fontWeight: 700,
        fontSize: size * 0.4,
        flexShrink: 0,
        border: '2px solid var(--color-border)',
      }}
    >
      {initial}
    </div>
  );
}
