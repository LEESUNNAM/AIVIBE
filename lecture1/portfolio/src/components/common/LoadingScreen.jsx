import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

/**
 * LoadingScreen 컴포넌트
 *
 * 메인 페이지가 준비되기 전까지 표시하는 전체화면 로딩 화면
 *
 * Example usage:
 * <LoadingScreen />
 */
function LoadingScreen() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        backgroundColor: 'background.default',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'text.primary',
        }}
      >
        PORTFOLIO
      </Typography>
      <CircularProgress size={28} thickness={3} sx={{ color: 'primary.main' }} />
    </Box>
  );
}

export default LoadingScreen;
