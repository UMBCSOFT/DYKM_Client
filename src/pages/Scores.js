import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { useDYKMNetworker } from './DYKM_Networking';
import ButtonOrWait from "../Component/ButtonOrWait";
import ScoreContent from "../utility/ScoreContent";

function ScoresPage(props) {
    let clickedSubmit = false;

    const {playerScoresObjList, HandleReadyNextRound} = useDYKMNetworker();

    return (
        <div className='w-50'>
            <h1>SCORE PAGE</h1>
            <ScoreContent displayRoundScore={true} playerList={playerScoresObjList}/>

            <ButtonOrWait label={"Ready?"} switchToWait={clickedSubmit} callback={()=>HandleReadyNextRound()}/>
        </div>
    );
}

export default ScoresPage;
