import { BrowserRouter } from "react-router-dom";
import RoutesPrincipal from "./routes/RoutesPrincipal";
import NavBarApp from "./components/NavbarApp";
import { UseProvider } from "./contexto/ContextoBD";
import ListaDePeliculas from "./components/ListaDePeliculas";
import ModalEdit from "./components/ModalEdit";



const App = () => {
  return (
    <BrowserRouter>
      <ModalEdit/>
    </BrowserRouter>
  )
}

export default App