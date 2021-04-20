// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Nav, Form} from 'react-bootstrap'
import React from 'react';
import WebSocket from 'ws';

class CreateGamePage extends React.Component {

    that = this;

    constructor(props) {
        super(props);
        this.CreateRoom = this.CreateRoom.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
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

    JoinRoom(id_) {
        let id;
        if (id_) {
            id = id_;
        }
        else {
            id = this.state.roomCode;
        }

        const Http = new XMLHttpRequest();
        const url = "http://localhost:".concat(this.PORT, "/room/get/", id);
        const username = this.state.name;

        console.log("Joining room with url: ".concat('\n', url));
        Http.onreadystatechange = () => {
            if (this.readyState === this.REQ_STATES.DONE) {
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
                    console.log("ERROR ".concat(this.status, ": ") + Http.responseText);
                }
            }
        };
        Http.open("GET", url);
        Http.send();

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
    }

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

    SetUserName(socket) {
        const userName = document.getElementById("UserNameField").value;

        if (userName.length > 0) {
            socket.send("CHANGENICK ".concat(userName));
        }
    }

    ConnectToWebsocket(url, id, username_ = "") {
        if(window.socket !== undefined) {
            window.socket.close();
        }
        //<input id="WebsocketValue" type="text" value="ws://localhost:4567"/>
        window.socket = new WebSocket(url);

        window.socket.onmessage = (e) => {
            console.log(`[message] Data received from server: ${e.data}`);

            // Respond to heartbeats
            if(e.data === "PING") {
                window.socket.send("PONG");
                console.log("Received PING. Replying with PONG");
            }
            if(e.data === "PONG ACK") {
                console.log("Received PONG acknowledgement");
            }

            if(e.data.toString().startsWith("WELCOME ")) {
                this.SetUserName(window.socket);
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

    handleNameChange(e) {
        this.setState({name: e.target.value})
    };

    render() {
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
                    <div className= "mb-2">
                        <h1>CREATE GAME</h1>
                        <div>

                            <Form.Group controlId="nickname">
                                <Form.Label>Nickname</Form.Label>
                                <input type="text" placeholder="Enter a nickname!" value={this.state.name} onChange={this.handleNameChange}/>
                            </Form.Group>

                            <Form.Group controlId="roomcode">
                                <Form.Label>Secret Code</Form.Label>
                                <Form.Text><b>{this.state.roomCode}</b></Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={() => this.CreateRoom()}>
                                Create Game
                            </Button>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default CreateGamePage;

