import { MediaFile } from '@/types';

/** 미디어 파일 업로드 — Supabase Storage 연동 시 supabase.storage.from('media').upload() 로 교체 */
export async function uploadMedia(file: File): Promise<MediaFile> {
  // const { data } = await supabase.storage.from('media').upload(`${Date.now()}_${file.name}`, file)
  const type = getMediaType(file);
  return {
    id: `media-${Date.now()}`,
    type,
    url: URL.createObjectURL(file),
    name: file.name,
  };
}

/** 미디어 파일 삭제 — Supabase Storage 연동 시 supabase.storage.from('media').remove() 로 교체 */
export async function deleteMedia(url: string): Promise<void> {
  // supabase.storage.from('media').remove([path])
}

function getMediaType(file: File): 'image' | 'audio' | 'video' {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('audio/')) return 'audio';
  if (file.type.startsWith('video/')) return 'video';
  return 'image';
}
