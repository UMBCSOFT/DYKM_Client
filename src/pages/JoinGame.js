import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from '../utility/NetworkedPage'
import {Redirect} from "react-router-dom";

class JoinGamePage extends NetworkedPage {

    constructor(props) {
        super(props);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.socket = undefined;
    };

    handleNameChange(e) {
        this.setState({name: e.target.value});
    };

    handleCodeChange(e) {
        this.setState({roomCode: e.target.value});
    };

    JoinRoom(id_) {
        super.JoinRoom(id_, (success) => {
            if(success) this.setState({ redirect: true })
        });
    }

    render() {
        if (this.state.redirect) {
            console.log("Roomcode in joingame: \n" + this.state.roomCode);
            return (
                <Redirect to={{
                    pathname: "/waitingroom",
                    state: {
                        id: this.state.id,
                        roomCode: this.state.roomCode,
                        name: this.state.name,
                        url: this.url,
                    }
                }} />
            )
        } else {
            return (
                <div className="joingame">
                    <header className="App-header">
                        <div className="mb-2 GameSettings">
                            <h1>JOIN A GAME</h1>
                            <Form>
                                <Form.Group controlId="nickname">
                                    <Form.Label>Nickname</Form.Label>
                                    <input type="name" placeholder="Enter a nickname!" value={this.state.name} onChange={this.handleNameChange}/>
                                </Form.Group>

                                <Form.Group controlId="roomcode">
                                    <Form.Label>Secret Code</Form.Label>
                                    <input type="text" placeholder="Enter a nickname!" value={this.state.roomCode} onChange={this.handleCodeChange}/>
                                </Form.Group>

                                <Button variant="primary" type="button" onClick={() => this.JoinRoom(this.state.roomCode)}>
                                    Join Game
                                </Button>
                            </Form>
                        </div>
                    </header>
                </div>
            );
        }
    }
}

export default JoinGamePage;

