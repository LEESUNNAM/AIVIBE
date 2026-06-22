import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import WorkCard from '../ui/WorkCard';
import worksData from '../../utils/worksData';

/**
 * WorksSection 컴포넌트
 *
 * 메인 페이지의 두 번째 섹션 - 작업물 목차를 카드 그리드로 보여준다.
 *
 * Example usage:
 * <WorksSection />
 */
function WorksSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        backgroundColor: 'background.default',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: 'text.primary',
            mb: { xs: 3, md: 5 },
          }}
        >
          Works
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {worksData.map((work) => (
            <Grid key={work.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <WorkCard {...work} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default WorksSection;
