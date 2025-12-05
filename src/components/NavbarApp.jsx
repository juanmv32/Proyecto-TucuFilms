import { useState, createContext, useContext } from 'react';
import { UserContext } from "../contexto/ContextoBD";

const NavBarApp = () => {
    
  const contexto = useContext(UserContext)
  return <div>{contexto}</div>;
};

export default NavBarApp;