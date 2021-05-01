import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import {Redirect} from "react-router-dom";

class HostWaitingRoomPage extends NetworkedPage {

    constructor() {
        super();
        this.question = null;
    }

    componentDidMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }

    StartGame() {
        console.log("Start game?");
        this.socket.send("START GAME");
    }

    RespondToSocketMessages(e) {
        super.RespondToSocketMessages(e);

        const transitionToGameMessage = "TRANSITION QUESTION ";
        if (e.data.startsWith(transitionToGameMessage)) {
            this.question = e.data.substr(transitionToGameMessage.length);
            this.setState({redirect: true});
            console.log("Got question transition. Question is " + this.question);
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/question",
                    state: {
                        id: this.state.id,
                        roomCode: this.state.roomCode,
                        name: this.state.name,
                        question: this.question,
                    }
                }}/>
            );
        } else {
            return (
                <div className="hostwaitingroom">
                    <header className="App-header">
                        <div className="mb-2">
                            <h1>Your Game</h1>
                            <h5>
                                Your game was created successfully! Share the following ✨ secret code ✨
                                with your friends so they can join in on the fun!
                            </h5>
                        </div>

                        <div className="code">
                            <Form.Text><h1>Secret Code: <b>{this.props.location.state.roomCode}</b></h1></Form.Text>
                        </div>

                        <div className="players">
                            <h1>Waiting for players to join...</h1>
                            <h5>* as players join, their names will show up here * </h5>
                        </div>

                        <Button type="submit" onClick={() => this.StartGame()}>Start The Game!</Button>
                    </header>
                </div>
            );
        }
    }
}

export default HostWaitingRoomPage;

