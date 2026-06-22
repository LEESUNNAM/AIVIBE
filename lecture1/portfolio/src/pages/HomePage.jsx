import Box from '@mui/material/Box';
import ProfileSection from '../components/landing/ProfileSection';
import WorksSection from '../components/landing/WorksSection';

/**
 * HomePage 컴포넌트
 *
 * 섹션1(가상 프로필) + 섹션2(작업물 목차)로 구성된 메인 페이지
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  return (
    <Box sx={{ width: '100%' }}>
      <ProfileSection />
      <WorksSection />
    </Box>
  );
}

export default HomePage;
