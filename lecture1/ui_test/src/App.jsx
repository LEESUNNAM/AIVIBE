import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ButtonSection from './components/sections/button-section';

/**
 * App 컴포넌트
 *
 * 16개 UI 섹션을 순차적으로 쌓아 보여주는 기본 레이아웃입니다.
 * 새로운 섹션은 components/sections 에 만든 뒤 아래 Container 안에 추가합니다.
 */
function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 4, md: 6 },
        }}
      >
        <ButtonSection />
        {/* 다음 섹션 컴포넌트가 이곳에 순차적으로 추가됩니다 */}
      </Container>
    </Box>
  );
}

export default App;
