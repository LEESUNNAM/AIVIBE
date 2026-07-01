import React from 'react';
import Header from '@/components/layout/Header';
import PostEditor from '@/components/post/PostEditor';

export default function WritePage() {
  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px 120px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <PostEditor />
      </main>
    </>
  );
}
