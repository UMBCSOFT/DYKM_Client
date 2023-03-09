import '../css/App.css';
import '../css/Pages.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col, Button, Form} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from '../utility/NetworkedPage'
import {Navigate} from "react-router-dom";

class JoinGame extends NetworkedPage {

    constructor(props) {
        super(props);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.socket = undefined;
    };

    handleNameChange(e) {
        this.setState({name: e.target.value});
    };

    handleCodeChange(e) {
        this.setState({roomCode: e.target.value});
    };

    JoinRoom(id_) {
        super.JoinRoom(id_, (success, id__) => {
            this.setState({ id: id__ });
        });
    }

    CreateRoomHTTPCallback(Http) {
        super.CreateRoomHTTPCallback(Http, (id_) => {
            this.setState({ id: id_ });
        })
    };

    RespondToSocketMessages(e) {
        if(this.socket === undefined) return;
        if (e.data.toString().startsWith("WELCOME ")) {
            console.log("MY NAME IS: ", this.state.name);
            this.socket.send("CHANGENICK " + this.state.name);
            this.setState({ redirect: true});
        }
        super.RespondToSocketMessages(e);
    }

    render() {
        if (this.state.redirect) {
            this.CloseNetworkedPage();
            console.log("Roomcode in joingame: \n" + this.state.roomCode);
            return (
                <Navigate to={{
                    pathname: "/home/waitingroom",
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
                <div className="App Window-page">
                    <Form id="JoinGame" className="mb-2 mx-auto w-75 Center Card">
                        <h1>JOIN A GAME</h1>
                        <Form.Group className="w-100" as={Row} controlId="nickname">
                            <Form.Label column sm={4}>Nickname</Form.Label>
                            <Col className="d-flex align-items-center">
                                <Form.Control type="text" placeholder="Enter a nickname!" onChange={this.handleNameChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group className="w-100" as={Row} controlId="roomcode">
                            <Form.Label column sm={4}>Secret Code</Form.Label>
                            <Col className="d-flex align-items-center">
                                <Form.Control type="text" placeholder="Enter the roomcode!" onChange={this.handleCodeChange}/>
                            </Col>
                        </Form.Group>

                        <Button size="lg" variant="primary" type="button" onClick={() => this.JoinRoom(this.state.roomCode)}>
                            Join Game
                        </Button>
                    </Form>
                </div>
            );
        }
    }
}

export default JoinGame;

