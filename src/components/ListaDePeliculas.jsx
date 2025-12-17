import React, { use, useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexto/ContextoBD';
export default function ListaDePeliculas() {

// aqui coloco los iconos que he traido de bootstrap 
const basurero = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>;
const estrellitaVacia = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>;
const estrellitaLlena = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>;
const lapizNota = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>;

// const contexto = useContext(UserContext)
const { user, actualizarPelicula } = useContext(UserContext);

//array de objetos que despues sera borrado
// const peliculas = [
//   { id: 1, pelicula: "Solaris", categoria: "Drama", descripcion: "Viaje", publicado: true,  favorito: false },
//   { id: 2, pelicula: "Nebula", categoria: "Accion", descripcion: "Lucha", publicado: false, favorito: true  },
//   { id: 3, pelicula: "Eclipse", categoria: "Terror", descripcion: "Miedo", publicado: true,  favorito: true  },
//   { id: 4, pelicula: "Orion",  categoria: "SciFi",  descripcion: "Futuro", publicado: false, favorito: false },
//   { id: 5, pelicula: "Raptor", categoria: "Aventura", descripcion: "Selva", publicado: true,  favorito: false },
//   { id: 6, pelicula: "Titan",  categoria: "Drama", descripcion: "Destino", publicado: false, favorito: true  },
//   { id: 7, pelicula: "Phoenix", categoria: "Accion", descripcion: "Venganza", publicado: true, favorito: false },
//   { id: 8, pelicula: "Quasar", categoria: "SciFi", descripcion: "Energia", publicado: false, favorito: true },
//   { id: 9, pelicula: "Mirage", categoria: "Comedia", descripcion: "Risa", publicado: true, favorito: true },
//   { id: 10, pelicula: "Blazer", categoria: "Terror", descripcion: "Oscuro", publicado: false, favorito: false }
// ];
const cambiarPublicado =(id)=>{
     const listaPelis = [...user]
     const index = listaPelis.findIndex((peli)=>{
        return peli.id === id
     })
     listaPelis[index].publicado = !listaPelis[index].publicado 
     actualizarPelicula(listaPelis)
    // console.log(listaPelis[index])
     
}




// aqui voy a definir las funcionalidades del componente
//estado para el array de objetos 
const [lista, setLista] = useState(user);


// la funcion de favoritos
function  FilaDeTable({items}){
     
 const {id,pelicula,categoria,descripcion,publicado,favorito} = items
//  const [favoritos,setFavoritos] = useState(favorito)
//  const [publicados,setPublicados] = useState(publicado)


const meGusta = ()=>{
  setPublicados(!publicado)
}

const actualizarPublicado =()=>{
  const nuevosDatos = {
     ...items
  }
  nuevosDatos.publicado = !nuevosDatos.publicado
  console.log(nuevosDatos)
}


  return(
    <tr key={id}>
            <td>{id}</td>
            <td>{pelicula}</td>
            <td>{categoria}</td>
            <td>{descripcion}</td>
            <td><input type="checkbox" id="miCheckbox" value="valor1" checked={publicado} onClick={()=>cambiarPublicado(id)}></input></td>
            <td className='d-flex justify-content-around'><span>{basurero}</span><span>{lapizNota}</span><div onClick={meGusta}>{favorito?estrellitaLlena:estrellitaVacia}</div></td>
        </tr>
  )
}
  return (
    <div class="container mt-3">
  <h2>Lista de Peliculas</h2>          
  <table class="table table-striped text-center">
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
        <FilaDeTable items = {item}/>
      ))}  
    </tbody>
    </table>
   </div>
  )
}
