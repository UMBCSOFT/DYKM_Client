import React from 'react';
import {DYKM_Websocket} from "./websocket";

class NetworkedPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.socket = undefined;

        this.state = {
            roomCode: "No Room Code",
            name: "",
            id: null,
            redirect: false
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
        this.setState( { roomCode: id });
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

    SetUserName() {
        if (this.state.name.length > 0) {
            this.socket.send("CHANGENICK ".concat(this.state.name));
        }
    }

    RespondToSocketMessages(e) {
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

        if(e.data.startsWith("WELCOME ")) {
            this.SetUserName();
        }

        if(e.data.startsWith("ID ")) {
            this.setState({ id: e.data.toString().substr("ID  ".length)});
        }
    };

    ChangePage(path, data = this.state) {
        this.props.history.push( {
            pathname: path,
            state: data
        });
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
        this.url = url;
        //<input id="WebsocketValue" type="text" value="ws://localhost:4567"/>
        this.socket = new DYKM_Websocket(url);

        this.socket.setOnMessage(this, this.RespondToSocketMessages);

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
}

export default NetworkedPage;