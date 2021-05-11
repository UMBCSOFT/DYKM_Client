import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import {Redirect} from "react-router-dom";

class WaitingRoom extends NetworkedPage {

    constructor(props) {
        super(props);
        this.socket = undefined;
        this.playerElements = [];
    };

    componentDidMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }

    RespondToSocketMessages(e) {
        if(this.socket === undefined) return;
        super.RespondToSocketMessages(e);

        console.log(e.data);

        const transitionToGameMessage = "TRANSITION QUESTION ";
        if (e.data.startsWith(transitionToGameMessage)) {
            this.question = e.data.substr(transitionToGameMessage.length);
            this.setState({redirect: true});
            console.log("Got Question transition WAITING ROOM. Question is " + this.question);
        }

        const playerUpdateMessage = "PLAYERUPDATE ";
        if (e.data.startsWith(playerUpdateMessage)) {
            let playerNames = e.data.substr(playerUpdateMessage.length).split(";"); // TODO: people can put ; in their name and break this
            this.playerElements = playerNames.map(x=><h5>{x}</h5>);
            this.forceUpdate();
        }
    }

    render() {
        if (this.state.redirect) {
            this.CloseNetworkedPage();
            return (
                <Redirect to={{
                    pathname: "/Question",
                    state: {
                        id: this.props.location.state.id,
                        roomCode: this.state.roomCode,
                        name: this.props.location.state.name,
                        url: this.props.location.state.url,
                        question: this.question,
                    }
                }}/>
            );
        }
        else {
            return (
                <div className="waitingroom">

                    <header className="App-header">
                        <div className="players">
                            <h1>Waiting for more players to join...</h1>
                            {this.playerElements.length === 0 &&
                            <h5>* as players join, their names will show up here * </h5>}
                            {this.playerElements}
                        </div>
                    </header>
                </div>
            );
        }
    }
}

export default WaitingRoom;

