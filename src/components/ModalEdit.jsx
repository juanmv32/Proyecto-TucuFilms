import React from 'react'
import { UserContext } from '../contexto/ContextoBD';
import  { use, useContext, useState } from 'react'

export default function ModalEdit() {
   

 const { user, actualizarPelicula } = useContext(UserContext);

 

 console.log(user[0])

const [datosPelicula, setdatosPelicula] = useState({  id: "",titulo: "", anio: 0, descripcion: "", publicado: false, poster: ""});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setdatosPelicula({ ...datosPelicula, [name]: value }); // Actualiza el estado
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Previene recarga de página
  //   console.log('Datos del formulario:', datosPelicula); // Aquí tienes tu objeto
  // };

    
   
   
   
   
  return (
    <>
   
<button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Nueva Pelicula
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className=" modal-dialog modal-dialog-centered">
    <form className="modal-content bg-dark">
      <div className="modal-header text-light">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar/Editar</h1>
      </div>
      <div className="modal-body">
       <div>
       <div className="mb-3">
        <label htmlFor="nombrePelicula" className="form-label text-light">Nombre</label>
        <input type="text" className="form-control" id="nombrePelicula"/>
        </div>
        <div className="mb-3">
        <label htmlFor="añoPelicula" className="form-label text-light">Año</label>
        <input type="text" className="form-control" id="añoPelicula"/>
        </div>
         <div className="mb-3">
         <label htmlFor="exampleInputPassword1" className="form-label text-light">Categoria</label>
        <select className="form-select"aria-label="Default select example" id="rol">

            <option value="">Selecciona un puesto</option>
            <option value="Terror">Terror</option>
            <option value="Comedia">Comedia</option>
            <option value="Ciencia Ficcion">Ciencia Ficcion</option>
        </select>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label text-light">Descripcion</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" maxLength={200}style={{resize:'none'}}></textarea>
        </div>
       <div className="mb-3 form-check">
       <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
       <label className="form-check-label text-light" htmlFor="exampleCheck1">Publicado</label>
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
