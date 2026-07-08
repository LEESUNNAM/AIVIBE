import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * Hero 컴포넌트
 *
 * Props: 없음
 *
 * Example usage:
 * <Hero />
 */
function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        background: 'linear-gradient(180deg, #38A0CD 0%, #A1D5F3 100%)',
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 3 },
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2rem', md: '2.75rem' },
          color: '#FFFFFF',
          mb: 2,
        }}
      >
        안녕하세요, 프론트엔드 개발자입니다
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: '#EAF6FB',
          maxWidth: 600,
          mx: 'auto',
          mb: 4,
        }}
      >
        사용자 경험을 중심에 둔 웹/앱 프로젝트를 만들고 있습니다. 아래에서 작업물을 확인해보세요.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          href="#portfolio"
          variant="contained"
          sx={{
            bgcolor: 'sky.accent',
            borderRadius: '999px',
            px: 4,
            textTransform: 'none',
            '&:hover': { bgcolor: 'sky.buttonHover' },
          }}
        >
          포트폴리오 보기
        </Button>
        <Button
          href="#contact"
          variant="outlined"
          sx={{
            borderRadius: '999px',
            px: 4,
            textTransform: 'none',
            color: '#FFFFFF',
            borderColor: '#FFFFFF',
            '&:hover': { borderColor: '#EAF6FB', bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          연락하기
        </Button>
      </Box>
    </Box>
  );
}

export default Hero;
