import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PortfolioCard from '../ui/PortfolioCard';
import { categories, portfolioItems } from '../../utils/portfolioData';

/**
 * PortfolioGrid 컴포넌트
 *
 * Props: 없음
 *
 * Example usage:
 * <PortfolioGrid />
 */
function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredItems =
    activeCategory === '전체'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <Box
      id="portfolio"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
        bgcolor: 'background.default',
      }}
    >
      <Typography
        variant="h2"
        sx={{ textAlign: 'center', color: 'text.primary', mb: 4 }}
      >
        Portfolio
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          flexWrap: 'wrap',
          mb: { xs: 3, md: 4 },
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setActiveCategory(category)}
            sx={{
              borderRadius: '999px',
              fontSize: '1rem',
              px: 1,
              bgcolor: activeCategory === category ? 'primary.main' : 'background.paper',
              color: activeCategory === category ? '#FFFFFF' : 'text.secondary',
              '&:hover': {
                bgcolor: activeCategory === category ? 'primary.dark' : 'secondary.main',
              },
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          columnGap: { xs: 2, md: 3 },
          rowGap: { xs: 3, md: 4 },
        }}
      >
        {filteredItems.map((item) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            description={item.description}
            category={item.category}
            tags={item.tags}
            link={item.link}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PortfolioGrid;
