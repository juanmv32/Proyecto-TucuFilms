import React, { createContext, useEffect, useState, useCallback } from 'react';
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
      // Limpiar localStorage viejos que ya no se usan
      localStorage.removeItem('peliculas');
      
      // Intentar cargar desde localStorage primero
      const storedData = localStorage.getItem('movieData');
      let cats;
      
      if (storedData) {
        cats = JSON.parse(storedData);
      } else {
        cats = data.categorias ?? [];
        // Guardar en localStorage la primera vez
        localStorage.setItem('movieData', JSON.stringify(cats));
      }

      setCategorias(cats);
      setLoading(false);
    } catch (err) {
      console.error('Error cargando JSON:', err);
      setError(err);
      setLoading(false);
      setCategorias([]);
    }
  }, []);

  // Lista plana de películas (añadimos el id de la categoría origen)
  const user = categorias.flatMap((cat) =>
    (cat.peliculas || []).map((p) => ({ ...p, categoriaId: cat.id }))
  );

  // Actualiza la lista plana de películas: reconstruye las categorías
  // a partir del array plano recibido. No modifica títulos de categorías
  // existentes; preserva el orden conocido en `categorias` cuando sea posible.
  const actualizarPelicula = useCallback((updatedFlatList) => {
    setCategorias((currentCategorias) => {
      const map = {};

      // Inicializa con categorías actuales para preservar títulos y orden
      currentCategorias.forEach((cat) => {
        map[cat.id] = { ...cat, peliculas: [] };
      });

      // Si no hay categorías aún, crear una por defecto
      if (Object.keys(map).length === 0) {
        map['default'] = { id: 'default', titulo: 'Sin categoría', peliculas: [] };
      }

      // Distribuye las películas actualizadas en sus categorías
      updatedFlatList.forEach((p) => {
        const catId = p.categoriaId ?? p.categoria ?? Object.keys(map)[0];
        if (!map[catId]) map[catId] = { id: catId, titulo: catId, peliculas: [] };
        map[catId].peliculas.push({ ...p });
      });

      // Reconstruye un array de categorías respetando el orden original cuando sea posible
      const newCategorias = Object.keys(map).map((id) => map[id]);
      
      // Guardar en localStorage
      localStorage.setItem('movieData', JSON.stringify(newCategorias));
      
      return newCategorias;
    });
  }, []);

  return (
    <MovieContext.Provider value={{ categorias, loading, error, user, actualizarPelicula }}>
      {children}
    </MovieContext.Provider>
  );
};

// Alias opcional
export const UserContext = MovieContext;
export const UseProvider = MovieProvider;