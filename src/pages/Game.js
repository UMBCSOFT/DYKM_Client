import { useDYKMNetworker, GameStateEnum } from './DYKM_Networking';
import CreateGamePage from './CreateGame';
import HostWaitingRoomPage from './HostWaitingRoom';
import JoinGamePage from './JoinGame';
import WaitingRoomPage from './WaitingRoom';
import QuestionPage from './Question';
import QuestionMatchPage from './QuestionMatch';
import ScoresPage from './Scores';
import EndGamePage from './EndGame';
import { useState, useEffect } from 'react';

function Game(props) {
    const {gameState} = useDYKMNetworker();
    const [localGameState, setLocalGameState] = useState(gameState);
    useEffect(() => {
        setLocalGameState(gameState);
        console.log("Current gamestate:", gameState);
    }, [gameState]);

    switch(localGameState) {
        case GameStateEnum.CreateGame:
            return(<CreateGamePage/>);
        case GameStateEnum.HostWaitingRoom:
            return(<HostWaitingRoomPage/>);
        case GameStateEnum.JoinGame:
            return(<JoinGamePage/>);
        case GameStateEnum.WaitingRoom:
            return(<WaitingRoomPage/>);
        case GameStateEnum.Question:
            return(<QuestionPage/>);
        case GameStateEnum.QuestionMatch:
            return(<QuestionMatchPage/>);
        case GameStateEnum.Scores:
            return(<ScoresPage/>);
        case GameStateEnum.EndGame:
            return(<EndGamePage/>);
        default:
            console.log("HELP ME TASUKETE", gameState, localGameState);
            return(<div/>);
    }
}

export default Game;
