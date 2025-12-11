import { useContext } from "react";
import { UserContext } from "../contexto/ContextoBD";
import App from "../App";

const HomeScreen = () => {
  const contexto = useContext(UserContext)
  return <div>{contexto}</div>;
  <App />
};

export default HomeScreen;