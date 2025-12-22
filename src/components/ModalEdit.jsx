import React from 'react'
import { UserContext } from '../contexto/ContextoBD';
import  { use, useContext, useState } from 'react'


export default function ModalEdit() {
   

 const { user, actualizarPelicula } = useContext(UserContext);

 

   // 1. Estado inicial para el objeto de 4 propiedades
  const [datos, setDatos] = useState({
    titulo: '',
    anio: '',
    descripcion: '',
    publicado: false,
    poster: "./src/assets/sinimagen.png"
  
  });

  // 2. Manejador de cambios para actualizar el estado
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y el valor del input
    // Actualiza el estado usando la propiedad computada de ES6
    setDatos(prevDatos => ({
      ...prevDatos, // Mantiene las otras propiedades
      [name]: value // Actualiza la propiedad correspondiente
    }));
  };

  // 3. Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto (recargar página)
    console.log('Datos enviados:', datos);
    // Aquí puedes enviar los datos a una API, guardarlos, etc.
    // Opcionalmente, resetea el formulario:
    setDatos({ titulo: '', anio: '', descripcion: '', publicado: false });
  };

    
   
   
   
   
  return (
    <>
  
<button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Nueva Pelicula
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className=" modal-dialog modal-dialog-centered">
    <form className="modal-content bg-dark" onSubmit={handleSubmit}>
      <div className="modal-header text-light">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar/Editar</h1>
      </div>
      <div className="modal-body">
       <div>
       <div className="mb-3">
        <label htmlFor="nombrePelicula" className="form-label text-light">Nombre</label>
        <input type="text" className="form-control" id="nombrePelicula" name='titulo' value={datos.titulo} onChange={handleChange}/>
        </div>
        <div className="mb-3">
        <label htmlFor="añoPelicula" className="form-label text-light">Año</label>
        <input type="text" className="form-control" id="añoPelicula" name='anio' value={datos.anio} onChange={handleChange}/>
        </div>
         <div className="mb-3">
         <label htmlFor="exampleInputPassword1" className="form-label text-light">Categoria</label>
        <select className="form-select"aria-label="Default select example" id="rol" name='categoria'>

            <option value="">Selecciona un puesto</option>
            <option value="Terror">Terror</option>
            <option value="Comedia">Comedia</option>
            <option value="Ciencia Ficcion">Ciencia Ficcion</option>
        </select>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label text-light">Descripcion</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" maxLength={200}style={{resize:'none'}} ></textarea>
        </div>
       <div className="mb-3 form-check">
       <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
       <label className="form-check-label text-light" htmlFor="exampleCheck1" >Publicado</label>
       </div>
      
     </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</div>

    </>
    
  )
}
