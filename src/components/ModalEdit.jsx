import React, { useContext, useState } from 'react';
import { UserContext } from '../contexto/ContextoBD';

// --- 1. CLASE (CONSTRUCTOR) ---
// Definimos el "molde" fuera del componente para ordenar el código
class Pelicula {
  constructor(id, titulo, anio, categoria, descripcion, publicado) {
    this.id = id;
    this.titulo = titulo;
    this.anio = anio;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.publicado = publicado;
    this.poster = "./src/assets/sinimagen.png"; // Imagen por defecto
  }
}

export default function ModalEdit() {
  
  // Necesitamos 'categorias' y 'setCategorias' del contexto para poder calcular el ID y guardar
  const { categorias, setCategorias } = useContext(UserContext);

  // 2. Estado inicial
  const [datos, setDatos] = useState({
    titulo: '',
    anio: '',
    categoria: '', // Agregamos este campo que faltaba en tu estado inicial
    descripcion: '',
    publicado: false,
    poster: "./src/assets/sinimagen.png"
  });

  // 3. Manejador de cambios (CORREGIDO para Checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; 
    
    setDatos(prevDatos => ({
      ...prevDatos,
      // Si es checkbox usa 'checked', si es otro usa 'value'
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // 4. Manejador de envío (Lógica del Switch + Constructor)
  const handleSubmit = (e) => {
    e.preventDefault();

    // A. Lógica del Switch para definir prefijo y dónde guardar
    let prefijo = "";
    let idCategoriaBuscada = "";

    switch (datos.categoria) {
      case "Comedia":
        prefijo = "com";
        idCategoriaBuscada = "cat-comedia";
        break;
      case "Terror":
        prefijo = "ter";
        idCategoriaBuscada = "cat-terror";
        break;
      case "Ciencia Ficcion":
        prefijo = "cf";
        idCategoriaBuscada = "cat-cf";
        break;
      default:
        prefijo = "gen";
        idCategoriaBuscada = "cat-otros";
    }

    // B. Calcular el ID (Buscamos la categoría y contamos sus pelis)
    const categoriaEncontrada = categorias.find(cat => cat.id === idCategoriaBuscada);
    const numeroNuevo = categoriaEncontrada ? categoriaEncontrada.peliculas.length + 1 : 1;
    const idFinal = `${prefijo}-${numeroNuevo}`; // Ejemplo: "com-5"

    // C. Instanciar la Clase (Usar el Constructor)
    const nuevaPeli = new Pelicula(
      idFinal,
      datos.titulo,
      datos.anio,
      datos.categoria,
      datos.descripcion,
      datos.publicado
    );

    console.log('Pelicula creada:', nuevaPeli);

    // D. Guardar en el Contexto
    const categoriasActualizadas = categorias.map((cat) => {
      if (cat.id === idCategoriaBuscada) {
        return {
          ...cat,
          peliculas: [...cat.peliculas, nuevaPeli]
        };
      }
      return cat;
    });

    setCategorias(categoriasActualizadas);

    // E. Limpiar formulario y cerrar modal
    setDatos({ titulo: '', anio: '', categoria: '', descripcion: '', publicado: false, poster: "./src/assets/sinimagen.png" });
    document.getElementById('botonCerrarModal').click(); 
  };

  return (
    <>
      <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Nueva Pelicula
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content bg-dark" onSubmit={handleSubmit}>
            <div className="modal-header text-light">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Película</h1>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div className="modal-body">
              {/* TITULO */}
              <div className="mb-3">
                <label htmlFor="nombrePelicula" className="form-label text-light">Nombre</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nombrePelicula" 
                  name='titulo' 
                  value={datos.titulo} 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* AÑO */}
              <div className="mb-3">
                <label htmlFor="añoPelicula" className="form-label text-light">Año</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="añoPelicula" 
                  name='anio' 
                  value={datos.anio} 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* CATEGORIA (Faltaba conectar value y onChange) */}
              <div className="mb-3">
                <label htmlFor="rol" className="form-label text-light">Categoria</label>
                <select 
                  className="form-select" 
                  id="rol" 
                  name='categoria' 
                  value={datos.categoria} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una opción...</option>
                  <option value="Terror">Terror</option>
                  <option value="Comedia">Comedia</option>
                  <option value="Ciencia Ficcion">Ciencia Ficcion</option>
                </select>
              </div>

              {/* DESCRIPCION */}
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label text-light">Descripcion</label>
                <textarea 
                  className="form-control" 
                  id="exampleFormControlTextarea1" 
                  rows="3" 
                  maxLength={200}
                  style={{resize:'none'}} 
                  name='descripcion' 
                  value={datos.descripcion} 
                  onChange={handleChange} 
                ></textarea>
              </div>

              {/* CHECKBOX (Faltaba name, checked y onChange) */}
              <div className="mb-3 form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="exampleCheck1"
                  name="publicado" 
                  checked={datos.publicado} 
                  onChange={handleChange}
                />
                <label className="form-check-label text-light" htmlFor="exampleCheck1">Publicado</label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="botonCerrarModal">Cerrar</button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}