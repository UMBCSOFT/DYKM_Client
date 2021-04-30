import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import Header from "./Header";
import {Content} from "./utility/Content";
import {BrowserRouter} from "react-router-dom";
import Frame from 'react-frame-component';
const initialContent = `<!DOCTYPE html><html><head>${[].slice.call(document.head.getElementsByTagName("style")).map(x => x.outerHTML).join('')}</head><body><div></div></body></html>`;
function App() {
    return (
        <Frame initialContent={initialContent} frameBorder="0" id={"Frame"}>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Content/>
                </div>
            </BrowserRouter>
        </Frame>
);
}

export default App;
