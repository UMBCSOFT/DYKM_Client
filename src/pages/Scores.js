import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { useDYKMNetworker } from './DYKM_Networking';
import ButtonOrWait from "../Component/ButtonOrWait";
import ScoreContent from "../utility/ScoreContent";

function ScoresPage(props) {
    let clickedSubmit = false;

    const {playerScoresObjList, HandleReadyNextRound} = useDYKMNetworker();

    let scoreContent = null;
    if (playerScoresObjList.length > 0) {
        scoreContent = <ScoreContent displayRoundScore={true} playerList={playerScoresObjList}/>;
    }
    return (
        <div className="scores">
            <header className="App-header">
                <h1>SCORE PAGE</h1>
                {scoreContent}
                <ButtonOrWait label={"Ready?"} switchToWait={clickedSubmit} callback={()=>HandleReadyNextRound()}/>
            </header>
        </div>
    );
}

export default ScoresPage;
