import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider as RouteProvider } from 'react-router-dom';
import router from './router.jsx';
import { ContextProvider } from './contexts/ContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouteProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
)
