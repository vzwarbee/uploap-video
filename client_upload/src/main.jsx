import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { AppWrapper } from './components/common/PageMeta';
import App from './App';
import { ThemeProviderTailwind } from './context/ThemeContext';
import { ThemeProvider } from '@mui/material/styles';
import ToastTifyContainer from './components/common/ToastTifyContainer';
import ColorThemeMUI from './context/ColorThemeMUI';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProviderTailwind>
        <ThemeProvider theme={ColorThemeMUI}>
          <ToastTifyContainer />
          <AppWrapper>
            <App />
          </AppWrapper>
        </ThemeProvider>
      </ThemeProviderTailwind>
    </QueryClientProvider>
  </StrictMode>
);
