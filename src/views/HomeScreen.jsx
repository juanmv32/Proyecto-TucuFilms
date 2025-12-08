import { useContext } from "react";
import { UserContext } from "../contexto/ContextoBD";


const HomeScreen = () => {
  const contexto = useContext(UserContext)
  return <div>{contexto}</div>;
};

export default HomeScreen;