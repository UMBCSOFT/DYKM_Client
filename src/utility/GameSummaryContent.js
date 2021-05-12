import React from "react";
import ScoreContent from "./ScoreContent";

class GameSummaryContent extends React.Component {
    constructor(props) {
        /* expects a list of players called playerList with attributes:
        *  name
        *  score (total score for game so far)
        *  numCorrectMatches (score for this round only)
         */
        super(props);
        this.question = undefined;
        this.playerList = props.playerList
    }

    GetWinner() {
        let winner = this.playerList[0];
        for (let p of this.playerList) {
            if (p.score > winner.score) {
                winner = p;
            }
        }

        return winner;
    }

    render() {
        return (
            <div>
                <ScoreContent displayRoundScore={false} playerList={this.playerList}/>
                <br/>
                <h1>Winner: {this.GetWinner().name}</h1>
                <h2>with {this.GetWinner().score} point(s)!</h2>
            </div>
        );
    }
}

export default GameSummaryContent;