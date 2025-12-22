import React, { useContext, useEffect, useState } from 'react'
import { ContextoBD } from '../contexto/ContextoBD';

// Componente principal que muestra una tabla con todas las películas o solo las favoritas
// Este componente es reutilizable: recibe un prop 'soloFavoritos' que cambia su comportamiento
export default function ListaDePeliculas({ soloFavoritos = false }) {

  // Valor por defecto es false, lo que significa que muestra todas las películas

  // ============================================
  // DEFINICIÓN DE ICONOS SVG (Bootstrap Icons)
  // ============================================
  // Cada icono se define como una variable React que contiene un elemento SVG
  // Estos iconos se reutilizan en los botones de acción de la tabla
  
  // Icono de basurero para la acción de eliminar (aunque aún no está implementada)
const basurero = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>;
  
  // Icono de estrella vacía: se muestra cuando una película NO está marcada como favorita
  const estrellitaVacia = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
  </svg>;
  
  // Icono de estrella llena: se muestra cuando una película SÍ está marcada como favorita
  const estrellitaLlena = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg>;
  
  // Icono de lápiz/nota: se muestra para activar el modo edición de la descripción
  const lapizNota = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
  </svg>;

  // ============================================
  // OBTENCIÓN DE DATOS DEL CONTEXTO GLOBAL
  // ============================================
  // useContext permite acceder a los datos compartidos en el ContextoBD
  // peliculas: array con todos los datos de películas
  // actualizarPelicula: función que actualiza las películas en localStorage y en el contexto
  // categorias: array con todas las categorías disponibles
  const { peliculas, actualizarPelicula, categorias } = useContext(ContextoBD);

  // ============================================
  // FUNCIONES PARA MODIFICAR LOS DATOS
  // ============================================

  // Función para alternar el estado "publicado" de una película
  // Lógica: busca la película por ID, invierte el booleano y guarda los cambios
  // Usamos spread operator [...peliculas] para crear una copia y no mutar el array original
  const cambiarPublicado = (id) => {
     const listaPelis = [...peliculas]
     // Encontramos la posición de la película con este ID
     const index = listaPelis.findIndex((peli) => peli.id === id)
     // Invertimos el valor booleano: si era true, ahora es false y viceversa
     listaPelis[index].publicado = !listaPelis[index].publicado
     // Guardamos la lista actualizada (se guarda en localStorage y actualiza el contexto)
     actualizarPelicula(listaPelis)
  }

  // Función para alternar el estado "favorito" de una película (misma lógica que cambiarPublicado)
  // Cuando el usuario hace click en la estrella, esta función invierte el estado favorito
  const cambiarFavorito = (id) => {
     const listaPelis = [...peliculas]
     const index = listaPelis.findIndex((peli) => peli.id === id)
     listaPelis[index].favorito = !listaPelis[index].favorito
     actualizarPelicula(listaPelis)
  }

  // Función para actualizar la descripción de una película
  // Recibe el ID de la película y la nueva descripción que escribió el usuario
  // Se llama cuando el usuario presiona Enter o hace blur en el input de edición
  const cambiarDescripcion = (id, nuevaDescripcion) => {
     const listaPelis = [...peliculas]
     const index = listaPelis.findIndex((peli) => peli.id === id)
     listaPelis[index].descripcion = nuevaDescripcion
     actualizarPelicula(listaPelis)
  }

  // ============================================
  // ESTADO LOCAL DEL COMPONENTE
  // ============================================
  
  // Estado que contiene la lista de películas a mostrar en la tabla
  // Se inicializa filtrando solo las favoritas si soloFavoritos es true
  // Si soloFavoritos es false, inicializa con todas las películas
  const [lista, setLista] = useState(soloFavoritos ? peliculas.filter(peli => peli.favorito) : peliculas);

  // useEffect: se ejecuta cada vez que 'peliculas' o 'soloFavoritos' cambian
  // Esto sincroniza la tabla local con los datos actualizados del contexto
  // Ejemplo: si agregamos una película favorita en otra pantalla, esta tabla se actualiza automáticamente
  useEffect(() => {
    setLista(soloFavoritos ? peliculas.filter(peli => peli.favorito) : peliculas);
  }, [peliculas, soloFavoritos]);

  // ============================================
  // COMPONENTE DENTRO DEL COMPONENTE (FilaDeTable)
  // ============================================
  
  // Este es un sub-componente que representa cada fila de la tabla
  // Lo separamos en su propia función para mejorar la legibilidad y reutilizabilidad
  // Recibe 'items' que contiene los datos de una película
  function FilaDeTable({ items }){
    const { id, titulo, categoriaId, descripcion, publicado, favorito } = items
    
    // Buscamos el NOMBRE de la categoría usando el categoriaId
    // El JSON solo guarda el ID, así que necesitamos buscar el objeto categoría completo
    // Si no encuentra categoría, muestra 'Sin categoría'
    const categoria = categorias.find(cat => cat.id === categoriaId)?.titulo || 'Sin categoría';
    
    // Estado local para saber si estamos en modo edición o modo lectura
    // Cuando el usuario hace click en el lápiz, esto se pone true y mostramos un input
    const [editando, setEditando] = useState(false);
    
    // Estado separado para la nueva descripción
    // Lo mantenemos aparte de 'descripcion' para poder cancelar cambios sin guardar
    // Si el usuario no quiere los cambios, simplemente cierra el input sin llamar a cambiarDescripcion
    const [nuevaDescripcion, setNuevaDescripcion] = useState(descripcion);

    // Función para guardar la descripción editada
    // Se ejecuta cuando el usuario presiona Enter o hace blur (pierde el foco) en el input
    const guardarDescripcion = () => {
      cambiarDescripcion(id, nuevaDescripcion);
      // Volvemos a modo lectura después de guardar
      setEditando(false);
    }

    return(
      <tr>
              <td>{id}</td>
              <td>{titulo}</td>
              <td>{categoria}</td>
              <td>
                {/* Renderizado condicional: 
                    - Si está en modo edición: muestra un input donde el usuario puede cambiar el texto
                    - Si NO está en modo edición: muestra el texto de la descripción sin poder editarlo */}
                {editando ? (
                  <input 
                    type="text" 
                    className="form-control" 
                    value={nuevaDescripcion}
                    // Cada vez que el usuario escribe, actualizamos el estado local
                    onChange={(e) => setNuevaDescripcion(e.target.value)}
                    // Al perder el foco (hacer click fuera), guardamos automáticamente
                    onBlur={guardarDescripcion}
                    // Si presiona Enter, también guardamos
                    onKeyPress={(e) => e.key === 'Enter' && guardarDescripcion()}
                    // autoFocus pone el cursor automáticamente en el input cuando se crea
                    autoFocus
                  />
                ) : descripcion}
              </td>
              {/* Input type="checkbox" con onChange (no onClick) porque es la práctica correcta para checkboxes */}
              <td><input type="checkbox" checked={publicado} onChange={() => cambiarPublicado(id)}></input></td>
              {/* Columna de acciones: cada icono es un botón diferente */}
              <td className='d-flex justify-content-around'>
                {/* Icono de basurero - aún no implementado */}
                <span>{basurero}</span>
                {/* Icono de lápiz: al hacer click, entra en modo edición 
                    style={{cursor: 'pointer'}} indica al usuario que es clickeable */}
                <span onClick={() => setEditando(true)} style={{ cursor: 'pointer' }}>{lapizNota}</span>
                {/* Icono de estrella: muestra estrella llena o vacía según favorito
                    Si favorito es true, muestra estrella llena, sino vacía
                    Al hacer click, invierte el estado con cambiarFavorito() */}
                <span onClick={() => cambiarFavorito(id)} style={{ cursor: 'pointer' }}>{favorito ? estrellitaLlena : estrellitaVacia}</span>
              </td>
          </tr>
    )
  }

  // ============================================
  // RETORNO DEL COMPONENTE (JSX)
  // ============================================
  return (
    <>
      {/* Título dinámico que cambia según el prop soloFavoritos:
          - Si soloFavoritos es true → muestra "Mis Películas Favoritas"
          - Si soloFavoritos es false → muestra "Lista de Peliculas" */}
      <h2>{soloFavoritos ? 'Mis Películas Favoritas' : 'Lista de Peliculas'}</h2>
      
      {/* Contenedor con Bootstrap: 
          - container: ancho máximo responsivo
          - mt-3: margen superior
          - min-vh-100: altura mínima del viewport para que el footer esté al final */}
      <div className="container mt-3 min-vh-100">
        <table className="table table-striped text-center">
          {/* Encabezado de la tabla con fondo gris (bg-secondary) */}
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
     
     {/* Cuerpo de la tabla: renderiza todas las películas de la lista 'lista' */}
     <tbody>
      {/* map() itera sobre cada película en el array 'lista' */}
      {lista.map((item) => (
        /* Renderiza un componente FilaDeTable por cada película
           key={item.id}: ayuda a React a identificar qué filas han cambiado (requerido en listas) */
        <FilaDeTable key={item.id} items={item}/>
      ))}  
    </tbody>
    </table>
   </div>
    </>
  )
}
