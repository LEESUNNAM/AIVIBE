import React from 'react';
import { notFound } from 'next/navigation';
import { getPost } from '@/services/postService';
import { mockPosts } from '@/data/mockData';
import Header from '@/components/layout/Header';
import PostEditor from '@/components/post/PostEditor';

export function generateStaticParams() {
  return mockPosts.map((post) => ({ id: post.id }));
}

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

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
        <PostEditor initialPost={post} />
      </main>
    </>
  );
}
