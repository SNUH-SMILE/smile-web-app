import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import Error404 from "./Pages/Error/Error404";
import Login from "./Pages/Login/Login";
import Layouts from "./Layouts/Layouts";
import TitleStore from "./Providers/TitleContext";

function App() {

    return (
        <TitleStore>
            <Routes>
                <Route exact path={'/'} element={<Login/>}/>
                <Route element={<Layouts/>}>
                    <Route exact path={'/treatmentCenter'} element={<treatmentCenter/>}/>
                </Route>
                <Route exact path={'*'} element={<Error404/>}/>
            </Routes>
        </TitleStore>
    );
}

export default App;
