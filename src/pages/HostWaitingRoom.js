import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import {Redirect} from "react-router-dom";

class HostWaitingRoomPage extends NetworkedPage {

    constructor() {
        super();
        this.question = null
        this.playerElements = [];
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

        console.log(e.data);

        const transitionToGameMessage = "TRANSITION QUESTION ";
        if (e.data.startsWith(transitionToGameMessage)) {
            this.question = e.data.substr(transitionToGameMessage.length);
            this.setState({redirect: true});
            console.log("Got Question transition HOST WAITING ROOM. Question is " + this.question);
        }

        const playerUpdateMessage = "PLAYERUPDATE ";
        if (e.data.startsWith(playerUpdateMessage)) {
            let playerNames = e.data.substr(playerUpdateMessage.length).split(";"); // TODO: people can put ; in their name and break this
            this.playerElements = playerNames.map(x=><h5>{x}</h5>);
            this.forceUpdate();
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/Question",
                    state: {
                        id: this.props.location.state.id,
                        roomCode: this.state.roomCode,
                        name: this.props.location.state.name,
                        url: this.props.location.state.url,
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
                            {this.playerElements.length === 0 && <h5>* as players join, their names will show up here * </h5>}
                            {this.playerElements}
                        </div>

                        <Button type="submit" onClick={() => this.StartGame()}>Start The Game!</Button>
                    </header>
                </div>
            );
        }
    }
}

export default HostWaitingRoomPage;

