import React, { useState, useEffect, useContext } from 'react'
import movieData from '../../assets/data/movie.json';
import { MovieContext } from '../../contexto/ContextoBD';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Carousel.css';

function Sliders() {
  // --- Datos ---
  // Importamos el JSON de películas y lo transformamos a una estructura
  // simple `categorias` que contiene `id`, `titulo` e `imagenes` (array de URLs).
  // Esto facilita el renderizado del carousel, ya que el componente espera
  // una lista de categorías cada una con una lista de imágenes.
  // También protegemos el acceso en caso de que `movieData` sea undefined.
  // --- Datos ---
  // Preferimos tomar las categorías desde el contexto si está disponible
  // (su valor tiene la forma { categorias, loading, error }). Si no existe
  // el contexto, caemos al JSON importado `movieData`.
  const contextValue = useContext(MovieContext);
  const rawCategorias =
    contextValue && Array.isArray(contextValue.categorias)
      ? contextValue.categorias
      : movieData && Array.isArray(movieData.categorias)
      ? movieData.categorias
      : [];

  // Normalizamos la estructura para que cada categoría tenga `imagenes` (URLs)
  const categorias = rawCategorias.map((cat) => ({
    id: cat.id,
    titulo: cat.titulo,
    imagenes: (cat.peliculas || []).map((p) => p.poster),
  }));

  // Estado para forzar re-render al cambiar tamaño de ventana
  // --- Resizing / re-render ---
  // Mantenemos el ancho de ventana en el estado para que el componente
  // vuelva a renderizar cuando cambie el tamaño y pueda recalcular
  // cuántas imágenes mostrar por diapositiva.
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    // Debounce simple: evitamos muchos renders durante el resize
    let timeoutId = null;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWindowWidth(window.innerWidth), 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

// --- Lógica de retorno de imágenes por diapositiva ---
// Dependiendo del ancho, devolvemos cuántas imágenes deben aparecer
// en cada 'carousel-item'. Esto se usa para agrupar las imágenes en
// diapositivas y evitar que haya demasiado contenido en pantallas pequeñas.
const obtenerCantidadImagenes = (ancho = windowWidth) => {
  if (ancho < 480) return 1;      // Celular chico
  if (ancho < 768) return 2;      // Celular grande / tablet chica
  if (ancho < 1024) return 3;     // Tablet grande

  return 7; // Monitores grandes
};
  const renderCategoria = (categoria) => {
    const imagenesPorDiapositiva = obtenerCantidadImagenes();
    const totalDiapositivas = Math.ceil(categoria.imagenes.length / imagenesPorDiapositiva);

    return (
      <div key={categoria.id} className="mb-5 text-center">
        <h2 className="mb-2">{categoria.titulo}</h2>

        {/*
          - Contenedor principal del carousel: el `id` se usa como `data-bs-target`
            para los botones prev/next. `data-bs-touch` permite arrastre táctil.
          - Dentro está `.carousel-inner` que contiene una serie de `.carousel-item`.
        */}
        <div id={categoria.id} className="carousel slide" data-bs-touch="true">
          <div className="carousel-inner">
            {Array.from({ length: totalDiapositivas }).map((_, indice) => {
              const inicio = indice * imagenesPorDiapositiva;
              const fin = inicio + imagenesPorDiapositiva;
              const grupoImagenes = categoria.imagenes.slice(inicio, fin);

              return (
                <div
                  key={indice}
                  // La primera diapositiva debe tener clase `active` para que
                  // Bootstrap la muestre inicialmente.
                  className={`carousel-item ${indice === 0 ? "active" : ""}`}
                >
                  {/*
                    Cada `.carousel-item` contiene un contenedor flex que muestra
                    `imagenesPorDiapositiva` imágenes (o menos en la última diapositiva).
                    Se usa `flex: 0 0 auto` en las imágenes para que no se encojan
                    y mantengan su ancho definido.
                  */}
                  <div
                    className="d-flex justify-content-center gap-3 p-2"
                    style={{
                      minHeight: "180px",
                    }}
                  >            
                    {grupoImagenes.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="imgage-slider"
                        style={{
                          // Usamos `windowWidth` del estado para que al cambiar
                          // el tamaño de ventana las dimensiones se actualicen.
                          width: windowWidth < 600 ? "60vw" : "250px",
                          height: windowWidth < 600 ? "250px" : "auto",
                          objectFit: "cover",
                          flex: "0 0 auto",
                        }}
                        alt={categoria.titulo}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="carousel-control-prev d-flex justify-content-start"
            type="button"
            data-bs-target={`#${categoria.id}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next d-flex justify-content-end"
            type="button"
            data-bs-target={`#${categoria.id}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    );
  };

  return <div>{categorias.map(renderCategoria)}</div>;
}

export default Sliders;