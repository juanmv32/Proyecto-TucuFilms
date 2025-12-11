import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Carousel.css';
import peliculasData from '../../assets/data/peliculas.json';

function Sliders() {
  const categorias = peliculasData.categorias;
  const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

  useEffect(() => {
    const redimensionado = () => {
      setAnchoVentana(window.innerWidth);
    };

    window.addEventListener('resize', redimensionado);
    return () => window.removeEventListener('resize', redimensionado);
  }, []);

  const obtenerCantidadImagenes = () => {
    if (anchoVentana < 480) return 1;
    if (anchoVentana < 768) return 2;
    if (anchoVentana < 1024) return 3;
    if (anchoVentana < 1200) return 4;
    return 7;
  };

  const renderCategoria = (categoria) => {
    const imagenesPorDiapositiva = obtenerCantidadImagenes();
    const totalDiapositivas = Math.ceil(categoria.imagenes.length / imagenesPorDiapositiva);

    return (
      <div key={categoria.id} className="mb-5 text-center">
        <h2 className="mb-2">{categoria.titulo}</h2>

        <div id={categoria.id} className="carousel slide" data-bs-touch="true">
          <div className="carousel-inner">
            {Array.from({ length: totalDiapositivas }).map((_, indice) => {
              const inicio = indice * imagenesPorDiapositiva;
              const fin = inicio + imagenesPorDiapositiva;
              const grupoImagenes = categoria.imagenes.slice(inicio, fin);

              return (
                <div
                  key={indice}
                  className={`carousel-item ${indice === 0 ? "active" : ""}`}
                >
                  <div
                    className="d-flex justify-content-center gap-3 p-2"
                    style={{ minHeight: "180px" }}
                  >
                    {grupoImagenes.map((pelicula, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <img
                          src={pelicula.url}
                          className="imgage-slider"
                          style={{
                            width: anchoVentana < 600 ? "60vw" : "250px",
                            height: anchoVentana < 600 ? "250px" : "auto",
                            objectFit: "cover",
                            flex: "0 0 auto",
                          }}
                          alt={pelicula.titulo}
                        />
                      </div>
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