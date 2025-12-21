import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente que protege rutas - solo permite acceso si está autenticado
export const RutaProtegida = ({ children }) => {
// Obtiene el valor 'autenticado' del localStorage y verifica si es 'true'
  // Si no existe o es diferente a 'true', la variable será false
  const estaAutenticado = localStorage.getItem('autenticado') === 'true';

  // Si no está autenticado, redirige a inicio (/)
  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, muestra el contenido (la ruta)
  return children;
};
