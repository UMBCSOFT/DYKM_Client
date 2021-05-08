import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListGroup} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React from 'react';
import {Redirect} from "react-router-dom";
import NetworkedPage from "../utility/NetworkedPage";
import ProgressBar from "react-bootstrap/ProgressBar";
import ButtonOrWait from "../Component/ButtonOrWait";

class QuestionMatch extends NetworkedPage {

    constructor() {
        super();
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.state = {
            matches: []
        }
    }

    componentWillMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
        this.socket.send("REQUESTTIMER");
        this.setState({
            timerSeconds: this.GetTimerSeconds(),
            timerPercent: this.GetTimerPercent()
        })
    }

    RespondToSocketMessages(e) {
        if(this.socket === undefined) return;
        super.RespondToSocketMessages(e);

        console.log(e.data);

        const transitionToGameMessage = "TRANSITION SCORE";

        if (e.data.startsWith(transitionToGameMessage)) {
            console.log("Transitioning to score screen");
            this.setState({redirect: true});
            return;
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
            requestAnimationFrame(()=>this.TimerHandler());
        }
    }

    TimerHandler() {
        this.setState({
            timerSeconds: this.GetTimerSeconds(),
            timerPercent: this.GetTimerPercent()
        })
        if(this.state.timerEnd - new Date().getTime() > 0)
            requestAnimationFrame(()=>this.TimerHandler()); // We're using requestAnimationFrame so this runs at the apps framerate
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

    HandleSubmit() {
        this.doneAnswering = true;
        const playerMatches = this.CompileMatches();
        this.socket.send("DONEMATCHING " + playerMatches); // TODO: Append a semicolon separated list of player numbers. Everyone shares the same player/answer pair list so we can just send indices until we get ids implemented
    }

    CompileMatches() {
        let matchesStr = "";
        let matchesList = [];
        for (let m of this.state.matches) {
            matchesStr.push(m.join(','));
        }
        matchesList.join(';')
    }

    SelectChange(answerAuthor, trueAnswer, chosenAnswer) {
        console.log("Chosen answer: ", chosenAnswer);
        let newMatches = this.state.matches;
        newMatches.push([answerAuthor, trueAnswer, chosenAnswer]);
        this.setState({
            matches: newMatches
        });
    }

    render(){
        if (this.state.redirect) {
            this.CloseNetworkedPage();
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
        } else {
            if(this.options === undefined) {
                let rawAnswers = this.props.location.state.playerAnswers

                // Split by semicolons, remove the trailing "" and then combine into consecutive pairs
                let split = rawAnswers.split(";")
                split.pop(); // Get rid of the trailing "" since there's a semicolon at the end
                let even = split.filter((x,i)=>i%2===0);
                let odd  = split.filter((x,i)=>i%2===1);
                this.playerAnswers = even.map((x,i)=>[x, odd[i]]);

                console.log("Player Answers: " + this.playerAnswers);

                let allPlayers = this.playerAnswers.map((x,i)=><option value={i}> {x[0]}</option>);
                this.options = [];
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
                    this.options.push(<ListGroup.Item>
                        {pair[1]}
                        <select onChange={(value)=>this.SelectChange(pair[0], pair[1], value)}>
                            {allPlayers}
                        </select>
                    </ListGroup.Item>);
                }
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
                                    {this.options}
                                </ListGroup>
                            </Card>

                            <ProgressBar now={this.state.timerPercent} label={`${this.state.timerSeconds} secs left!`}/>
                            <ButtonOrWait label={"Submit Answer"} switchToWait={this.doneAnswering} callback={()=>this.HandleSubmit()}/>
                        </div>
                    </header>
                </div>
            );

        }
    }
}

export default QuestionMatch;

