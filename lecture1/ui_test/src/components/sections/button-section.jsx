import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const variants = ['contained', 'outlined', 'text'];
const colors = ['primary', 'secondary', 'error'];

/**
 * ButtonSection 컴포넌트
 *
 * MUI Button 의 variant(contained / outlined / text) x color(primary / secondary / error)
 * 조합을 모두 보여주는 섹션입니다. 버튼을 클릭하면 알림창으로 variant 와 color 를 표시합니다.
 */
function ButtonSection() {
  const handleClick = (variant, color) => {
    alert(`variant: ${variant}, color: ${color}`);
  };

  return (
    <Box component="section" sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, fontSize: { xs: '1.3rem', md: '1.5rem' } }}
      >
        Button
      </Typography>
      <Stack spacing={2}>
        {variants.map((variant) => (
          <Stack
            key={variant}
            direction="row"
            spacing={2}
            sx={{ flexWrap: 'wrap', rowGap: 2 }}
          >
            {colors.map((color) => (
              <Button
                key={`${variant}-${color}`}
                variant={variant}
                color={color}
                onClick={() => handleClick(variant, color)}
              >
                {`${variant} / ${color}`}
              </Button>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default ButtonSection;
