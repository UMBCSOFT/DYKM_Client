import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import Header from "./Header";
import {Content} from "./utility/Content.js";
import {BrowserRouter} from "react-router-dom";
const initialContent = `<!DOCTYPE html><html><head>${[].slice.call(document.head.getElementsByTagName("style")).map(x => x.outerHTML).join('')}</head><body><div></div></body></html>`;
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
