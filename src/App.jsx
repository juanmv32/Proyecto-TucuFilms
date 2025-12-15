import { BrowserRouter } from "react-router-dom";
import RoutesPrincipal from "./routes/RoutesPrincipal";
import NavBarApp from "./components/NavbarApp";
import { UseProvider } from "./contexto/ContextoBD";
import ListaDePeliculas from "./components/ListaDePeliculas";



const App = () => {
  return (
    <BrowserRouter>
      <ListaDePeliculas/>
    </BrowserRouter>
  )
}

export default App