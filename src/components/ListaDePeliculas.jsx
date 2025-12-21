import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexto/ContextoBD';

export default function ListaDePeliculas() {

// iconos de bootstrap 
const basurero = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>;
const estrellitaVacia = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>;
const estrellitaLlena = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>;
const lapizNota = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>;

// Obtenemos los datos del contexto para tener acceso centralizado y compartido entre componentes
const { user, actualizarPelicula, categorias } = useContext(UserContext);

// Usamos spread operator para crear una copia y evitar mutar el array original directamente
const cambiarPublicado =(id)=>{
     const listaPelis = [...user]
     const index = listaPelis.findIndex((peli)=> peli.id === id)
     // Invertimos el valor booleano para alternar entre publicado/oculto
     listaPelis[index].publicado = !listaPelis[index].publicado 
     // Llamamos a actualizarPelicula para persistir en localStorage y actualizar el slider
     actualizarPelicula(listaPelis)
}

// Misma lógica que cambiarPublicado pero para el campo favorito
const cambiarFavorito = (id) => {
     const listaPelis = [...user]
     const index = listaPelis.findIndex((peli)=> peli.id === id)
     listaPelis[index].favorito = !listaPelis[index].favorito
     actualizarPelicula(listaPelis)
}

// Recibe la nueva descripción como parámetro porque viene del input del usuario
const cambiarDescripcion = (id, nuevaDescripcion) => {
     const listaPelis = [...user]
     const index = listaPelis.findIndex((peli)=> peli.id === id)
     listaPelis[index].descripcion = nuevaDescripcion
     actualizarPelicula(listaPelis)
}

// Creamos estado local para mantener sincronizada la tabla con los cambios del contexto
const [lista, setLista] = useState(user);

// useEffect se dispara cuando 'user' cambia, manteniendo la tabla actualizada
useEffect(() => {
  setLista(user);
}, [user]);

// Componente separado para cada fila - facilita la reutilización y organización del código
function  FilaDeTable({items}){
 const {id, titulo, categoriaId, descripcion, publicado, favorito} = items
 // Buscamos el nombre de categoría porque el JSON solo tiene el ID de referencia
 const categoria = categorias.find(cat => cat.id === categoriaId)?.titulo || 'Sin categoría';
 // Estado local para controlar el modo edición sin afectar otras filas
 const [editando, setEditando] = useState(false);
 // Estado separado para la nueva descripción para poder cancelar cambios si no se guarda
 const [nuevaDescripcion, setNuevaDescripcion] = useState(descripcion);

 // Guardamos al perder foco o presionar Enter para mejorar la experiencia del usuario
 const guardarDescripcion = () => {
   cambiarDescripcion(id, nuevaDescripcion);
   setEditando(false);
 }

  return(
    <tr>
            <td>{id}</td>
            <td>{titulo}</td>
            <td>{categoria}</td>
            <td>
              {/* Renderizado condicional: input en modo edición, texto normal en modo lectura */}
              {editando ? (
                <input 
                  type="text" 
                  className="form-control" 
                  value={nuevaDescripcion}
                  onChange={(e) => setNuevaDescripcion(e.target.value)}
                  onBlur={guardarDescripcion}
                  onKeyPress={(e) => e.key === 'Enter' && guardarDescripcion()}
                  autoFocus
                />
              ) : descripcion}
            </td>
            {/* onChange en lugar de onClick porque es el evento correcto para checkboxes */}
            <td><input type="checkbox" checked={publicado} onChange={()=>cambiarPublicado(id)}></input></td>
            <td className='d-flex justify-content-around'>
              <span>{basurero}</span>
              {/* onClick para activar edición y cursor pointer para indicar que es clickeable */}
              <span onClick={() => setEditando(true)} style={{cursor: 'pointer'}}>{lapizNota}</span>
              {/* Renderizado condicional de estrella llena/vacía según el estado de favorito */}
              <span onClick={()=>cambiarFavorito(id)} style={{cursor: 'pointer'}}>{favorito ? estrellitaLlena : estrellitaVacia}</span>
            </td>
        </tr>
  )
}

  return (
    <div className="container mt-3">
  <h2>Lista de Peliculas</h2>          
  <table className="table table-striped text-center">
    <thead>
      <tr className='bg-secondary'>
        <th className='bg-secondary'>ID</th>
        <th className='bg-secondary'>Pelicula</th>
        <th className='bg-secondary'>Categoria</th>
        <th className='bg-secondary'>Descripcion</th>
        <th className='bg-secondary'>Publicado</th>
        <th className='bg-secondary'>Acciones</th>
      </tr>
     </thead>
     <tbody>
      {lista.map((item)=>(
        <FilaDeTable key={item.id} items={item}/>
      ))}  
    </tbody>
    </table>
   </div>
  )
}
