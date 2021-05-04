import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, ListGroup} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React from 'react';
import {Redirect} from "react-router-dom";
import NetworkedPage from "../utility/NetworkedPage";
import ProgressBar from "react-bootstrap/ProgressBar";

class QuestionMatch extends NetworkedPage {

    constructor() {
        super();
        this.HandleSubmit = this.HandleSubmit.bind(this);
    }

    componentWillMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }

    RespondToSocketMessages(e) {
        super.RespondToSocketMessages(e);

        console.log(e.data);

        /*const transitionToGameMessage = "TRANSITION QUESTION ";
        if (e.data.startsWith(transitionToGameMessage)) {
            this.question = e.data.substr(transitionToGameMessage.length);
            this.setState({redirect: true});
            console.log("Got Question transition WAITING ROOM. Question is " + this.question);
        }*/
    }

    HandleSubmit(e) {
        e.preventDefault();
        this.setState({ redirect: true} );
    }

    render(){
        let rawAnswers = this.props.location.state.playerAnswers

        // Split by semicolons, remove the trailing "" and then combine into consecutive pairs
        let split = rawAnswers.split(";")
        split.pop(); // Get rid of the trailing "" since there's a semicolon at the end
        let even = split.filter((x,i)=>i%2===0);
        let odd  = split.filter((x,i)=>i%2===1);
        this.playerAnswers = even.map((x,i)=>[x, odd[i]]);

        console.log("Player Answers: " + this.playerAnswers);
        if (this.state.redirect) {
            console.log("Transition to Scores");
            return (
                <Redirect to={{
                    pathname: "/scores",
                    state: {
                        id: this.props.location.state.id,
                        roomCode: this.props.location.state.roomCode,
                        name: this.props.location.state.name,
                        url: this.props.location.state.url,
                        question: this.props.location.state.question,
                    }
                }} />
            )
        } else
        {
            let allPlayers = this.playerAnswers.map(x=>x[0]).map(x=><option value={x}> {x}</option>);
            let options = [];
            for(let pair of this.playerAnswers) {
                /* This is what this code generates
                Pair[0] is the player name and pair[1] is their answer
                <ListGroup.Item>
                    Cras justo odio
                    <select>
                        <option value="player 1"> player 1 </option>
                        <option value="player 2"> player 2 </option>
                        <option value="player 3"> player 3 </option>
                    </select>
                </ListGroup.Item>
                */
                options.push(<ListGroup.Item>
                    {pair[1]}
                    <select>
                        {allPlayers}
                    </select>
                </ListGroup.Item>);
            }
            return (
                <div className="questionmatch">

                    <header className="App-header">
                        <div className= "mb-2">
                            <h1>Round 1</h1>

                            <br />
                            <Card border="primary" bg="light" text = "dark">
                                <Card.Body>{this.props.location.state.question}</Card.Body>
                            </Card>

                            <br />
                            <h4>Match each answer to a player!</h4>

                            <Card text = "dark" style={{ width: '30rem' }}>
                                <ListGroup>
                                    {options}
                                </ListGroup>
                            </Card>

                            <div>Please wait until everyone has answered to see the results...</div>
                            <ProgressBar now={80} label={`${60} secs left!`}/>
                        </div>
                    </header>
                </div>
            );

        }
    }
}

export default QuestionMatch;

