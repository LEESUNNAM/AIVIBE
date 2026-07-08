import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#38A0CD',
      light: '#88B7D4',
      dark: '#3292BB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A1D5F3',
      contrastText: '#142B33',
    },
    background: {
      default: '#EAF6FB',
      paper: '#F3FAFD',
    },
    text: {
      primary: '#142B33',
      secondary: '#33515C',
      disabled: '#8CA8B2',
    },
    sky: {
      accent: '#3D7E97',
      buttonHover: '#2A5B70',
      link: '#2C7CA0',
      linkHover: '#1F5A79',
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

export default theme;
