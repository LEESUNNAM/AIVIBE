'use client';

import React from 'react';
import { MediaFile } from '@/types';

/**
 * MediaPreview 컴포넌트
 *
 * Props:
 * @param {MediaFile[]} mediaList - 미디어 파일 목록 [Required]
 * @param {function} onRemove - 파일 삭제 핸들러 [Optional]
 */
interface MediaPreviewProps {
  mediaList: MediaFile[];
  onRemove?: (id: string) => void;
}

export default function MediaPreview({ mediaList, onRemove }: MediaPreviewProps) {
  if (mediaList.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {mediaList.map((media) => (
        <div
          key={media.id}
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            background: 'var(--color-white)',
          }}
        >
          {media.type === 'image' && (
            <img
              src={media.url}
              alt={media.name}
              style={{ width: '120px', height: '90px', objectFit: 'cover', display: 'block' }}
            />
          )}
          {media.type === 'audio' && (
            <div
              style={{
                width: '160px',
                height: '90px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                color: 'white',
                padding: '8px',
              }}
            >
              <span style={{ fontSize: '24px' }}>🎵</span>
              <p
                style={{
                  fontSize: '11px',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                {media.name}
              </p>
            </div>
          )}
          {media.type === 'video' && (
            <video src={media.url} style={{ width: '160px', height: '90px', objectFit: 'cover', display: 'block' }} />
          )}
          {onRemove && (
            <button
              onClick={() => onRemove(media.id)}
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'rgba(255,107,107,0.9)',
                color: 'white',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          )}
          {/* 타입 라벨 */}
          <span
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '4px',
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '4px',
              padding: '1px 5px',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--color-primary-dark)',
              textTransform: 'uppercase',
            }}
          >
            {media.type}
          </span>
        </div>
      ))}
    </div>
  );
}
