import {Route, Switch} from "react-router-dom";
import About from "../pages/About";
import HowToPlay from "../pages/HowToPlay";
import CreateGame from "../pages/CreateGame";
import JoinGame from "../pages/JoinGame";
import React from "react";
import HostWaitingRoom from "../pages/HostWaitingRoom";
import Question from "../pages/Question";
import WaitingRoom from "../pages/WaitingRoom";
import {Home} from "../pages/Home";
import Scores from "../pages/Scores";
import QuestionMatch from "../pages/QuestionMatch";
import EndGame from "../pages/EndGame";
import ProductPage from "../pages/ProductPage";

export const Content = () => {
    return (
        <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/about"><About/></Route>
            <Route path="/howToPlay"><HowToPlay/></Route>
            <Route path="/waitingroom" component={WaitingRoom}/>
            <Route path="/creategame" component={CreateGame} />
            <Route path="/joingame" component={JoinGame} />
            <Route path="/hostwaitingroom" component={HostWaitingRoom} />
            <Route path="/question" component={Question} />
            <Route path="/questionmatch" component={QuestionMatch} />
            <Route path="/scores" component={Scores} />
            <Route path="/endgame" component={EndGame} />
            <Route path="/productpage" component={ProductPage} />
        </Switch>
    );
};
