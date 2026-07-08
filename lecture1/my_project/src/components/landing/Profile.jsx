import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

/**
 * Profile 컴포넌트
 *
 * Props: 없음
 *
 * Example usage:
 * <Profile />
 */
function Profile() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        px: { xs: 2, md: 3 },
        pt: { xs: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: 360,
          mx: 'auto',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'secondary.main',
          borderRadius: 3,
          p: 3,
          boxShadow: '0 8px 24px rgba(20, 43, 51, 0.08)',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: 1,
            color: 'text.disabled',
            mb: 1.5,
          }}
        >
          PROFILE
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.main', fontWeight: 600 }}>
            SL
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
              Sunnam Lee
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                Korea, Republic of
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          component="a"
          href="https://github.com/LEESUNNAM"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          variant="contained"
          startIcon={<PersonAddAlt1Icon sx={{ fontSize: 18 }} />}
          sx={{
            bgcolor: 'sky.accent',
            borderRadius: '999px',
            textTransform: 'none',
            py: 1,
            mb: 1.5,
            '&:hover': { bgcolor: 'sky.buttonHover' },
          }}
        >
          GitHub 팔로우
        </Button>
        <Button
          component="a"
          href="mailto:sl1739304@gmail.com"
          fullWidth
          variant="outlined"
          startIcon={<EmailIcon sx={{ fontSize: 18 }} />}
          sx={{
            borderRadius: '999px',
            textTransform: 'none',
            py: 1,
            color: 'sky.accent',
            borderColor: 'sky.accent',
            '&:hover': { borderColor: 'sky.buttonHover', bgcolor: 'background.default' },
          }}
        >
          메시지 보내기
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
