import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ProveedorPeliculas } from './contexto/ContextoBD';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <StrictMode>
  <ProveedorPeliculas>
    <App />
  </ProveedorPeliculas>
  </StrictMode>
)
