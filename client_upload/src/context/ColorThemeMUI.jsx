// theme.js
import { createTheme } from '@mui/material/styles';

const ColorThemeMUI = createTheme({
  palette: {
    primary: {
      main: '#465fff',
    },
    success: {
      main: '#12b76a',
    },
    warning: {
      main: '#f79009',
    },
    error: {
      main: '#f04438',
    },
    info: {
      main: '#0ba5ec',
    },
  },
});

export default ColorThemeMUI;
