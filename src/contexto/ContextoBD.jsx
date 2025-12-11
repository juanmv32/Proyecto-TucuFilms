import React, { createContext, useEffect, useState } from 'react';
import data from '../assets/data/movie.json';

// Creamos el contexto con valores iniciales
export const MovieContext = createContext({
  categorias: [],
  loading: true,
  error: null,
});

export const MovieProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const cats = data.categorias ?? [];

      setCategorias(cats);
      setLoading(false);
    } catch (err) {
      console.error('Error cargando JSON:', err);
      setError(err);
      setLoading(false);
      setCategorias([]);
    }
  }, []);

  return (
    <MovieContext.Provider value={{ categorias, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
};

// Alias opcional
export const UserContext = MovieContext;
export const UseProvider = MovieProvider;