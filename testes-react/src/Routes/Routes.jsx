import { Route, Routes } from "react-router-dom";
import Home from "../Pages/home/Home";
import Register from "../Pages/Register/Register";
import Admin from "../Pages/Admin/Admin"
import Private from "./Private";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/Admin" element={ <Private> <Admin /> </Private>} />
        </Routes>
    )
}

export default RoutesApp