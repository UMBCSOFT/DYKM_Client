import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import HowToPlay from "../pages/HowToPlay";
import React from "react";
import Question from "../pages/Question";
import Home from "../pages/Home";
import Scores from "../pages/Scores";
import QuestionMatch from "../pages/QuestionMatch";
import EndGame from "../pages/EndGame";
import ProductPage from "../pages/ProductPage";
import CreateGame from "../pages/CreateGame";
import JoinGame from "../pages/JoinGame";
import HostWaitingRoom from "../pages/HostWaitingRoom";
import WaitingRoom from "../pages/WaitingRoom";
import NetworkedPage from "./NetworkedPage";

class Content extends NetworkedPage {

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="home?" element={<Home/>}>
                        <Route path="waitingroom" element={<WaitingRoom/>}/>
                        <Route path="hostwaitingroom" element={<HostWaitingRoom/>} />
                        <Route path="creategame" element={<CreateGame/>} />
                        <Route path="joingame" element={<JoinGame/>} />
                    </Route>
                    <Route path="page?">
                        <Route path="about" element={<About/>}/>
                        <Route path="howToPlay" element={<HowToPlay/>}/>
                        <Route path="question" element={<Question/>} />
                        <Route path="questionmatch" element={<QuestionMatch/>} />
                        <Route path="scores" element={<Scores/>} />
                        <Route path="endgame" element={<EndGame/>} />
                        <Route path="productpage" element={<ProductPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    };
}

export default Content;
