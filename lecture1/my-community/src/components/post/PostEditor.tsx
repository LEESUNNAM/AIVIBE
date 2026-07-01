'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MediaFile, Post } from '@/types';
import { createPost, updatePost } from '@/services/postService';
import { currentUser } from '@/data/mockData';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';
import MediaUploader from './MediaUploader';
import MediaPreview from './MediaPreview';

/**
 * PostEditor 컴포넌트 (글쓰기 / 글수정 공용)
 *
 * Props:
 * @param {Post} initialPost - 수정 시 기존 게시글 데이터 [Optional]
 */
interface PostEditorProps {
  initialPost?: Post;
}

export default function PostEditor({ initialPost }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title ?? '');
  const [content, setContent] = useState(initialPost?.content ?? '');
  const [mediaList, setMediaList] = useState<MediaFile[]>(initialPost?.media ?? []);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpload = (media: MediaFile) => setMediaList((prev) => [...prev, media]);
  const handleRemove = (id: string) => setMediaList((prev) => prev.filter((m) => m.id !== id));

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsSaving(true);
    if (initialPost) {
      await updatePost(initialPost.id, { title, content, media: mediaList });
    } else {
      await createPost(currentUser.id, { title, content, media: mediaList });
    }
    setIsSaving(false);
    router.push('/home');
  };

  return (
    <div
      style={{
        background: 'var(--color-white)',
        borderRadius: '24px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: 'var(--font-subtitle)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
        }}
      >
        {initialPost ? '✏️ 글 수정' : '✍️ 새 글쓰기'}
      </h2>

      <Input label='제목' value={title} onChange={setTitle} placeholder='제목을 입력하세요' />

      <Textarea
        label='내용'
        value={content}
        onChange={setContent}
        placeholder='오늘의 이야기를 들려주세요...'
        rows={8}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p
          style={{
            fontSize: 'var(--font-caption)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
          }}
        >
          미디어 첨부
        </p>
        <MediaUploader onUpload={handleUpload} />
        <MediaPreview mediaList={mediaList} onRemove={handleRemove} />
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <Button label='취소' variant='ghost' onClick={() => router.back()} />
        <Button
          label={initialPost ? '수정 완료' : '등록하기'}
          onClick={handleSubmit}
          isLoading={isSaving}
          isDisabled={!title.trim() || !content.trim()}
        />
      </div>
    </div>
  );
}
