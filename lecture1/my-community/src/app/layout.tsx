import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ocean Gallery Community',
  description: '감성적인 갤러리형 커뮤니티 — 사진, 음악, 영상을 나누세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
