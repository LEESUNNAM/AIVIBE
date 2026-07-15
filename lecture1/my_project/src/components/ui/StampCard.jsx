import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import heroPhoto from '../../assets/hero-photo.jpg';

function generateStampClipPath({ pointsX = 14, pointsY = 9, depth = 2 } = {}) {
  const points = [];
  const stepX = 100 / (pointsX * 2);
  const stepY = 100 / (pointsY * 2);

  for (let i = 0; i <= pointsX * 2; i += 1) {
    const x = i * stepX;
    const y = i % 2 === 0 ? 0 : depth;
    points.push(`${x}% ${y}%`);
  }
  for (let i = 1; i <= pointsY * 2; i += 1) {
    const y = i * stepY;
    const x = i % 2 === 0 ? 100 : 100 - depth;
    points.push(`${x}% ${y}%`);
  }
  for (let i = 1; i <= pointsX * 2; i += 1) {
    const x = 100 - i * stepX;
    const y = i % 2 === 0 ? 100 : 100 - depth;
    points.push(`${x}% ${y}%`);
  }
  for (let i = 1; i < pointsY * 2; i += 1) {
    const y = 100 - i * stepY;
    const x = i % 2 === 0 ? 0 : depth;
    points.push(`${x}% ${y}%`);
  }

  return `polygon(${points.join(', ')})`;
}

const stampClipPath = generateStampClipPath();

const cornerDotSx = {
  position: 'absolute',
  width: 10,
  height: 10,
  borderRadius: '50%',
  border: '1.5px solid rgba(255,255,255,0.8)',
  bgcolor: 'rgba(255,255,255,0.35)',
  zIndex: 2,
};

/**
 * StampCard 컴포넌트
 *
 * Props:
 * @param {string} title - 카드 중앙 상단에 표시할 필기체 타이틀 [Required]
 * @param {string} signature - 타이틀 아래 서명 스타일 텍스트 [Required]
 * @param {Array<string>} tags - 좌측 하단에 표시할 태그 목록 [Optional, 기본값: []]
 * @param {{label: string, value: string}} periodInfo - 우측 하단 첫 번째 메타 정보 [Required]
 * @param {{label: string, values: Array<string>}} stackInfo - 우측 하단 두 번째 메타 정보 [Required]
 *
 * Example usage:
 * <StampCard title="Portfolio" signature="Sunnam Lee" tags={['Web', 'App']} periodInfo={{ label: 'Period', value: '2023-2026' }} stackInfo={{ label: 'Stack', values: ['React', 'MUI'] }} />
 */
function StampCard({ title, signature, tags = [], periodInfo, stackInfo }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 560,
        aspectRatio: '1.6',
        mx: 'auto',
        clipPath: stampClipPath,
        background: 'linear-gradient(135deg, #38A0CD 0%, #3292BB 100%)',
        boxShadow: '0 20px 40px rgba(20, 43, 51, 0.25)',
        px: { xs: 3, md: 5 },
        py: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        component="img"
        src={heroPhoto}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(56,160,205,0.55) 0%, rgba(50,146,187,0.65) 100%)',
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'absolute', top: 14, left: 14, ...cornerDotSx }} />
      <Box sx={{ position: 'absolute', top: 14, right: 14, ...cornerDotSx }} />
      <Box sx={{ position: 'absolute', bottom: 14, left: 14, ...cornerDotSx }} />
      <Box sx={{ position: 'absolute', bottom: 14, right: 14, ...cornerDotSx }} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          sx={{
            fontFamily: '"Pretendard", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '1.3rem', md: '1.75rem' },
            lineHeight: 1.3,
            color: '#FFFFFF',
            textShadow: '0 2px 8px rgba(20, 43, 51, 0.35)',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Dancing Script", cursive',
            fontWeight: 500,
            fontSize: { xs: '1.1rem', md: '1.4rem' },
            color: 'rgba(255,255,255,0.85)',
            mt: 0.5,
          }}
        >
          {signature}
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {tags.length > 0 && (
          <Typography
            sx={{
              fontSize: { xs: '0.7rem', md: '0.75rem' },
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {tags.join(' • ')}
          </Typography>
        )}

        <Box sx={{ textAlign: 'right' }}>
          {periodInfo && (
            <Box sx={{ mb: 1 }}>
              <Typography
                sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF' }}
              >
                {periodInfo.label}
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)' }}>
                {periodInfo.value}
              </Typography>
            </Box>
          )}
          {stackInfo && (
            <Box>
              <Typography
                sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF' }}
              >
                {stackInfo.label}
              </Typography>
              {stackInfo.values.map((value) => (
                <Typography
                  key={value}
                  sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)' }}
                >
                  {value}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default StampCard;
