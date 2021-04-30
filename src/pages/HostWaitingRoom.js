import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";

class HostWaitingRoomPage extends NetworkedPage {

    componentDidMount() {
    }

    StartGame() {
        console.log("Start game?");
    }


    render() {
        return (
            <div className="hostwaitingroom">
                <header className="App-header">
                    <container>
                        <div className= "mb-2">
                            <h1>Your Game</h1>
                            <h5>
                                Your game was created successfully! Share the following ✨ secret code ✨
                                with your friends so they can join in on the fun!
                            </h5>
                        </div>

                        <div className= "code">
                            <Form.Text><h1>Secret Code: <b>{this.props.location.state.roomCode}</b></h1></Form.Text>
                        </div>

                        <div className= "players">
                            <h1>Waiting for players to join...</h1>
                            <h5>* as players join, their names will show up here * </h5>
                        </div>

                        <Button type="submit" onClick={() => this.StartGame()}>Start The Game!</Button>
                        <Button variant="primary" href= "/hostwaitingroom" type="submit" >Create the game!</Button>


                    </container>

                </header>
            </div>
        );
    }
}

export default HostWaitingRoomPage;

