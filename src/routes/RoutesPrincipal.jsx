import { Route, Routes } from "react-router-dom"
import PagesLayout from "../layout/PagesLayout"
import HomeScreen from "../views/Homescreen"
import Error404Screen from "../views/Error404Screen"
import AdminScreen from "../views/AdminScreen"
import ListaDePeliculas from "../components/ListaDePeliculas"
import { RutaProtegida } from "../components/ProtectedRoute"

const RoutesPrincipal = () => {
    return (
        <Routes>
            <Route path="/" element={<PagesLayout />}>
                <Route index element={<HomeScreen />} /> 
                
                {/* Ruta protegida: /peliculas - solo accesible si está autenticado */}
                <Route 
                    path="peliculas" 
                    element={
                        <RutaProtegida>
                            <ListaDePeliculas soloFavoritos={true} />
                        </RutaProtegida>
                    } 
                />
                
                {/* Ruta protegida: /Admin - solo accesible si está autenticado */}
                <Route 
                    path="Admin" 
                    element={
                        <RutaProtegida>
                            <AdminScreen />
                        </RutaProtegida>
                    } 
                />
            </Route>
            
            {/* Cualquier ruta no definida muestra error 404 */}
            <Route path="*" element={<Error404Screen />} />
        </Routes>
    )
}

export default RoutesPrincipal;