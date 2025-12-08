import { BrowserRouter } from "react-router-dom";
import RoutesPrincipal from "./routes/RoutesPrincipal";
import NavBarApp from "./components/NavbarApp";
import { UseProvider } from "./contexto/ContextoBD";
import HomeScreen from "./views/Homescreen";


const App = () => {
  return (
    <BrowserRouter>
      <RoutesPrincipal/>
    </BrowserRouter>
  )
}

export default App