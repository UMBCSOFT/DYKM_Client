import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import GameSummaryContent from "../utility/GameSummaryContent";
import { useDYKMNetworker } from './DYKM_Networking';
import {Button, ButtonGroup} from 'react-bootstrap';
import ButtonOrWait from "../Component/ButtonOrWait";

// Ty Nuha!
function EndGamePage() {
    const { HandlePlayAgain, playerScoresObjList } = useDYKMNetworker();
    const [doneAnswering, setDoneAnswering] = useState(false);

    function _HandlePlayAgain() {
        setDoneAnswering(true);
        HandlePlayAgain();
    }

    return (
        <div className="w-75 Card">
            <h1>GAME SUMMARY</h1>
            <GameSummaryContent playerList={playerScoresObjList}/>
            <br/>
            {/*TODO make play again work. the back-end doesn't support it.*/}
            {/*<div className={"mb-2"}>*/}
            {/*    <ButtonOrWait label={"Play Again?"} switchToWait={this.clickedSubmit} callback={()=>this.HandleClick(this.buttons.PLAY_AGAIN)}/>*/}
            {/*</div>*/}
            <div style={{
                display: "grid"
                }}>
                <ButtonOrWait
                    className="GameButton"
                    label={"Play Again"}
                    switchToWait={doneAnswering}
                    callback={_HandlePlayAgain}/>
                <Button className="GameButton" variant="secondary" type="submit" href="/home">
                    Main Menu
                </Button>
            </div>
        </div>
    );
}

export default EndGamePage;
