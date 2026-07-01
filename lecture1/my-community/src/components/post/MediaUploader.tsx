'use client';

import React, { useRef, useState } from 'react';
import { MediaFile } from '@/types';
import { uploadMedia } from '@/services/uploadService';

/**
 * MediaUploader 컴포넌트
 *
 * Props:
 * @param {function} onUpload - 업로드 완료 핸들러 [Required]
 */
interface MediaUploaderProps {
  onUpload: (media: MediaFile) => void;
}

export default function MediaUploader({ onUpload }: MediaUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    for (const file of Array.from(files)) {
      const media = await uploadMedia(file);
      onUpload(media);
    }
    setIsUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onClick={() => fileRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragging ? 'var(--color-primary)' : 'var(--color-border)'}`,
        borderRadius: '16px',
        padding: '32px 24px',
        background: isDragging ? 'var(--color-sky-light)' : 'var(--color-bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: '32px' }}>📎</span>
      <p style={{ fontSize: 'var(--font-body)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
        {isUploading ? '업로드 중...' : '+ 파일을 업로드하세요'}
      </p>
      <p style={{ fontSize: 'var(--font-caption)', color: 'var(--color-text-muted)' }}>
        사진, 음원, 동영상을 첨부할 수 있습니다.
      </p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        {['🖼️ 이미지', '🎵 음원', '🎬 동영상'].map((label) => (
          <span
            key={label}
            style={{
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'var(--color-sky-light)',
              fontSize: '12px',
              color: 'var(--color-primary-dark)',
              fontWeight: 500,
              border: '1px solid var(--color-border)',
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <input
        ref={fileRef}
        type='file'
        accept='image/*,audio/*,video/*'
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />
    </div>
  );
}
