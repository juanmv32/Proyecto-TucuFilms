import { useContext } from "react";
import { UserContext } from "../contexto/ContextoBD";
import Sliders from "../components/slider/Sliders";

// HomeScreen: renderiza el slider principal usando las películas del JSON
const HomeScreen = () => {
  const { categorias, loading, error } = useContext(UserContext);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error cargando categorías.</div>;

  return (
    <div>
      <Sliders />
    </div>
  );
};

export default HomeScreen;