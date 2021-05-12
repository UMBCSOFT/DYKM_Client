import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import {Redirect} from "react-router-dom";
import ButtonOrWait from "../Component/ButtonOrWait";
import ScoreContent from "../utility/ScoreContent";

class Scores extends NetworkedPage {
    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
        this.clickedSubmit = false;
        this.isLastRound = false;
        this.wasAbleToTransition = null;
        this.question = null;
        this.state = {
            playerScoresObjList: []
        }
    }

    UNSAFE_componentWillMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }

    IsLastRound() {
        this.socket.send("ISLASTROUND");
    }

    GetPlayerList() {
        this.socket.send("GETPLAYERSCORES")
    }

    ConvertScoreStrToObjList(scoresStr) {
        let playerScoresStrList = scoresStr.split(';');

        let playerScoresObjList = [];
        for (let info of playerScoresStrList) {
            const infoList = info.split(',');
            playerScoresObjList.push({
                    name: infoList[0],
                    score: infoList[1],
                    numCorrectMatches: infoList[2]
                }
            );
        }
        return playerScoresObjList;
    }

    RespondToSocketMessages(e, callback) {
        if (e.data.startsWith("ISLASTROUND ")) {
            const response = e.data.substr("IS LAST ROUND ".length);
            this.isLastRound = (response === "TRUE");
            if (this.isLastRound) {
                this.forceUpdate();
            }
        }
        const transitionToGameMessage = "TRANSITION QUESTION ";
        const transitionEndGame = "TRANSITION ENDGAME";
        if (e.data.startsWith(transitionToGameMessage) || e.data.startsWith(transitionEndGame)) {
            this.wasAbleToTransition = true;
            this.question = e.data.substr(transitionToGameMessage.length);
            this.isLastRound = e.data.startsWith(transitionEndGame);
            this.setState({
                redirect: true,
            });
            console.log("Got Question transition SCORES. Question is " + this.question);
        }

        // Expecting string of: name,totalscore,roundscore;name,totalscore,roundscore;etc
        const playerScoreMessage = "PLAYERSCORES ";
        if (e.data.startsWith(playerScoreMessage)) {
            let playerScoreStr = e.data.substr(playerScoreMessage.length);
            this.setState({
                playerScoresObjList: this.ConvertScoreStrToObjList(playerScoreStr)
            });
        }
        super.RespondToSocketMessages(e, callback);
    }

    HandleClick() {
        this.clickedSubmit = true;
        this.forceUpdate();
        this.socket.send("READYNEXTROUND")
    }

    render() {
        if (this.socket) {
            this.IsLastRound();
        } else {
            setTimeout(this.IsLastRound, 2000);
        }
        if (this.state.redirect) {
            this.CloseNetworkedPage();
            if (this.isLastRound) {
                console.log("Transition to end screen");
                return (
                    <Redirect to={{
                        pathname: "/endgame",
                        state: {
                            id: this.props.location.state.id,
                            roomCode: this.props.location.state.roomCode,
                            name: this.props.location.state.name,
                            url: this.props.location.state.url,
                            playerScoresObjList: this.state.playerScoresObjList
                        }
                    }}/>
                );
            } else {
                console.log("Transition to next round");
                return (
                    <Redirect to={{
                        pathname: "/question",
                        state: {
                            id: this.props.location.state.id,
                            roomCode: this.props.location.state.roomCode,
                            name: this.props.location.state.name,
                            url: this.props.location.state.url,
                            question: this.question
                        }
                    }}/>
                );
            }
        } else {
            this.GetPlayerList();
            let scoreContent = null;
            if (this.state.playerScoresObjList.length > 0) {
                scoreContent = <ScoreContent displayRoundScore={true} playerList={this.state.playerScoresObjList}/>;
            }
            return (
                <div className="scores">
                    <header className="App-header">
                        <h1>SCORE PAGE</h1>
                        {scoreContent}
                        <ButtonOrWait label={"Ready?"} switchToWait={this.clickedSubmit} callback={()=>this.HandleClick()}/>
                    </header>
                </div>
            );
        }

    }
}
export default Scores;

