import { Route, Routes } from "react-router-dom"
import PagesLayout from "../layout/PagesLayout"
import HomeScreen from "../views/Homescreen"
import Error404Screen from "../views/Error404Screen"
import AdminScreen from "../views/AdminScreen"

const RoutesPrincipal = () => {
    return (
        <Routes>
            <Route path="/" element={<PagesLayout />}>
                <Route index element={<HomeScreen />} /> 
                <Route path="Admin" element={<AdminScreen/>} />   
            </Route>
            <Route path="*" element={<Error404Screen />} />
        </Routes>
    )
}

export default RoutesPrincipal;