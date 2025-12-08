import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { UseProvider } from './contexto/ContextoBD.jsx';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <UseProvider>
      <App/>
    </UseProvider>
  </StrictMode>
)
