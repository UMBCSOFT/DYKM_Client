import '../css/style.css'
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Row, Col, Button, Tab} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import NetworkedPage from '../utility/NetworkedPage'

class CreateGame extends NetworkedPage {

    constructor(props) {
        super(props);
        this.CreateRoom = this.CreateRoom.bind(this);
        this.radioOnChange = this.radioOnChange.bind(this);
        this.onPackSelect = this.onPackSelect.bind(this);
        this.numRounds = 1;
        this.gamePack = "doyouknowme";

        this.RespondToSocketMessages = this.RespondToSocketMessages.bind(this);
    };

    CreateRoom() {
        console.log("CreateRoom()");
        const Http = new XMLHttpRequest();
        const url = "http://localhost:".concat(this.PORT, "/room/create");
        console.log("URL: ".concat(url));
        Http.addEventListener('load', () => this.CreateRoomHTTPCallback(Http));
        Http.onerror = function () {
            alert("Unable to create a game on the game server");
        }
        Http.open("POST", url);
        console.log("Opened POST request")
        Http.send();
        console.log("Sent post");
    }

    CreateRoomHTTPCallback(Http) {
        super.CreateRoomHTTPCallback(Http, (_roomCode) => {
            this.JoinRoom(_roomCode);
        });
    }

    RespondToSocketMessages(e) {
        super.RespondToSocketMessages(e);
        if(this.socket === undefined) {
            console.log("RespondToSocketMessages: Socket undefined.")
        }
        console.log(`Received websocket message: ${e.data}`);

        if (e.data.toString().startsWith("WELCOME ")) {
            this.socket.send("SETNUMROUNDS " + this.numRounds);
            this.socket.send("SETGAMEPACK " + this.gamePack);
            //this.socket.send("ID RECEIVED");
            this.socket.send("CHANGENICK " + this.state.name);
            this.setState({ id: e.data.substr("WELCOME ".length)});
            this.setState({ redirect: true});
        }

    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    radioOnChange(e){
        let value = parseInt(e.target.getAttribute("numvalue"));
        this.numRounds = value;
    }

    onPackSelect(e) {
        e.preventDefault();
        this.gamePack = e.target.href.substr(1); // Cut off the #
        console.log("Changed game pack to " + this.gamePack);
    }

    render() {
        if (this.state.redirect) {
            console.log("Joined created room; redirecting.");
            console.log("Roomcode in creategame: \n" + this.state.roomCode);
            console.log("URL: "+ this.state.url);
            console.log("State:", this.state);
            let state = {
                        id: this.state.id,
                        roomCode: this.state.roomCode,
                        name: this.state.name,
                        url: this.state.url
                    };
            this.CloseNetworkedPage();
            return (
                <Navigate to="/home/hostwaitingroom" state={state}/>
            );
        }
        else {
            return (
                <div className="App Window-page">
                    <div className="Card GameSettings Center w-75">
                        <h1>CREATE GAME</h1>
                        <Form.Group as={Row} className="w-100 mb-4" id="nickname">
                            <Form.Label column sm={4}>Nickname</Form.Label>
                            <Col className="d-flex align-items-center">
                                <Form.Control type="text" placeholder="Enter a nickname!" value={this.state.name} onChange={this.handleNameChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} id="questionpack" className="w-100 mb-4">
                            <Form.Label column sm={4}>
                                Question Pack
                            </Form.Label>
                            <Col>
                                <Tab.Container id="game-type" defaultActiveKey="#doyouknowme">
                                    <Row>
                                        <Col>
                                            <ListGroup >
                                                <ListGroup.Item
                                                    action
                                                    href="#doyouknowme"
                                                    onClick={(e)=>this.onPackSelect(e)}
                                                >
                                                    Do You Know Me?
                                                </ListGroup.Item>
                                                <ListGroup.Item
                                                    action
                                                    href="#icebreakers"
                                                    onClick={(e)=>this.onPackSelect(e)}
                                                >
                                                    Ice Breakers
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                        <Row>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="#doyouknowme">
                                                    Official question pack - see if you <i>really</i> know your friends!
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="#icebreakers">
                                                    Great question pack to play with new friends!
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Row>
                                    </Row>
                                </Tab.Container>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="w-100 mb-4">
                            <Form.Label column sm={4}>
                                Rounds
                            </Form.Label>
                            <Col className="d-flex align-items-center">
                                <Form.Control as="select" onChange={(e)=>this.radioOnChange(e)}>
                                    <option
                                        value="1"
                                    >
                                        1 Round
                                    </option>
                                    <option
                                        value="5"
                                    >
                                        5 Rounds
                                    </option>
                                    <option
                                        value="10"
                                    >
                                        10 Rounds
                                    </option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="roomcode" className="w-100 mb-4">
                            <Form.Label column sm={4}>Secret Code</Form.Label>
                            <Col>
                                <Form.Text><b>{this.state.roomCode}</b></Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Button size="lg" variant="primary" type="submit" onClick={() => this.CreateRoom()}>Create the game!</Button>
                        </Form.Group>
                    </div>
                </div>

            );
        }
    }
}
export default CreateGame;

