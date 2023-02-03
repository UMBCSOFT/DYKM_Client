import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import GameSummaryContent from "../utility/GameSummaryContent";
import {Button} from 'react-bootstrap';
import {Navigate} from "react-router-dom";

// Ty Nuha!
class EndGame extends NetworkedPage {
    constructor(props) {
        super(props);
        this.HandleClick = this.HandleClick.bind(this);
        this.clickedSubmit = false;
        this.wasAbleToTransition = null;
        this.buttons = {
            MAIN_MENU: "main menu",
            PLAY_AGAIN: "play again"
        }
        this.state = {
            playerScoresObjList: []
        }
    }

    componentDidMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }
    RespondToSocketMessages(e, callback) {
        const transitionToGameMessage = "TRANSITION QUESTION ";
        if (e.data.startsWith(transitionToGameMessage)) {
            this.question = e.data.substr(transitionToGameMessage.length);
            this.setState({
                redirect: true,
            });
            console.log("Got Question transition SCORES. Question is " + this.question);
        }

        super.RespondToSocketMessages(e, callback);
    }

    HandleClick(btnChoice) {
        this.clickedSubmit = true;
        if (btnChoice === null || btnChoice === undefined) {
            console.error("btnChoice is not defined");
        }
        this.setState( {
            playAgain: (btnChoice === this.buttons.PLAY_AGAIN),
            redirect: true
        });

        // get next round's question if playing again
        if (btnChoice === this.buttons.PLAY_AGAIN) {
            this.socket.send("READYNEXTROUND");
        }
    }

    render() {
        if (this.state.redirect) {
            this.CloseNetworkedPage();
            if (this.state.playAgain) {
                console.log("Transition to next round");
                return (
                    <Navigate to={{
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
            } else {
                console.log("End game and return to main menu");
                return (
                    <Navigate to={{
                        pathname: "/",
                        state: {}
                    }}/>
                );

            }
        } else {
            let gameSummaryContent = null;
            let playerList = this.props.location.state.playerScoresObjList;
            if (playerList.length > 0) {
                gameSummaryContent = <GameSummaryContent playerList={playerList}/>;
            }
            return (
                <div className="scores">
                    <header className="App-header">
                        <h1>GAME SUMMARY</h1>
                        {gameSummaryContent}
                        <br/>
                        {/*TODO make play again work. the back-end doesn't support it.*/}
                        {/*<div className={"mb-2"}>*/}
                        {/*    <ButtonOrWait label={"Play Again?"} switchToWait={this.clickedSubmit} callback={()=>this.HandleClick(this.buttons.PLAY_AGAIN)}/>*/}
                        {/*</div>*/}
                        <div className={"mb-2"}>
                            <Button variant="primary" type="submit" onClick={()=>this.HandleClick(this.buttons.MAIN_MENU)}>
                                Main Menu
                            </Button>
                        </div>
                    </header>
                </div>
            );
        }

    }
}

export default EndGame;
