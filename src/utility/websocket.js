class DYKM_Websocket {
    constructor(url) {
        this.url = url;
    }
    _Post(msg) {
        window.parent.postMessage(msg, "*");
    }

    connect() {
        window.addEventListener("message", (e)=>{
            this._messageHandler(e, this);
        }, false);
        this._Post("WEBSOCKET_CONNECT " + this.url);
    }

    send(message) {
        console.log("Sending message from child to parent " + message);
        this._Post("WEBSOCKET_SEND " + message);
    }

    set onmessage(pls) {
        throw new Error("Do not use socket.onmessage = func, use setOnMessage(this, func)");
    }
    set onerror(pls) {
        throw new Error("Do not use socket.onerror = func, use setOnError(this, func)");
    }
    set onopen(pls) {
        throw new Error("Do not use socket.onopen = func, use setOnOpen(this, func)");
    }
    set onclose(pls) {
        throw new Error("Do not use socket.onclose = func, use setOnClose(this, func)");
    }

    setOnMessage(context, func) {
        if(func === undefined) {
            this._onmessage = undefined;
            return;
        }
        this._onmessage = func.bind(context);
    }

    setOnError(context, func) {
        if(func === undefined) {
            this._onerror = undefined;
            return;
        }
        this._onerror = func.bind(context);
    }

    setOnOpen(context, func) {
        if(func === undefined) {
            this._onopen = undefined;
            return;
        }
        this._onopen = func.bind(context);
    }

    setOnClose(context, func) {
        if(func === undefined) {
            this._onclose = undefined;
            return;
        }
        this._onclose = func.bind(context);
    }

    close() {
        this._Post("WEBSOCKET_CLOSE");
    }

    _messageHandler(event, socket) {
        if(event.source === window) {
            return;
        }
        if(event.target !== window) {
            return;
        }
        let content = event.data;
        if(content.startsWith("WEBSOCKET_ONMESSAGE ")) {
            let json = content.substring("WEBSOCKET_ONMESSAGE ".length);
            let event = JSON.parse(json);
            console.log(json);
            console.log(event);
            console.log(socket._onmessage);
            if(socket._onmessage) {
                socket._onmessage(event);
            }
        }
        else if(content.startsWith("WEBSOCKET_ONOPEN ")) {
            console.log("Received WEBSOCKET_ONOPEN " + socket._onopen)
            let json = content.substring("WEBSOCKET_ONOPEN ".length);
            let event = JSON.parse(json);
            if(socket._onopen) {
                socket._onopen(event);
            }
        }
        else if(content.startsWith("WEBSOCKET_ONERROR ")) {
            let json = content.substring("WEBSOCKET_ONERROR ".length);
            let event = JSON.parse(json);
            if(socket._onerror) {
                socket._onerror(event);
            }
        }
        else if(content.startsWith("WEBSOCKET_ONCLOSE ")) {
            let json = content.substring("WEBSOCKET_ONCLOSE ".length);
            let event = JSON.parse(json);
            if(socket._onclose) {
                socket._onclose(event);
            }
        }
        else{
            console.log("Unhandled DYKM Websocket event `" + content + "`")
        }
    }
}
export {DYKM_Websocket}