import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Nav, Form} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from "./NetworkedPage";

class HostWaitingRoomPage extends NetworkedPage {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    StartGame() {

    }


    render() {
        return (
            <div className="hostwaitingroom">

                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/howtoplay">How To Play</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

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

                        <Button type="submit" onClick={() => this.ChangePage('/question', this.state)}>Start The Game!</Button>
                        <Button variant="primary" href= "/hostwaitingroom" type="submit" >Create the game!</Button>


                    </container>

                </header>
            </div>
        );
    }
}

export default HostWaitingRoomPage;

