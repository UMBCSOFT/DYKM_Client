import '../css/style.css'
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col, Button, Form, Tab, Container} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import React from 'react';
import { Redirect } from "react-router-dom";
import NetworkedPage from '../utility/NetworkedPage'

class CreateGame extends NetworkedPage {

    constructor(props) {
        super(props);
        this.CreateRoom = this.CreateRoom.bind(this);
        this.radioOnChange = this.radioOnChange.bind(this);
        this.onPackSelect = this.onPackSelect.bind(this);
        this.numRounds = 1;
        this.gamePack = "doyouknowme";
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
        super.CreateRoomHTTPCallback(Http, (roomCode_) => {
            this.setState({ roomCode: roomCode_ });
            this.JoinRoom(roomCode_);
        });
    }

    JoinRoom(roomCode) {
        super.JoinRoom(roomCode, (success, roomCode_) => {
            this.setState({ roomCode: roomCode_ });
        })
    };

    RespondToSocketMessages(e) {
        if(this.socket === undefined) return;
        super.RespondToSocketMessages(e);

        if (e.data.toString().startsWith("WELCOME ")) {
            console.log(this.state.roomCode);
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
            this.CloseNetworkedPage();
            console.log("Roomcode in creategame: \n" + this.state.roomCode);
            return (
                <Redirect to={{
                    pathname: "/hostwaitingroom",
                    state: {
                        id: this.state.id,
                        roomCode: this.state.roomCode,
                        name: this.state.name,
                        url: this.url,
                    }
                }} />
            )
        }
        else {
            return (
                <div className="creategame App-header">
                    <div className="mb-2 GameSettings">
                        <h1 className="Center">CREATE GAME</h1>
                        <div id="createGameSettings">
                            <Form.Group as={Row} id="nickname">
                                <Form.Label column sm={2}>
                                    Nickname
                                </Form.Label>
                                <Col sm={10}>
                                    <input type="text" placeholder="Enter a nickname!" value={this.state.name} onChange={this.handleNameChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} id="questionpack">
                                <Form.Label column sm={2}>
                                    Question Pack
                                </Form.Label>
                                <Col sm={10}>
                                    <Tab.Container id="game-type" defaultActiveKey="#doyouknowme">
                                        <Row>
                                            <Col sm = "auto">
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
                                            <Col sm={8}>
                                                <Tab.Content>
                                                    <Tab.Pane eventKey="#doyouknowme">
                                                        Official question pack - see if you <i>really</i> know your friends!
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="#icebreakers">
                                                        Great question pack to play with new friends!
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Col>
                                        </Row>
                                    </Tab.Container>
                                </Col>
                            </Form.Group>

                            <fieldset>
                                <Form.Group as={Row}>
                                    <Form.Label as="legend" column sm={2}>
                                        Rounds
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="1 Round"
                                            defaultChecked={true}
                                            onChange={(e)=>this.radioOnChange(e)}
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            numvalue={1}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="5 Rounds"
                                            onChange={(e)=>this.radioOnChange(e)}
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            numvalue={5}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="10 Rounds"
                                            onChange={(e)=>this.radioOnChange(e)}
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios3"
                                            numvalue={10}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>

                            <Form.Group controlId="roomcode">
                                <Form.Label>Secret Code</Form.Label>
                                <Form.Text><b>{this.state.roomCode}</b></Form.Text>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button variant="primary" type="submit" onClick={() => this.CreateRoom()}>Create the game!</Button>
                                </Col>
                            </Form.Group>
                        </div>
                    </div>
                </div>

            );
        }
    }
}
export default CreateGame;

