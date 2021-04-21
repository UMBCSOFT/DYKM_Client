import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './about'
import howtoplay from './howtoplay';
import {Route, Link} from 'react-router-dom'
import {Container, Row, Col, Button, Alert, Nav, Badge, Form, Tab} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import React from 'react';
//import DOMPurify from "dompurify";

const PORT = 1337;
const REQ_STATES = {
    UNSET: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
};

function CreateRoom() {
    console.log("CreateRoom()");
    const Http = new XMLHttpRequest();
    const url = "http://localhost:".concat(PORT, "/room/create");
    console.log("URL: ".concat(url));
    Http.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let json = JSON.parse(Http.responseText);
            // if (typeof(window) !== 'undefined') {
            //     document.getElementById("JoinRoomField").value = json["id"];
            // }
            console.log(Http.responseText);
            console.log("Join room ID: ".concat(json["id"]));
            JoinRoomHost(json["id"]);
        }
    };
    Http.open("POST", url);
    console.log("Opened POST request")
    Http.send();
    console.log("Sent post");

    // Have host join the room they created
    function JoinRoomHost(id) {
        console.log("Host joining room with id: ".concat(id));
        JoinRoom(id);
    }
}

function JoinRoom(id_) {
    let id;
    if (id_) {
        id = id_;
    }
    else {
        id = document.getElementById("JoinRoomField").value
    }

    const Http = new XMLHttpRequest();
    const url = "http://localhost:".concat(PORT, "/room/get/", id);
    const username = document.getElementById("UserNameField").value;

    console.log("Joining room with url: ".concat('\n', url));
    Http.onreadystatechange = function() {
        if (this.readyState === REQ_STATES.DONE) {
            if(this.status === 200) {
                ConnectToWebsocket(Http.responseText, id, username);
            }
            else {
                console.log("ERROR ".concat(this.status, ": ") + Http.responseText);
            }
        }
    };
    Http.open("GET", url);
    Http.send();

    console.log("Sent GET to url: ".concat(url));
}

function SetUserName(socket) {
    const userName = document.getElementById("UserNameField").value;

    if (userName.length > 0) {
        socket.send("CHANGENICK ".concat(userName));
    }
}

function ConnectToWebsocket(url, id, username_ = "") {
    if(window.socket !== undefined) {
        window.socket.close();
    }
    //<input id="WebsocketValue" type="text" value="ws://localhost:4567"/>
    window.socket = new WebSocket(url);

    window.socket.onmessage = function(event) {
        console.log(`[message] Data received from server: ${event.data}`);

        // Respond to heartbeats
        if(event.data === "PING") {
            window.socket.send("PONG");
            console.log("Received PING. Replying with PONG");
        }
        if(event.data === "PONG ACK") {
            console.log("Received PONG acknowledgement");
        }

        if(event.data.toString().startsWith("WELCOME ")) {
            SetUserName(window.socket);
        }
    };

    window.socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
    };

    window.socket.onerror = function(error) {
        console.log(`[error] ${error.message}`);
    };

    window.socket.onopen = function(e) {
        console.log("[open] Connection established");
        console.log(`Attempting to join room ${id}`);
        window.socket.send("JOIN " + id);
    };
}


function creategame(){
    return (

        <div className="creategame">

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
                <Container>
                <h1>CREATE A GAME</h1>
                
                <Form>
                    <Form.Group as={Row} id="nickname">
                        <Form.Label column sm={2}>
                        Nickname
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="nickname" placeholder="enter a nickname!" />
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
                            <Col sm="auto">
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


                    

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                        <Button href= "/waitingroom" type="submit" onClick={CreateRoom()}>Create the game!</Button>
                        </Col>
                    </Form.Group>
                    </Form>
                </Container>
                    
                  
            </header>
        </div>
    );
}

export default creategame;

