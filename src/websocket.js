class DYKM_Websocket {
    constructor(url) {
        window.postMessage("WEBSOCKET_CONNECT " + url, "*");

        this.onmessage = null;
        this.onclose = null;
        this.onerror = null;
        this.onopen = null;
        window.addEventListener("message", this._messageHandler, false);
    }

    send(message) {
        window.postMessage("WEBSOCKET_SEND " + message, "*");
    }

    close() {
        window.postMessage("WEBSOCKET_CLOSE", "*");
    }

    _messageHandler(event) {
        let content = event.data;
        if(content.startsWith("WEBSOCKET_ONMESSAGE ")) {
            let json = content.substring("WEBSOCKET_ONMESSAGE ".length);
            let event = JSON.parse(json);
            if(this.onmessage) {
                this.onmessage.call(event);
            }
        }
        else if(content.startsWith("WEBSOCKET_ONOPEN ")) {
            let json = content.substring("WEBSOCKET_ONOPEN ".length);
            let event = JSON.parse(json);
            if(this.onopen) {
                this.onopen.call(event);
            }
        }
        else if(content.startsWith("WEBSOCKET_ONERROR ")) {
            let json = content.substring("WEBSOCKET_ONERROR ".length);
            let event = JSON.parse(json);
            if(this.onerror) {
                this.onerror.call(event);
            }
        }
        else if(content.startsWith("WEBSOCKET_ONCLOSE ")) {
            let json = content.substring("WEBSOCKET_ONCLOSE ".length);
            let event = JSON.parse(json);
            if(this.onclose) {
                this.onclose.call(event);
            }
        }
        else{
            console.log("Unhandled DYKM Websocket event `" + content + "`")
        }
        //event.source.postMessage(,event.origin)
        console.log(content);
    }
}

module.exports = [DYKM_Websocket];