import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';

/**
 * Footer 컴포넌트
 *
 * Props: 없음
 *
 * Example usage:
 * <Footer />
 */
function Footer() {
  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'secondary.main',
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        새로운 프로젝트나 협업 제안은 언제든 환영합니다.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
        <IconButton
          component="a"
          href="https://github.com/LEESUNNAM"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 19 19" aria-hidden="true">
            <use href={`${import.meta.env.BASE_URL}icons.svg#github-icon`} />
          </svg>
        </IconButton>
        <IconButton
          component="a"
          href="mailto:sl1739304@gmail.com"
          aria-label="Email"
          sx={{ color: 'sky.accent' }}
        >
          <EmailIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
        © {new Date().getFullYear()} My Portfolio. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
