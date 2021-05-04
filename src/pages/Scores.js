import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import {Redirect} from "react-router-dom";
import ButtonOrWait from "../Component/ButtonOrWait";

class Scores extends NetworkedPage {
    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
        this.clickedSubmit = false;
        this.isLastRound = false;
        this.wasAbleToTransition = null;
        this.question = null;
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
        this.socket.send("ISLASTROUND");
    }

    RespondToSocketMessages(e, callback) {
        if (e.data.startsWith("ISLASTROUND ")) {
            const response = e.data.substr("IS LAST ROUND ".length);
            this.isLastRound = (response === "TRUE");
            if (this.isLastRound) {
                this.forceUpdate();
            }
        }
        const transitionToGameMessage = "TRANSITION QUESTION ";
        if (e.data.startsWith(transitionToGameMessage)) {
            this.wasAbleToTransition = true;
            this.question = e.data.substr(transitionToGameMessage.length);
            this.setState({redirect: true});
            console.log("Got Question transition SCORES. Question is " + this.question);
        }
        super.RespondToSocketMessages(e, callback);
    }

    HandleClick() {
        this.clickedSubmit = true;
        this.forceUpdate();
        this.socket.send("READYNEXTROUND")
    }

    render() {
        this.IsLastRound();
        if (this.state.redirect) {
            if (this.isLastRound) {
                console.log("Transition to end screen");
                return (
                    //TODO: Make end game screen
                    <Redirect to={{
                        pathname: "/",
                        state: {
                            id: this.props.location.state.id,
                            roomCode: this.props.location.state.roomCode,
                            name: this.props.location.state.name,
                            url: this.props.location.state.url
                        }
                    }}/>
                );
            } else {
                console.log("Transition to next round");
                return (
                    <Redirect to={{
                        pathname: "/question",
                        state: {
                            id: this.props.location.state.id,
                            roomCode: this.props.location.state.roomCode,
                            name: this.props.location.state.name,
                            url: this.props.location.state.url,
                            question: this.question
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
                        <ButtonOrWait label={"Ready?"} switchToWait={this.clickedSubmit} callback={()=>this.HandleClick()}/>
                    </header>
                </div>
            );
        }

    }
}
export default Scores;

