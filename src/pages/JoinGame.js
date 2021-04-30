import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from '../utility/NetworkedPage'

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

    render() {
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

                            <Button variant="primary" type="button" onClick={() => this.CreateRoom()}>
                                Join Game
                            </Button>

                            <Button href= "/waitingroom" variant="primary" type="submit">
                                Enter Room
                            </Button>
                        </Form>
                    </div>
                </header>
            </div>
      );
    }
}

export default JoinGamePage;

