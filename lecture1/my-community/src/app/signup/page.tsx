'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/services/authService';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!email) next.email = '이메일을 입력해주세요.';
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = '올바른 이메일 형식이 아닙니다.';
    if (!nickname) next.nickname = '닉네임을 입력해주세요.';
    if (!password) next.password = '비밀번호를 입력해주세요.';
    else if (password.length < 6) next.password = '비밀번호는 6자 이상이어야 합니다.';
    if (password !== passwordConfirm) next.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    return next;
  };

  const handleSignup = async () => {
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await signUp({ email, password, nickname });
      router.push('/home');
    } catch {
      setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' });
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
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '40px', marginBottom: '8px' }}>🌊</p>
          <h1 style={{ fontSize: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--color-primary)' }}>
            Ocean Gallery 가입
          </h1>
          <p style={{ marginTop: '8px', fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
            계정을 만들고 갤러리에 합류하세요
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input
            label='이메일'
            type='email'
            value={email}
            onChange={setEmail}
            placeholder='email@example.com'
            error={errors.email}
            autoComplete='email'
          />
          <Input
            label='닉네임'
            value={nickname}
            onChange={setNickname}
            placeholder='커뮤니티에서 사용할 이름'
            error={errors.nickname}
          />
          <Input
            label='비밀번호'
            type='password'
            value={password}
            onChange={setPassword}
            placeholder='6자 이상'
            error={errors.password}
            autoComplete='new-password'
          />
          <Input
            label='비밀번호 확인'
            type='password'
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            placeholder='비밀번호 재입력'
            error={errors.passwordConfirm}
            autoComplete='new-password'
          />

          {errors.general && (
            <p style={{ fontSize: 'var(--font-caption)', color: 'var(--color-like)', textAlign: 'center' }}>
              {errors.general}
            </p>
          )}

          <div style={{ marginTop: '8px' }}>
            <Button label='회원가입' onClick={handleSignup} isLoading={isLoading} isFullWidth size='lg' />
          </div>
        </div>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
          이미 계정이 있으신가요?{' '}
          <Link href='/login' style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
