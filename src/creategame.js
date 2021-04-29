import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col, Button, Nav, Form, Tab} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import React from 'react';
import {DYKM_Websocket} from  "./websocket";

// TODO: Made a "NetworkedPage" class with all of this stuff
// to inherit from
class CreateGamePage extends React.Component {

    that = this;

    constructor(props) {
        super(props);
        this.CreateRoom = this.CreateRoom.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.socket = undefined;
        this.state = {
            roomCode: "No Room Code",
            name: ""
        };

        this.PORT = 1337;
        this.REQ_STATES = {
            UNSET: 0,
            OPENED: 1,
            HEADERS_RECEIVED: 2,
            LOADING: 3,
            DONE: 4
        };
    };

    HTTPOnReadyStateChangeHandler(Http, id, username) {
        if (Http.readyState === this.REQ_STATES.DONE) {
            if(Http.status === 200) {
                console.log("Connecting to websocket.")
                if (username) {
                    this.ConnectToWebsocket(Http.responseText, id, username);
                }
                else {
                    this.ConnectToWebsocket(Http.responseText, id);
                }
            }
            else {
                console.log("ERROR ".concat(Http.status, ": ") + Http.responseText);
            }
        }
    }

    JoinRoom(id_) {
        let id;
        if (id_) {
            id = id_;
        }
        else {
            id = this.state.roomCode;
        }

        const httpRequest = new XMLHttpRequest();
        const url = "http://localhost:".concat(this.PORT, "/room/get/", id);
        const username = this.state.name;

        console.log("Joining room with url: ".concat('\n', url));
        httpRequest.onreadystatechange = () => this.HTTPOnReadyStateChangeHandler(httpRequest, id, username)
        httpRequest.open("GET", url);
        httpRequest.send();
        console.log("Sent GET to url: ".concat(url));
    };

    CreateRoomHTTPCallback(Http) {
        console.log("Sending post");
        if (Http.readyState === 4 && Http.status === 200) {
            let json = JSON.parse(Http.responseText);
            this.setState( {roomCode: json["id]"]}, () => {
                this.render();
            });
            // if (typeof(window) !== 'undefined') {
            //     document.getElementById("JoinRoomField").value = json["id"];
            // }
            console.log(Http.responseText);
            console.log("Join room ID: ".concat(json["id"]));
            this.JoinRoom(json["id"]);
        }
        else {
            console.log("state: " + this.readyState.toString());
        }
    };

    CreateRoom() {
        console.log("CreateRoom()");
        const Http = new XMLHttpRequest();
        const url = "http://localhost:".concat(this.PORT, "/room/create");
        console.log("URL: ".concat(url));
        Http.addEventListener('load', () => this.CreateRoomHTTPCallback(Http));
        Http.open("POST", url);
        console.log("Opened POST request")
        Http.send();
        console.log("Sent post");
    }

    SetUserName() {
        console.log("Setting username");
        if (this.state.name.length > 0) {
            this.socket.send("CHANGENICK ".concat(this.state.name));
        }
    }

    OnOpenWebsocket(id_) {
        console.log("[open] Connection established");
        console.log(`Attempting to join room ${id_}`);
        this.socket.send("JOIN " + id_);
    }

    RespondToHeartbeats(e) {
        console.log("RespondToHeartbeats " + e);
        if(e === undefined) return;
        console.log(`[message] Data received from server: ${e.data}`);
        // Respond to heartbeats
        if(e.data === "PING") {
            this.socket.send("PONG");
            console.log("Received PING. Replying with PONG");
        }
        if(e.data === "PONG ACK") {
            console.log("Received PONG acknowledgement");
        }

        if(e.data.toString().startsWith("WELCOME ")) {
            this.SetUserName();
        }
    };

    ConnectToWebsocket(url, id_, username_ = "") {
        if(this.socket !== undefined) {
            this.socket.close();
        }
        //<input id="WebsocketValue" type="text" value="ws://localhost:4567"/>
        this.socket = new DYKM_Websocket(url);

        this.socket.setOnMessage(this, this.RespondToHeartbeats);

        this.socket.setOnClose(this, function(event) {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                console.log('[close] Connection died');
            }
        });

        this.socket.setOnError(this, function(error) {
            console.log(`[error] ${error.message}`);
        });

        this.socket.setOnOpen(this, () => this.OnOpenWebsocket(id_));
        this.socket.connect(); // NOTE: We need this even though usually with a normal websocket you don't. REMEMBER THIS
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    };

    render() {
        return (
            <div className="creategame">

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
                    <div className= "mb-2">
                        <h1>CREATE GAME</h1>
                        <div id={"CreateGameSettings"}>
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
                                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                                        <Row>
                                            <Col sm = "auto">
                                                <ListGroup>
                                                    <ListGroup.Item  action href="#link1">
                                                        Do You Know Me?
                                                    </ListGroup.Item>
                                                    <ListGroup.Item action href="#link2">
                                                        Ice Breakers
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                            <Col sm={8}>
                                                <Tab.Content>
                                                    <Tab.Pane eventKey="#link1">
                                                        Official question pack - see if you <i>really</i> know your friends!
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="#link2">
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
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="5 Rounds"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="10 Rounds"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios3"
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
                                    <Button variant="primary" href= "/hostwaitingroom" type="submit" onClick={() => this.CreateRoom()}>Create the game!</Button>
                                </Col>
                            </Form.Group>
                        </div>
                    </div>
                </header>
            </div>
        );
    };
}
export default CreateGamePage;

