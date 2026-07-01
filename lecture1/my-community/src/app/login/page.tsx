'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await login({ email, password });
      router.push('/home');
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, var(--color-sky-light) 0%, var(--color-white) 60%)',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--color-white)',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: 'var(--shadow-dialog)',
          animation: 'fadeIn 0.4s ease forwards',
        }}
      >
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ fontSize: '40px', marginBottom: '8px' }}>🌊</p>
          <h1 style={{ fontSize: 'var(--font-title)', fontWeight: 700, color: 'var(--color-primary)' }}>
            Ocean Gallery
          </h1>
          <p style={{ marginTop: '8px', fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
            바다 같은 감성을 함께 나눠보세요
          </p>
        </div>

        {/* 폼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label='이메일'
            type='email'
            value={email}
            onChange={setEmail}
            placeholder='email@example.com'
            autoComplete='email'
          />
          <Input
            label='비밀번호'
            type='password'
            value={password}
            onChange={setPassword}
            placeholder='비밀번호 입력'
            autoComplete='current-password'
          />

          {error && (
            <p
              style={{
                fontSize: 'var(--font-caption)',
                color: 'var(--color-like)',
                background: '#FFF0F0',
                borderRadius: '8px',
                padding: '10px 14px',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}

          <div style={{ marginTop: '8px' }}>
            <Button
              label='로그인'
              onClick={handleLogin}
              isLoading={isLoading}
              isFullWidth
              size='lg'
            />
          </div>
        </div>

        {/* 회원가입 링크 */}
        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
          아직 계정이 없으신가요?{' '}
          <Link href='/signup' style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
