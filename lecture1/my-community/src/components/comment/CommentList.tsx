'use client';

import React, { useState } from 'react';
import { Comment } from '@/types';
import { createComment, deleteComment } from '@/services/commentService';
import { currentUser } from '@/data/mockData';
import CommentItem from './CommentItem';
import Button from '@/components/common/Button';

/**
 * CommentList 컴포넌트
 *
 * Props:
 * @param {string} postId - 게시글 ID [Required]
 * @param {Comment[]} initialComments - 초기 댓글 목록 [Required]
 */
interface CommentListProps {
  postId: string;
  initialComments: Comment[];
}

export default function CommentList({ postId, initialComments }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setIsSubmitting(true);
    const newComment = await createComment(postId, currentUser.id, text);
    setComments((prev) => [...prev, newComment]);
    setText('');
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
        }}
      >
        댓글 {comments.length}개
      </h3>

      {/* 댓글 입력 */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end',
          background: 'var(--color-bg-secondary)',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid var(--color-border)',
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='따뜻한 댓글을 남겨보세요...'
          rows={2}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            resize: 'none',
            fontSize: 'var(--font-body)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.6,
            fontFamily: 'inherit',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button label='등록' size='sm' onClick={handleSubmit} isLoading={isSubmitting} isDisabled={!text.trim()} />
      </div>

      {/* 댓글 목록 */}
      <div>
        {comments.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '24px', color: 'var(--color-text-muted)', fontSize: 'var(--font-caption)' }}>
            첫 댓글을 남겨보세요 🌊
          </p>
        ) : (
          comments.map((c) => <CommentItem key={c.id} comment={c} onDelete={handleDelete} />)
        )}
      </div>
    </section>
  );
}
