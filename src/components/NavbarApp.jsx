import { useState, useContext } from 'react';
import { MovieContext } from "../contexto/ContextoBD";

const NavBarApp = () => {
  const { categorias, loading, error } = useContext(MovieContext);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error cargando categorías.</div>;

};

export default NavBarApp;