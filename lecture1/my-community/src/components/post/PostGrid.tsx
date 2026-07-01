import React from 'react';
import { Post } from '@/types';
import PostCard from './PostCard';
import EmptyState from '@/components/common/EmptyState';

/**
 * PostGrid 컴포넌트
 *
 * Props:
 * @param {Post[]} posts - 게시글 목록 [Required]
 */
interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) return <EmptyState />;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
      }}
      className='post-grid'
    >
      <style>{`
        @media (max-width: 900px) {
          .post-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .post-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
