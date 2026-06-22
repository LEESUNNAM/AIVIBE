import { createTheme } from '@mui/material/styles';

/**
 * 디자인 레퍼런스
 * - 컬러: color_pallette/DIETRO_ColorSystem.md
 * - 타이포그래피/간격/라운드: DesignSystem/BOOK_DesignSystem.md
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#76A7D8',
      light: '#9FC1E4',
      dark: '#537597',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C5BDD8',
      contrastText: '#47453C',
    },
    accent: {
      main: '#818264',
      hover: '#4D4E30',
    },
    background: {
      default: '#F4F8FC',
      paper: '#F9F8FB',
    },
    text: {
      primary: '#47453C',
      secondary: '#42484C',
      disabled: '#AAADAE',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});

export default theme;
