import { BrowserRouter } from "react-router-dom";
import RoutesPrincipal from "./routes/RoutesPrincipal";
import NavBarApp from "./components/NavbarApp";
import { UseProvider } from "./contexto/ContextoBD";



const App = () => {
  return (
    <BrowserRouter>
      <RoutesPrincipal/>
    </BrowserRouter>
  )
}

export default App