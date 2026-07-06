'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import { getCurrentUser, logout } from '@/services/authService';
import { User } from '@/types';

const NAV_LINKS = [
  { href: '/home', label: '홈' },
  { href: '/write', label: '글쓰기' },
  { href: '/mypage', label: '마이페이지' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.86)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* 로고 */}
        <Link
          href='/home'
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--color-primary)',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          🌊 Ocean Gallery
        </Link>

        {/* 중앙 내비게이션 */}
        <nav
          style={{
            display: 'flex',
            gap: '4px',
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: 'var(--font-body)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-white)' : 'var(--color-text-secondary)',
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 우측 프로필 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <>
              <Link href='/mypage' style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <ProfileAvatar src={user.profileImageUrl} nickname={user.nickname} size={34} />
                <span
                  style={{
                    fontSize: 'var(--font-caption)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {user.nickname}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: 'var(--font-caption)',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href='/login'
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: 'var(--font-caption)',
                fontWeight: 600,
                color: 'var(--color-white)',
                background: 'var(--color-button-primary)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
