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
                return true;
            }
            else {
                console.log("ERROR ".concat(Http.status, ": ") + Http.responseText);
                return false;
            }
        }
    }

    JoinRoom(_roomCode, callback) {
        let roomCode;
        if (_roomCode) {
            roomCode = _roomCode;
        }
        else {
            roomCode = this.state.roomCode;
        }

        const httpRequest = new XMLHttpRequest();
        const url = "http://localhost:".concat(this.PORT, "/room/get/", roomCode);
        const username = this.state.name;

        console.log("Joining room with url: ".concat('\n', url));
        httpRequest.onreadystatechange = () => {
            let success = this.HTTPOnReadyStateChangeHandler(httpRequest, roomCode, username)
            if(callback)
                callback(success, roomCode);
        }
        httpRequest.onerror = () => {
            alert("Unable to join server room");
        }
        httpRequest.open("GET", url);
        httpRequest.send();
        this.setState( { roomCode: roomCode });
    };

    CreateRoomHTTPCallback(Http, callback) {
        if (Http.readyState === 4 && Http.status === 200) {
            let json = JSON.parse(Http.responseText);
            this.setState( {roomCode: json["id"]}, () => {
                callback(json["id"]);
            });
            if(json["id"] === undefined) {
                alert("Unable to generate room code for this game room.");
            }
            else {
                this.JoinRoom(json["id"]);
            }
        }
        else {
            console.log("state: " + this.readyState.toString());
        }
    };

    RespondToSocketMessages(e, callback) {
        if(e === undefined || this.socket === undefined) return;
        // Respond to heartbeats
        if(e.data === "PING") {
            this.socket.send("PONG");
        }
    };

    OnOpenWebsocket(roomCode_) {
        console.log(`[websocket open] Connection established\nAttempting to join room ${roomCode_}`);
        this.socket.send("JOIN " + roomCode_);
    }

    ConnectToWebsocket(url, roomCode_, username_ = "") {
        this.url = url;
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
            alert("Unable to connect to server room");
            console.log(`[error] ${error.message}`);
        });

        this.socket.setOnOpen(this, () => this.OnOpenWebsocket(roomCode_));
        this.socket.connect(); // NOTE: We need this even though usually with a normal websocket you don't. REMEMBER THIS
    }

    CloseNetworkedPage() {
        // Shutdown any socket stuff but keep the underlying connection in websocket.js open
        this.socket.setOnMessage(this, undefined);
        this.socket.setOnClose(this, undefined);
        this.socket.setOnError(this, undefined);
        this.socket.setOnOpen(this, undefined);
        this.socket = undefined;
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    };
}

export default NetworkedPage;