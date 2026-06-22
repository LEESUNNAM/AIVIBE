/**
 * 작업물 목차 placeholder 데이터
 * 실제 프로젝트가 준비되면 이 배열의 항목을 교체한다.
 *
 * @typedef {Object} WorkItem
 * @property {string} title - 작업물 제목
 * @property {string} description - 작업물 한 줄 설명
 * @property {string[]} tags - 사용 기술/카테고리 태그
 * @property {string} link - 작업물 상세/배포 링크
 */
const worksData = [
  {
    title: 'Minimal E-commerce UI',
    description: '미니멀한 쇼핑몰 UI 컨셉을 React와 MUI로 구현한 프로젝트입니다.',
    tags: ['React', 'MUI'],
    link: '#',
  },
  {
    title: 'Realtime Dashboard',
    description: '실시간 데이터를 시각화하는 대시보드 인터페이스 프로토타입입니다.',
    tags: ['React', 'Chart'],
    link: '#',
  },
  {
    title: 'Design System Playground',
    description: '컬러·타이포그래피 토큰을 실험하는 디자인 시스템 플레이그라운드입니다.',
    tags: ['Design System'],
    link: '#',
  },
];

export default worksData;
