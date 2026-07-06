'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPost } from '@/services/postService';
import { Post } from '@/types';
import Header from '@/components/layout/Header';
import PostEditor from '@/components/post/PostEditor';

function EditPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const [post, setPost] = useState<Post | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!id) { router.replace('/home'); return; }
    getPost(id).then((p) => {
      if (!p) { router.replace('/home'); return; }
      setPost(p);
      setLoaded(true);
    });
  }, [id, router]);

  if (!loaded) return null;

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 120px', display: 'flex', justifyContent: 'center' }}>
        <PostEditor initialPost={post ?? undefined} />
      </main>
    </>
  );
}

export default function EditPage() {
  return (
    <Suspense fallback={null}>
      <EditPageContent />
    </Suspense>
  );
}
