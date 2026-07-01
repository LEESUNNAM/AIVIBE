'use client';

import React, { useState } from 'react';
import { User } from '@/types';
import ProfileAvatar from './ProfileAvatar';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

/**
 * ProfileEditor 컴포넌트
 *
 * Props:
 * @param {User} user - 현재 사용자 정보 [Required]
 * @param {function} onNicknameUpdate - 닉네임 업데이트 핸들러 [Optional]
 * @param {function} onAvatarUpdate - 아바타 업데이트 핸들러 [Optional]
 */
interface ProfileEditorProps {
  user: User;
  onNicknameUpdate?: (nickname: string) => Promise<void>;
  onAvatarUpdate?: (file: File) => Promise<void>;
}

export default function ProfileEditor({ user, onNicknameUpdate, onAvatarUpdate }: ProfileEditorProps) {
  const [nickname, setNickname] = useState(user.nickname);
  const [avatarSrc, setAvatarSrc] = useState(user.profileImageUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleNicknameSave = async () => {
    if (!nickname.trim()) return;
    setIsSaving(true);
    await onNicknameUpdate?.(nickname);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setAvatarSrc(preview);
    await onAvatarUpdate?.(file);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '32px',
        background: 'var(--color-white)',
        borderRadius: '24px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        maxWidth: '480px',
        width: '100%',
      }}
    >
      {/* 아바타 */}
      <div style={{ position: 'relative' }}>
        <ProfileAvatar src={avatarSrc} nickname={user.nickname} size={96} />
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'var(--color-button-primary)',
            color: 'var(--color-white)',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--color-white)',
            cursor: 'pointer',
          }}
          title='프로필 사진 변경'
        >
          ✏️
        </button>
        <input ref={fileRef} type='file' accept='image/*' onChange={handleAvatarChange} style={{ display: 'none' }} />
      </div>

      {/* 이메일 */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>이메일</p>
        <p style={{ fontSize: 'var(--font-body)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          {user.email}
        </p>
      </div>

      {/* 닉네임 변경 */}
      <div style={{ width: '100%' }}>
        <Input label='닉네임' value={nickname} onChange={setNickname} placeholder='새 닉네임 입력' />
      </div>
      <Button
        label={saved ? '저장됨 ✓' : '닉네임 저장'}
        onClick={handleNicknameSave}
        isLoading={isSaving}
        isFullWidth
        variant={saved ? 'secondary' : 'primary'}
      />
    </div>
  );
}
