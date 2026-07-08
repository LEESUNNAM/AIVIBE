import dashboardThumb from '../assets/projects/dashboard.png';
import communityThumb from '../assets/projects/community.png';

export const categories = ['전체', 'Web', 'App', 'Design'];

export const portfolioItems = [
  {
    id: 1,
    title: 'Ocean Gallery Community',
    description: '이미지·음원·영상·텍스트를 공유하는 갤러리형 커뮤니티 서비스',
    category: 'Web',
    tags: ['React', 'MUI', 'Supabase'],
    image: communityThumb,
    link: 'https://leesunnam.github.io/AIVIBE/home/',
  },
  {
    id: 2,
    title: '건강관리 모바일 앱',
    description: '일상 습관 기록과 목표 달성을 돕는 헬스케어 앱 디자인',
    category: 'App',
    tags: ['React Native', 'Design System'],
    link: '#',
  },
  {
    id: 3,
    title: '브랜드 아이덴티티 작업',
    description: '스타트업 브랜드를 위한 로고 및 컬러 시스템 설계',
    category: 'Design',
    tags: ['Branding', 'Illustrator'],
    link: '#',
  },
  {
    id: 4,
    title: 'File Share Hub 대시보드',
    description: '파일 업로드·공유 현황을 관리하는 로그인 기반 대시보드',
    category: 'Web',
    tags: ['React', 'MUI', 'Supabase'],
    image: dashboardThumb,
    link: 'https://leesunnam.github.io/dashboard/',
  },
  {
    id: 5,
    title: '여행 일정 관리 앱',
    description: '여행 코스를 계획하고 공유하는 모바일 애플리케이션',
    category: 'App',
    tags: ['Flutter', 'UX Research'],
    link: '#',
  },
  {
    id: 6,
    title: '포트폴리오 웹사이트',
    description: '개인 작업물을 소개하는 반응형 포트폴리오 사이트',
    category: 'Web',
    tags: ['React', 'Vite', 'MUI'],
    link: '#',
  },
];
