import { createContext, useState } from "react";
// aqui inicializamos la variable UserContext que sera importada en cada componente que necesite acceder al contexto
export const UserContext =  createContext(null);

 export const UseProvider = ({children})=>{
     
     const [user,setUser] = useState("Este es el CONTEXTO")

     return(
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
     )
}