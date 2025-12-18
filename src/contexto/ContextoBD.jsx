import { createContext, useState } from "react";
// aqui inicializamos la variable UserContext que sera importada en cada componente que necesite acceder al contexto
export const UserContext =  createContext(null);

 export const UseProvider = ({children})=>{
const peliculas = [
  { id: 1, pelicula: "Solaris", categoria: "Drama", descripcion: "Viaje", publicado: true,  favorito: false },
  { id: 2, pelicula: "Nebula", categoria: "Accion", descripcion: "Lucha", publicado: false, favorito: true  },
  { id: 3, pelicula: "Eclipse", categoria: "Terror", descripcion: "Miedo", publicado: true,  favorito: true  },
  { id: 4, pelicula: "Orion",  categoria: "SciFi",  descripcion: "Futuro", publicado: false, favorito: false },
  { id: 5, pelicula: "Raptor", categoria: "Aventura", descripcion: "Selva", publicado: true,  favorito: false },
  { id: 6, pelicula: "Titan",  categoria: "Drama", descripcion: "Destino", publicado: false, favorito: true  },
  { id: 7, pelicula: "Phoenix", categoria: "Accion", descripcion: "Venganza", publicado: true, favorito: false },
  { id: 8, pelicula: "Quasar", categoria: "SciFi", descripcion: "Energia", publicado: false, favorito: true },
  { id: 9, pelicula: "Mirage", categoria: "Comedia", descripcion: "Risa", publicado: true, favorito: true },
  { id: 10, pelicula: "Blazer", categoria: "Terror", descripcion: "Oscuro", publicado: false, favorito: false }
];



// localStorage.setItem("peliculas", JSON.stringify(peliculas))

     
     const [user,setUser] = useState(JSON.parse(localStorage.getItem("peliculas")))
  

      const actualizarPelicula = (peliculas)=>{
           setUser(peliculas)
           localStorage.setItem("peliculas", JSON.stringify(peliculas))
      }


     return(
        <UserContext.Provider value={{user, actualizarPelicula}}>{children}</UserContext.Provider>
     )
}