import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import {Redirect} from "react-router-dom";

class Scores extends NetworkedPage {
    constructor() {
        super();
    }

    componentWillMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }

    ScoreContent(props) {
        let content = null;
        const scoreInfo = this.socket.send("GET SCORES " + props.location.state.id.toString);
        return ("FORMATTED SCORE INFO HERE");
        //TODO format score info
    };

    IsLastRound() {
        return this.socket.send("IS LAST ROUND");
    }

    render() {
        if (this.state.redirect) {
            if (this.IsLastRound()) {
                console.log("Transition to next round");
                return (
                    <Redirect to={{
                        pathname: "/question",
                        state: {
                            id: this.state.id,
                            roomCode: this.state.roomCode,
                            name: this.state.name,
                            url: this.url,
                        }
                    }}/>
                );
            } else {
                console.log("Transition to end screen");
                return (
                    //TODO: Make end game screen
                    <Redirect to={{
                        pathname: "/",
                        state: {
                            id: this.state.id,
                            roomCode: this.state.roomCode,
                            name: this.state.name,
                            url: this.url,
                        }
                    }}/>
                );
            }
        } else {
            return (
                <div className="scores">
                    <header className="App-header">
                        <h1>SCORE PAGE</h1>
                        {this.ScoreContent(this.props)}
                    </header>
                </div>
            );
        }

    }
}
export default Scores;

