import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const variants = ['standard', 'outlined', 'filled'];

/**
 * InputSection 컴포넌트
 *
 * MUI TextField 의 variant(standard / outlined / filled) 3가지를 보여주는 섹션입니다.
 * 각 입력창에는 label, placeholder 가 설정되어 있고, 입력값을 실시간으로 하단에 표시합니다.
 */
function InputSection() {
  const [values, setValues] = useState({ standard: '', outlined: '', filled: '' });

  const handleChange = (variant) => (event) => {
    setValues((prev) => ({ ...prev, [variant]: event.target.value }));
  };

  return (
    <Box component="section" sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, fontSize: { xs: '1.3rem', md: '1.5rem' } }}
      >
        Input
      </Typography>
      <Stack spacing={3}>
        {variants.map((variant) => (
          <Box key={variant}>
            <TextField
              variant={variant}
              label={`${variant} label`}
              placeholder="텍스트를 입력하세요"
              value={values[variant]}
              onChange={handleChange(variant)}
              fullWidth
            />
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              입력값: {values[variant]}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default InputSection;
