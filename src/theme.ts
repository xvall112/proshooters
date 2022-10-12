import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import { PaletteMode } from '@mui/material';
// Create a theme instance.
const theme = createTheme({
  palette: {
    alternate: {
      main: '#f7faff',
      dark: '#edf1f7',
    },
    cardShadow: 'rgba(23, 70, 161, .11)',
    mode: 'light' as PaletteMode,
    primary: {
      main: '#C61517',
      light: '#467de3',
      dark: '#2f6ad9',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffb74d',
      main: '#f9b934',
      dark: '#FF9800',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: '#1e2022',
      secondary: '#677788',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: '#ffffff',
      default: '#ffffff',
      level2: '#f5f5f5',
      level1: '#ffffff',
    },
  },
});

export default theme;
