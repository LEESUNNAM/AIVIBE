export type User = {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
};

export type MediaFile = {
  id: string;
  type: 'image' | 'audio' | 'video';
  url: string;
  name: string;
};

export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  media: MediaFile[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt?: string;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
};

export type SignUpPayload = {
  email: string;
  password: string;
  nickname: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type PostPayload = {
  title: string;
  content: string;
  media: MediaFile[];
};
