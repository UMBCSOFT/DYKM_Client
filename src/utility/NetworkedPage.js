import React from 'react';

class NetworkedPage extends React.Component {

    constructor(props) {
        super(props);
        this.HandleNameChange = this.HandleNameChange.bind(this);
        this.OnOpenWebsocket = this.OnOpenWebsocket.bind(this);
        this.ConnectToWebsocket = this.ConnectToWebsocket.bind(this);
        this.JoinRoom = this.JoinRoom.bind(this);
        this.HTTPOnReadyStateChangeHandler = this.HTTPOnReadyStateChangeHandler.bind(this);

        this.PORT = 1337;
        this.REQ_STATES = {
            UNSET: 0,
            OPENED: 1,
            HEADERS_RECEIVED: 2,
            LOADING: 3,
            DONE: 4
        };

        console.log("State:", this.state);
        if (!this.state) {
            console.log("State doesn't exist. Declaring.");
            this.state = {
                roomCode: "No room code",
                redirect: false,
                name: "",
                url: undefined
            }
        }

        if (this.state && this.state.url) {
            console.log("State exists; reconnecting.");
            this.ConnectToWebsocket();
        }

    };

    HTTPOnReadyStateChangeHandler(Http, _roomCode, _username) {
        console.log("ONREADYCHANGESTATEHANDLER");
        if (Http.readyState === this.REQ_STATES.DONE) {
            if(Http.status === 200) {
                console.log(`Connecting to websocket with:\nURL: ${Http.responseText}\nRoomcode: ${_roomCode}`)
                if (_username) {
                    this.ConnectToWebsocket(Http.responseText, _roomCode, _username);
                }
                else {
                    this.ConnectToWebsocket(Http.responseText, _roomCode);
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
            // this is where ConnectToWebsocket is called
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
            if(json["roomCode"] === undefined) {
                alert("Unable to generate room code for this game room.");
                return;
            }
            console.log("Sent request to make room successfully.");
            this.setState( {roomCode: json["roomCode"]}, () => {
                callback(json["roomCode"]);
            });
        }
        else {
            console.log("state: " + this.readyState.toString());
        }
    };

    RespondToSocketMessages(e) {
        if(e === undefined || this.socket === undefined) {
            console.log(`== RespondToSocketMessages ==\ne: ${e.data}\nthis.socket: ${this.socket}`);
            return;
        }
        // Respond to heartbeats
        if(e.data === "PING") {
            this.socket.send("PONG");
        }

        else if (e.data.startsWith("WELCOME ")) {
            this.setState({id: e.data.substring("WELCOME ".length)});
            console.log("Setting player id to " + e.data.substring("WELCOME ".length));
        }

        else if (e.data.startsWith("REJOINED ")) {
            console.log("Reconnected!");
        }
    };

    OnOpenWebsocket(_roomCode, doReconnect=false) {
        if (!doReconnect) {
            console.log(`[websocket open] Connection established\nAttempting to join room ${_roomCode}`);
            this.socket.send("JOIN " + _roomCode);
        }
        else {
            console.log(`[websocket open] Connection established\nAttempting to rejoin room ${_roomCode} with id ${this.state.id}`);
            this.socket.send("REJOIN " + this.state.roomCode + this.state.id);
        }
    }

    HandleWebsocketClose(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
    }


    ConnectToWebsocket(_url, _roomCode, _name) {
        let reconnect = false;
        if (_url && _roomCode) {
            this.setState({url: _url});
            console.log(`Roomcode is ${_roomCode}`);
        }
        else {
            console.log(`Reconnecting to websocket.\nURL: ${this.state.url}\nRoomcode: ${this.state.roomCode}\nName: ${this.state.name}\nID: ${this.state.id}`);
            reconnect = true;
        }
        this.socket = new WebSocket(this.state.url);
        this.socket.addEventListener('message', this.RespondToSocketMessages);
        this.socket.addEventListener('close', this.HandleWebsocketClose);
        this.socket.addEventListener('error', this.HandleWebsocketError);
        this.socket.addEventListener('open', () => this.OnOpenWebsocket(_roomCode, reconnect));

        //this.socket.setOnOpen(this, () => this.OnOpenWebsocket(roomCode_));
        //this.socket.connect(); // NOTE: We need this even though usually with a normal websocket you don't. REMEMBER THIS
    }

    CloseNetworkedPage() {
        // Shutdown any socket stuff but keep the underlying connection in websocket.js open
        console.log("Closing networked page.");
        this.socket.removeEventListener('message', this.RespondToSocketMessages);
        this.socket.removeEventListener('close', this.HandleWebsocketClose);
        this.socket.removeEventListener('error', this.HandleWebsocketError);
        this.socket.removeEventListener('open', () => this.OnOpenWebsocket());
    }

    HandleNameChange(e) {
        this.setState({name: e.target.value})
    };
}

export default NetworkedPage;
