import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Nav, Form} from 'react-bootstrap'
import React from 'react';

// TODO: Made a "NetworkedPage" class with all of this stuff
// to inherit from
class JoinGamePage extends React.Component {

    that = this;

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
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

    SetUserName(socket) {
        if (this.state.name.length > 0) {
            socket.send("CHANGENICK ".concat(this.state.name));
        }
    }

    RespondToHeartbeats(e) {
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
            this.SetUserName(this.socket);
        }
    };

    OnOpenWebsocket(id_) {
        console.log("[open] Connection established");
        console.log(`Attempting to join room ${id_}`);
        this.socket.send("JOIN " + id_);
    }

    ConnectToWebsocket(url, id_, username_ = "") {
        if(this.socket !== undefined) {
            this.socket.close();
        }
        //<input id="WebsocketValue" type="text" value="ws://localhost:4567"/>
        this.socket = new WebSocket(url);

        this.socket.onmessage = (e) => this.RespondToHeartbeats(e);

        this.socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                console.log('[close] Connection died');
            }
        };

        this.socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
        };

        this.socket.onopen = () => this.OnOpenWebsocket(id_)
    }

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

