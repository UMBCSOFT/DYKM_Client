import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Nav, Form} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from './NetworkedPage'

// TODO: Made a "NetworkedPage" class with all of this stuff
// to inherit from
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

                {/*TODO: consolidate the header code somewhere*/}
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
                    <div className="mb-2">
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

