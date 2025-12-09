import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Carousel.css';
// Importar useContext para obtener datos desde el contexto


function Sliders() {
// Obtener categorias desde el context en lugar de la constante local
  const { categorias, loading, error } = useContext(""); // Reemplaza "" con el contexto adecuado

  if (loading) return <div>Cargando sliders...</div>;
  if (error) return <div>Error cargando datos.</div>;
  if (!categorias || categorias.length === 0) return <div>No hay categorías para mostrar.</div>;

// Función para decidir cuántas imágenes mostrar según el tamaño de pantalla
const obtenerCantidadImagenes = () => {
  const ancho = window.innerWidth; 

  if (ancho < 480) return 1;      // Celular chico
  if (ancho < 768) return 2;      // Celular grande / tablet chica
  if (ancho < 1024) return 3;     // Tablet grande

  return 7; // Monitores grandes
};
  const renderCategoria = (categoria) => {

    // Cantidad de imágenes según el dispositivo
    const imagenesPorDiapositiva = obtenerCantidadImagenes();

    const totalDiapositivas = Math.ceil(
      categoria.imagenes.length / imagenesPorDiapositiva
    );

    return (
      <div key={categoria.id} className="mb-5 text-center">
        <h2 className="mb-2">{categoria.titulo}</h2>

        <div id={categoria.id} className="carousel slide" data-bs-touch="true">
          <div className="carousel-inner">

            {Array.from({ length: totalDiapositivas }).map((x , indice) => {
              const inicio = indice * imagenesPorDiapositiva;
              const fin = inicio + imagenesPorDiapositiva;
              const grupoImagenes = categoria.imagenes.slice(inicio, fin);

              return (
                <div
                  key={indice}
                  className={`carousel-item ${indice === 0 ? "active" : ""}`}
                >
                              {/* Estilos y llamados a para el carousel*/}
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
                          width: window.innerWidth < 600 ? "60vw" : "250px",
                          height: window.innerWidth < 600 ? "250px" : "auto",
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
};

export default Sliders;