import {BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import HowToPlay from "../pages/HowToPlay";
import React from "react";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import CreateGame from "../pages/CreateGame";
import JoinGame from "../pages/JoinGame";
import Game from "../pages/Game";
import { DYKMProvider } from "../pages/DYKM_Networking";

function Content() {
    return (
        <DYKMProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="home?" element={<Home/>}>
                        <Route path="creategame" element={<CreateGame/>} />
                        <Route path="joingame" element={<JoinGame/>} />
                    </Route>
                    <Route path="page?">}>
                        <Route path="about" element={<About/>}/>
                        <Route path="howToPlay" element={<HowToPlay/>}/>
                        <Route path="productpage" element={<ProductPage/>} />
                        <Route path="game" element={<Game/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </DYKMProvider>
    );
};

export default Content;
