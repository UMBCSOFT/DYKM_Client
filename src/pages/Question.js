import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import {Redirect} from "react-router-dom";

class Question extends NetworkedPage {
    doneAnswering = false;
    constructor() {
        super();
        this.SubmitQuestion = this.SubmitQuestion.bind(this);
        this.HandleAnswerChange = this.HandleAnswerChange.bind(this);
        this.answer = null;
    }

    componentDidMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
        this.socket.send("REQUESTTIMER");
        requestAnimationFrame(()=>this.TimerHandler());
    }

    RespondToSocketMessages(e) {
        super.RespondToSocketMessages(e);

        console.log(e.data);

        const transitionToGameMessage = "TRANSITION QUESTIONMATCH ";

        if (e.data.startsWith(transitionToGameMessage)) {
            let pairs = e.data.substr(transitionToGameMessage.length);
            console.log("Server told us to transition to QUESTIONMATCH. Transitioning...");
            console.log("Pairs: ", pairs);
            this.setState({redirect: true, pairs: pairs});
        }

        const timerMessage = "TIMER ";
        if (e.data.startsWith(timerMessage)) {
            let timer = e.data.substr(timerMessage.length);
            console.log("Got timer data " + timer);
            let startAndEnd = timer.split(";").map(x=>parseInt(x));
            this.setState({
                timerStart: startAndEnd[0],
                timerEnd: startAndEnd[1]
            });
        }
    }

    TimerHandler() {
        this.setState({
            timerSeconds: this.GetTimerSeconds(),
            timerPercent: this.GetTimerPercent()
        })
        requestAnimationFrame(()=>this.TimerHandler()); // We're using requestAnimationFrame so this runs at the apps framerate
    }

    SubmitQuestion() {
        this.socket.send("ANSWER " + this.answer);
        console.log("Sending answer " + this.answer);
        this.doneAnswering = true;
        this.forceUpdate();
        //TODO use interval to wait for server to tell client that other players are done
    }

    HandleAnswerChange(e) {
        this.answer = e.target.value;
    }

    GetTimerSeconds() {
        if(this.state.timerStart && this.state.timerEnd) {
            return Math.max(Math.floor((this.state.timerEnd - new Date().getTime())/1000), 0);
        }
        return 0;
    }
    GetTimerPercent() {
        if(this.state.timerStart && this.state.timerEnd) {
            let elapsed = this.state.timerEnd - new Date().getTime();
            let percent = elapsed / (this.state.timerEnd - this.state.timerStart);
            return Math.min(Math.max(percent * 100, 0), 100);
        }
        return 100;
    }

    render() {
        if (this.state.redirect) {
            console.log("Transition to Match");
            console.log("Pairs before transition: ", this.state.pairs);
            return (
                <Redirect to={{
                    pathname: "/questionmatch",
                    state: {
                        id: this.props.location.state.id,
                        roomCode: this.props.location.state.roomCode,
                        name: this.props.location.state.name,
                        url: this.props.location.state.url,
                        question: this.props.location.state.question,
                        playerAnswers: this.state.pairs,
                    }
                }} />
            );
        } else {
            return (
                <div className="question">
                    <header className="App-header">
                        <div className="prompt">

                            <ProgressBar now={this.state.timerPercent} label={`${this.state.timerSeconds} secs left!`}/>
                            <br/>

                            <h1>QUESTION</h1>

                            <Card border="primary" bg="light" text="dark">
                                <Card.Body>{this.props.location.state.question}</Card.Body>
                            </Card>

                            <Form.Group>
                                <br/>
                                <Form.Control as="text">
                                    {/*TODO add text box and listener, send question w/ WS*/}
                                    <input type="text" placeholder="Type your answer here!" onChange={this.HandleAnswerChange}/>
                                </Form.Control>
                                <br/>
                                {!this.doneAnswering && <Button answer={this.answer} onClick={()=>this.SubmitQuestion()}>Submit Answer</Button>}
                                {this.doneAnswering && <h2>Waiting for other players...</h2>}
                            </Form.Group>
                        </div>
                    </header>
                </div>
            );
        }
    }

}

export default Question;

