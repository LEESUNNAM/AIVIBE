import { User, Post, Comment } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'sena@ocean.gallery',
    nickname: '세나',
    profileImageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=sena&backgroundColor=b6e3f4',
    createdAt: '2026-05-10T09:00:00Z',
  },
  {
    id: 'user-2',
    email: 'hadam@ocean.gallery',
    nickname: '하담',
    profileImageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=hadam&backgroundColor=ffd5dc',
    createdAt: '2026-05-15T11:30:00Z',
  },
  {
    id: 'user-3',
    email: 'gawi@ocean.gallery',
    nickname: '가위',
    profileImageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=gawi&backgroundColor=c0aede',
    createdAt: '2026-06-01T08:00:00Z',
  },
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    title: '오늘 바다를 닮은 하늘 아래',
    content:
      '바람이 불지 않는 오후, 창문 너머로 바라본 하늘이 꼭 바다 같았어요. 구름 한 점 없이 맑고 투명한 파란색. 그 고요함이 너무 좋아서 사진으로 남겼습니다.',
    media: [
      {
        id: 'm-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        name: 'ocean_sky.jpg',
      },
    ],
    likeCount: 24,
    commentCount: 5,
    createdAt: '2026-06-28T14:20:00Z',
  },
  {
    id: 'post-2',
    userId: 'user-2',
    title: '조용한 오후에 어울리는 음악',
    content:
      '아무것도 하기 싫은 날, 창가에 앉아 이 곡을 들었어요. 멜로디가 파도처럼 부드럽게 흘러서 마음이 차분해졌습니다. 여러분께도 나눠드려요.',
    media: [
      {
        id: 'm-2',
        type: 'audio',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        name: 'afternoon_melody.mp3',
      },
    ],
    likeCount: 18,
    commentCount: 3,
    createdAt: '2026-06-27T10:05:00Z',
  },
  {
    id: 'post-3',
    userId: 'user-3',
    title: '햇살이 좋은 날의 짧은 기록',
    content:
      '오늘 아침 산책길에 담아온 풍경 영상이에요. 바람 소리, 잎이 흔들리는 소리... 이런 순간들이 쌓여서 하루가 되는 것 같아요.',
    media: [
      {
        id: 'm-3',
        type: 'video',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        name: 'morning_walk.mp4',
      },
    ],
    likeCount: 31,
    commentCount: 7,
    createdAt: '2026-06-26T08:40:00Z',
  },
  {
    id: 'post-4',
    userId: 'user-1',
    title: '지중해를 꿈꾸며',
    content:
      '언젠가 꼭 가고 싶은 지중해의 흰 담장 마을. 파란 하늘과 하얀 건물이 어우러진 풍경을 상상하며 오늘도 하루를 버팁니다.',
    media: [
      {
        id: 'm-4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',
        name: 'mediterranean.jpg',
      },
      {
        id: 'm-5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',
        name: 'blue_door.jpg',
      },
    ],
    likeCount: 42,
    commentCount: 9,
    createdAt: '2026-06-25T16:10:00Z',
  },
  {
    id: 'post-5',
    userId: 'user-2',
    title: '파도 소리를 담아봤어요',
    content: '바다 근처를 지나다 잠깐 녹음한 파도 소리예요. 눈을 감고 들으면 진짜 바닷가에 와 있는 것 같아요.',
    media: [
      {
        id: 'm-6',
        type: 'audio',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        name: 'wave_sound.mp3',
      },
    ],
    likeCount: 15,
    commentCount: 2,
    createdAt: '2026-06-24T19:30:00Z',
  },
  {
    id: 'post-6',
    userId: 'user-3',
    title: '고양이와 바다색 오후',
    content:
      '골목 끝 담장에 앉아 있던 고양이 한 마리. 주황빛 털이 파란 하늘과 너무 잘 어울려서 그냥 지나칠 수 없었어요. 잠시 바라보다 사진 한 장 찍었습니다.',
    media: [
      {
        id: 'm-7',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
        name: 'cat_afternoon.jpg',
      },
    ],
    likeCount: 58,
    commentCount: 12,
    createdAt: '2026-06-23T15:00:00Z',
  },
];

export const mockComments: Comment[] = [
  { id: 'c-1', postId: 'post-1', userId: 'user-2', content: '정말 아름다운 하늘이네요! 보는 것만으로도 힐링돼요.', createdAt: '2026-06-28T15:00:00Z' },
  { id: 'c-2', postId: 'post-1', userId: 'user-3', content: '맑은 날씨가 부럽습니다 😊', createdAt: '2026-06-28T16:30:00Z' },
  { id: 'c-3', postId: 'post-2', userId: 'user-1', content: '딱 제 취향의 음악이에요. 공유 감사해요!', createdAt: '2026-06-27T11:00:00Z' },
  { id: 'c-4', postId: 'post-3', userId: 'user-1', content: '바람 소리까지 담겼네요. 잠깐 멈추게 되는 영상이에요.', createdAt: '2026-06-26T09:00:00Z' },
  { id: 'c-5', postId: 'post-6', userId: 'user-1', content: '오렌지 고양이 너무 귀여워요!! 🧡', createdAt: '2026-06-23T15:30:00Z' },
  { id: 'c-6', postId: 'post-6', userId: 'user-2', content: '고양이랑 하늘이 완벽한 조합이에요.', createdAt: '2026-06-23T16:00:00Z' },
];

export const currentUser: User = mockUsers[0];
