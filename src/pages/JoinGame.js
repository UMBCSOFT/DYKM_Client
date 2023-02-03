import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
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
                <div className="joingame Center App Window-page">
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
                </div>
            );
        }
    }
}

export default JoinGame;

