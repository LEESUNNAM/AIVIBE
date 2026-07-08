import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

/**
 * PortfolioCard 컴포넌트
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 프로젝트 한 줄 설명 [Required]
 * @param {string} category - 프로젝트 카테고리 배지 텍스트 [Required]
 * @param {Array<string>} tags - 사용 기술 태그 목록 [Optional, 기본값: []]
 * @param {string} link - 상세 링크 URL [Optional, 기본값: '#']
 *
 * Example usage:
 * <PortfolioCard title="포트폴리오 웹사이트" description="..." category="Web" tags={['React']} link="#" />
 */
function PortfolioCard({ title, description, category, tags = [], link = '#' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:hover .card-action': { opacity: 1 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '1.28',
          borderRadius: 0,
          background: 'linear-gradient(135deg, #88B7D4 0%, #3D7E97 100%)',
          overflow: 'hidden',
        }}
      >
        <Chip
          label={category}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: 'rgba(20, 43, 51, 0.55)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            borderRadius: '999px',
          }}
        />
        <IconButton
          className="card-action"
          component="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} 상세 보기`}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.85)',
            opacity: { xs: 1, md: 0 },
            transition: 'opacity 0.2s ease',
            '&:hover': { bgcolor: '#FFFFFF' },
          }}
        >
          <ArrowOutwardIcon fontSize="small" sx={{ color: 'sky.accent' }} />
        </IconButton>
      </Box>

      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 600,
          lineHeight: 1.3,
          color: 'text.primary',
          mt: 1.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: '0.875rem',
          lineHeight: 1.5,
          color: 'text.secondary',
          mt: 0.5,
        }}
      >
        {description}
      </Typography>
      {tags.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {tags.map((tag) => (
            <Typography
              key={tag}
              component="span"
              sx={{
                fontSize: '0.75rem',
                color: 'text.disabled',
              }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default PortfolioCard;
