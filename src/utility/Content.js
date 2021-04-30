import {Route, Switch} from "react-router-dom";
import About from "../pages/About";
import HowToPlay from "../pages/HowToPlay";
import CreateGamePage from "../pages/CreateGame";
import JoinGamePage from "../pages/JoinGame";
import React from "react";
import HostWaitingRoomPage from "../pages/HostWaitingRoom";
import QuestionMatch from "../pages/QuestionMatch";
import Question from "../pages/Question";
import WaitingRoom from "../pages/WaitingRoom";
import Scores from "../pages/Scores"
import {Home} from "../pages/Home";

export const Content = () => {
    return (
        <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/about"><About/></Route>
            <Route path="/howToPlay"><HowToPlay/></Route>
            <Route path="/waitingroom"><WaitingRoom/></Route>
            <Route path="/creategame" component={CreateGamePage} />
            <Route path="/joingame" component={JoinGamePage} />
            <Route path="/hostwaitingroom" component={HostWaitingRoomPage} />
            <Route path="/question"><Question/></Route>
            <Route path="/questionMatch"><QuestionMatch/></Route>
            <Route path="/scores"><Scores/></Route>
        </Switch>
    );
};
