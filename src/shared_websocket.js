// This file is only to be included in index.js. To use the websocket include websocket.js
// MESSAGES incoming to this file:
// WEBSOCKET_CONNECT IP // This will connect or be ignored if already connected
// WEBSOCKET_SEND message
// WEBSOCKET_CLOSE

// OUTGOING MESSAGES:
// WEBSOCKET_ONMESSAGE {json serialized event}
// WEBSOCKET_ONOPEN {json serialized event}
// WEBSOCKET_ONERROR {json serialized event}
// WEBSOCKET_ONCLOSE {json serialized event}
function Post(message) {
    if(this.frame === undefined) {
        this.frame = document.getElementById('Frame').contentWindow;
    }
    this.frame.postMessage(message, "*");
}
function messageHandler(event) {
    let content = event.data;

    if(content.startsWith("WEBSOCKET_CONNECT ")) {
        let rest = content.substring("WEBSOCKET_CONNECT ".length);
        if(this.socket === undefined) {
            this.socket = new WebSocket(rest);
            this.onmessage = (e)=>Post("WEBSOCKET_ONMESSAGE " + JSON.stringify(e));
            this.onopen    = (e)=>Post("WEBSOCKET_ONOPEN " + JSON.stringify(e));
            this.onerror   = (e)=>Post("WEBSOCKET_ONERROR " + JSON.stringify(e));
            this.onclose   = (e)=>{
                this.socket = undefined;
                Post("WEBSOCKET_ONCLOSE " + JSON.stringify(e))
            };
        }
    }
    else if(content.startsWith("WEBSOCKET_SEND ")) {
        let rest = content.substring("WEBOSCKET_CONNECT ".length);
        if(this.socket !== undefined) {
            this.socket.send(rest);
        }
    }
    else if(content.startsWith("WEBSOCKET_CLOSE")) {
        if(this.socket !== undefined) {
            this.socket.close();
        }
    }
    console.log(content);
}
window.addEventListener("message", messageHandler, false);