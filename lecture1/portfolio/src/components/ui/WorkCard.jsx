import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * WorkCard 컴포넌트
 *
 * Props:
 * @param {string} title - 작업물 제목 [Required]
 * @param {string} description - 작업물 한 줄 설명 [Required]
 * @param {string[]} tags - 사용 기술/카테고리 태그 [Optional, 기본값: []]
 * @param {string} link - 작업물 상세/배포 링크 [Optional, 기본값: '#']
 *
 * Example usage:
 * <WorkCard title="Minimal E-commerce UI" description="..." tags={['React']} link="#" />
 */
function WorkCard({ title, description, tags = [], link = '#' }) {
  return (
    <Paper
      component="a"
      href={link}
      target={link !== '#' ? '_blank' : undefined}
      rel={link !== '#' ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'block',
        height: '100%',
        p: { xs: 2.5, md: 3 },
        borderRadius: 2,
        backgroundColor: 'background.paper',
        textDecoration: 'none',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: 'secondary.main',
        },
      }}
    >
      <Stack spacing={1.5} sx={{ height: '100%' }}>
        <Typography variant="h3" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', flexGrow: 1 }}>
          {description}
        </Typography>
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  borderRadius: '999px',
                  backgroundColor: 'background.default',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

export default WorkCard;
