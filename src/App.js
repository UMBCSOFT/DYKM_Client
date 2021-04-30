import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import Header from "./Header";
import {Content} from "./utility/Content";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Content/>
            </div>
        </BrowserRouter>
);
}

export default App;
