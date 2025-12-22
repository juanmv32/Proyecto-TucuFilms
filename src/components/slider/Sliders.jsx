import React, { useState, useEffect, useContext, useMemo } from 'react'
import movieData from '../../assets/data/movie.json';
import { ContextoBD } from '../../contexto/ContextoBD';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Carousel.css';

function Sliders() {
  // Obtenemos el contexto que contiene las categorías actualizadas desde ContextoBD
  const contextValue = useContext(ContextoBD);
  
  // Si el contexto tiene categorías las usamos, sino usamos el JSON como fallback
  // Esto permite que el slider funcione incluso si el contexto falla
  const rawCategorias =
    contextValue && Array.isArray(contextValue.categorias)
      ? contextValue.categorias
      : movieData && Array.isArray(movieData.categorias)
      ? movieData.categorias
      : [];

  // Normalizamos la estructura para asegurarnos que cada categoría tenga peliculas como array
  // useMemo evita recalcular en cada render, solo cuando rawCategorias cambie
  const categorias = useMemo(() => 
    rawCategorias.map((cat) => ({
      id: cat.id,
      titulo: cat.titulo,
      peliculas: cat.peliculas || [], // Si no hay peliculas, usamos array vacío
    })),
    [rawCategorias] // Solo se recalcula cuando rawCategorias cambia
  );

  // Estado para guardar el ancho de la ventana y re-renderizar cuando cambie
  // Esto permite adaptar el slider a diferentes tamaños de pantalla
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  // useEffect para detectar cambios de tamaño de ventana (responsive)
  useEffect(() => {
    let timeoutId = null; // Variable para el debounce
    
    // Función que se ejecuta cuando la ventana cambia de tamaño
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId); // Limpiamos el timeout anterior
      // Esperamos 150ms después de que termine el resize para actualizar
      // Esto evita muchos re-renders mientras el usuario arrastra la ventana
      timeoutId = setTimeout(() => setWindowWidth(window.innerWidth), 150);
    };

    // Agregamos el listener de resize al montar el componente
    window.addEventListener('resize', handleResize);
    
    // Cleanup: removemos el listener y limpiamos el timeout al desmontar
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Array vacío = solo se ejecuta al montar/desmontar

  // Función que determina cuántas imágenes mostrar por diapositiva según el ancho
  const obtenerCantidadImagenes = (ancho = windowWidth) => {
    if (ancho < 480) return 1;   // Celular pequeño: 1 imagen
    if (ancho < 768) return 2;   // Celular grande: 2 imágenes
    if (ancho < 1024) return 3;  // Tablet: 3 imágenes
    return 7;                     // Desktop: 7 imágenes
  };

  // Función que renderiza una categoría completa con su carousel
  const renderCategoria = (categoria) => {
    // Obtenemos cuántas imágenes mostrar en cada diapositiva
    const imagenesPorDiapositiva = obtenerCantidadImagenes();
    
    // Calculamos cuántas diapositivas necesitamos para mostrar todas las películas
    // Math.ceil redondea hacia arriba (ej: 10 películas / 3 = 4 diapositivas)
    const totalDiapositivas = Math.ceil(categoria.peliculas.length / imagenesPorDiapositiva);

    return (
      <div key={categoria.id} className="py-2 text-center bg-dark ">
        {/* Título de la categoría */}
        <h2 className="py-2 bg-black bg-opacity-50 text-light border-top border-bottom border-">{categoria.titulo}</h2>

        {/* Contenedor principal del carousel de Bootstrap */}
        {/* id único por categoría para que los botones prev/next sepan qué carousel controlar */}
        {/* data-bs-touch habilita el deslizamiento táctil en móviles */}
        <div id={categoria.id} className="carousel slide" data-bs-touch="true">
          <div className="carousel-inner bg-dark">
            {/* Creamos un array con tantos elementos como diapositivas necesitamos */}
            {Array.from({ length: totalDiapositivas }).map((_, indice) => {
              // Calculamos qué películas van en esta diapositiva
              const inicio = indice * imagenesPorDiapositiva; // Índice inicial
              const fin = inicio + imagenesPorDiapositiva;     // Índice final
              const grupoPeliculas = categoria.peliculas.slice(inicio, fin); // Cortamos el array

              return (
                <div
                  key={indice}
                  // La primera diapositiva (índice 0) debe tener clase "active" para ser visible inicialmente
                  className={`carousel-item ${indice === 0 ? "active" : ""}`}
                >
                  <div
                    className="d-flex justify-content-center gap-3 p-2 "
                    style={{
                      minHeight: "180px", // Altura mínima para evitar saltos visuales
                    }}
                  >            
                    {/* Recorremos las películas de esta diapositiva */}
                    {grupoPeliculas.map((p, i) => (
                      <img
                        key={p.id || i} // key única (preferimos id, sino índice)
                        src={p.poster} // URL del póster de la película
                        // data-publicado permite ocultar con CSS (img[data-publicado="false"])
                        data-publicado={String(p.publicado)} // Convertimos boolean a string
                        className="imgage-slider"
                        style={{
                          // Tamaño adaptativo según ancho de ventana
                          width: windowWidth < 600 ? "60vw" : "250px",
                          height: windowWidth < 600 ? "250px" : "auto",
                          objectFit: "cover", // La imagen cubre el espacio sin deformarse
                          flex: "0 0 auto",    // No crece ni encoge en flexbox
                        }}
                        alt={p.titulo} // Texto alternativo para accesibilidad
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botón para ir a la diapositiva anterior */}
          {/* data-bs-target debe coincidir con el id del carousel */}
          <button
            className="carousel-control-prev d-flex justify-content-start"
            type="button"
            data-bs-target={`#${categoria.id}`} // Apunta al carousel de esta categoría
            data-bs-slide="prev" // Le dice a Bootstrap que retroceda
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          {/* Botón para ir a la siguiente diapositiva */}
          <button
            className="carousel-control-next d-flex justify-content-end"
            type="button"
            data-bs-target={`#${categoria.id}`} // Apunta al carousel de esta categoría
            data-bs-slide="next" // Le dice a Bootstrap que avance
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    );
  };

  // Renderizamos todas las categorías, cada una con su propio carousel
  return <div>{categorias.map(renderCategoria)}</div>;
}

export default Sliders;