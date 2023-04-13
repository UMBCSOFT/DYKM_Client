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
    let CurPage = undefined;
    useEffect(() => {
        setLocalGameState(gameState);
        console.log("Current gamestate:", gameState);
    }, [gameState]);

    switch(localGameState) {
        case GameStateEnum.CreateGame:
            CurPage = <CreateGamePage/>;
            break;
        case GameStateEnum.HostWaitingRoom:
            CurPage = <HostWaitingRoomPage/>;
            break;
        case GameStateEnum.JoinGame:
            CurPage = <JoinGamePage/>;
            break;
        case GameStateEnum.WaitingRoom:
            CurPage = <WaitingRoomPage/>;
            break;
        case GameStateEnum.Question:
            CurPage = <QuestionPage/>;
            break;
        case GameStateEnum.QuestionMatch:
            CurPage = <QuestionMatchPage/>;
            break;
        case GameStateEnum.Scores:
            CurPage = <ScoresPage/>;
            break;
        case GameStateEnum.EndGame:
            CurPage = <EndGamePage/>;
            break;
        default:
            console.log("HELP ME TASUKETE", gameState, localGameState);
            return(<div/>);
    }

    return (
        <div className='App'>
            {CurPage}
        </div>
    )
}

export default Game;
