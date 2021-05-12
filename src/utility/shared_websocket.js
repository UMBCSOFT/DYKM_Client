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
window.Post = function(message) {
    if(window.frame === undefined) {
        window.frame = document.getElementById('Frame').contentWindow;
    }
    window.frame.postMessage(message);
}

function stringifyEvent(e) {
    const obj = {};
    for (let k in e) {
        obj[k] = e[k];
    }
    return JSON.stringify(obj, (k, v) => {
        if (v instanceof Node) return 'Node';
        if (v instanceof Window) return 'Window';
        return v;
    }, ' ');
}

function messageHandler(event) {
    if(event.source === window) {
        return;
    }
    if(event.currentTarget !== window) {
        return;
    }
    let content = event.data;
    if(content.startsWith("WEBSOCKET_ONMESSAGE")
        || content.startsWith("WEBSOCKET_ONOPEN")
        || content.startsWith("WEBSOCKET_ONERROR")
        || content.startsWith("WEBSOCKET_ONCLOSE")) {
        return; // These are outgoing messages only. For whatever reason the parent window is getting these messages when we send them to the child???? Idk
    }
    if(content.startsWith("WEBSOCKET_CONNECT ")) {
        let rest = content.substring("WEBSOCKET_CONNECT ".length);
        if(window.socket === undefined) {
            window.socket = new WebSocket(rest);
            window.socket.onmessage = (e)=>{
                window.Post("WEBSOCKET_ONMESSAGE " + stringifyEvent(e));
            }
            window.socket.onopen    = (e)=>{
                window.Post("WEBSOCKET_ONOPEN " + stringifyEvent(e))
            };
            window.socket.onerror   = (e)=>{
                window.Post("WEBSOCKET_ONERROR " + stringifyEvent(e))
            };
            window.socket.onclose   = (e)=>{
                window.socket = undefined;
                window.Post("WEBSOCKET_ONCLOSE " + stringifyEvent(e))
            };

            if(window.socketurl === rest) {
                window.Post("WEBSOCKET_ONOPEN null")
                console.log("Sending fake onopen since this is a resume");
            }

            window.socketurl = rest;
        }
    }
    else if(content.startsWith("WEBSOCKET_SEND ")) {
        console.log(content)
        let rest = content.substring("WEBSOCKET_SEND ".length);
        if(window.socket !== undefined) {
            window.socket.send(rest);
        }
    }
    else if(content.startsWith("WEBSOCKET_CLOSE")) {
        if(window.socket !== undefined) {
            window.socket.close();
        }
    }
    else {
        console.log("UNHANDLED " + content);
    }
}
window.addEventListener("message", messageHandler, false);