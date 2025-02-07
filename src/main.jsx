import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from '../src/context/DarkModeContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/pages/ErrorPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage} onReset={() => location.href = '/'}>
      <DarkModeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              iconTheme: {
                primary: '#4a3da0',
              },
            },
          }}
        />
        <RouterProvider router={router} />
      </DarkModeProvider>
    </ErrorBoundary>

  </React.StrictMode>
);
