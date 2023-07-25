import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import GameSummaryContent from "../utility/GameSummaryContent";
import { useDYKMNetworker } from './DYKM_Networking';
import {Button, ButtonGroup} from 'react-bootstrap';

// Ty Nuha!
function EndGamePage() {
    const { HandlePlayAgain, playerScoresObjList } = useDYKMNetworker();

    // TODO: Set up play again with server. Reset scores and rounds.
    // get next round's question if playing again
    return (
        <div className="w-75 Card">
            <h1>GAME SUMMARY</h1>
            <GameSummaryContent playerList={playerScoresObjList}/>
            <br/>
            {/*TODO make play again work. the back-end doesn't support it.*/}
            {/*<div className={"mb-2"}>*/}
            {/*    <ButtonOrWait label={"Play Again?"} switchToWait={this.clickedSubmit} callback={()=>this.HandleClick(this.buttons.PLAY_AGAIN)}/>*/}
            {/*</div>*/}
            <div style={{display: "grid"}}>
                <Button className="m-1" variant="primary" type="submit" onClick={HandlePlayAgain}>
                    Play Again
                </Button>
                <Button className="m-1" variant="secondary" type="submit" href="/home">
                    Main Menu
                </Button>
            </div>
        </div>
    );
}

export default EndGamePage;
