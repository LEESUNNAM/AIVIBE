import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/**
 * ProfileSection 컴포넌트
 *
 * 메인 페이지의 첫 번째 섹션 - 가상 프로필 정보를 보여주는 hero 영역
 *
 * Example usage:
 * <ProfileSection />
 */
function ProfileSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Avatar
            sx={{
              width: { xs: 88, md: 112 },
              height: { xs: 88, md: 112 },
              backgroundColor: 'primary.main',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            JL
          </Avatar>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              color: 'text.primary',
            }}
          >
            Jordan Lee
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              fontWeight: 500,
              color: 'primary.dark',
            }}
          >
            Frontend Developer
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 480,
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            미니멀하고 직관적인 사용자 경험을 만드는 것을 좋아하는 프론트엔드
            개발자입니다.
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton href="#" aria-label="GitHub" sx={{ color: 'text.secondary' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton href="#" aria-label="LinkedIn" sx={{ color: 'text.secondary' }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton href="#" aria-label="Email" sx={{ color: 'text.secondary' }}>
              <EmailOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default ProfileSection;
