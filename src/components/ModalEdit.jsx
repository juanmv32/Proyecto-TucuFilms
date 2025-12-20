import React from 'react'

export default function ModalEdit() {
  return (
    <>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className=" modal-dialog modal-dialog-centered">
    <div className="modal-content bg-dark">
      <div className="modal-header text-light">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar/Editar</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <form>
       <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label text-light">Nombre</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
         <div className="mb-3">
         <label for="exampleInputPassword1" className="form-label text-light">Categoria</label>
        <select className="form-select"aria-label="Default select example" id="rol">

            <option selected value="">Selecciona un puesto</option>
            <option value="Programador/a">Terror</option>
            <option value="Ingeniero/a">Comedia</option>
            <option value="Tester">Tester</option>
            <option value="Otro">Otro</option>

        </select>
        </div>
        <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label text-light">Descripcion</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" maxLength={200}style={{resize:'none'}}></textarea>
        </div>
       <div className="mb-3 form-check">
       <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
       <label className="form-check-label text-light" for="exampleCheck1">Publicado</label>
       </div>
      <button type="submit" className="btn btn-primary">Submit</button>
     </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    </>
    
  )
}
