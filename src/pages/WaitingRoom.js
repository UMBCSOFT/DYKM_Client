import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";

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
        return (
            <div className="waitingroom">

                <header className="App-header">
                    <container>
                        <div className="players">
                            <h1>Waiting for more players to join...</h1>
                            {this.playerElements.length === 0 && <h5>* as players join, their names will show up here * </h5>}
                            {this.playerElements}
                            <Button href="/example" type="submit">go to example page</Button>
                        </div>
                    </container>

                </header>
            </div>
        );
    }
}

export default WaitingRoom;

