import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { AppWrapper } from './components/common/PageMeta';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import ToastTifyContainer from './components/common/ToastTifyContainer';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastTifyContainer />
        <AppWrapper>
          <App />
        </AppWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
