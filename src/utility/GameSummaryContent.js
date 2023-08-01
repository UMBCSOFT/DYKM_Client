import React from "react";
import ScoreContent from "./ScoreContent";


function GetWinner(playerList) {
    let winner = playerList[0];
    for (let p of playerList) {
        if (p.score > winner.score) winner = p;
    }
    return winner;
}

/* expects a list of players called playerList with attributes:
 *  name
 *  score (total score for game so far)
 *  numCorrectMatches (score for this round only)
 */
function GameSummaryContent({ playerList }) {
    console.log("Player list: ", playerList);
    const winningPlayer = GetWinner(playerList);
    return (
        <div>
            <ScoreContent displayRoundScore={false} playerList={playerList}/>
            <br/>
            <br/>
            <h1>Winner: {winningPlayer.name}</h1>
            <h2>with {winningPlayer.score} point(s)!</h2>
        </div>
    );
}

export default GameSummaryContent;
