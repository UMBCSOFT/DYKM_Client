import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Dropdown, ListGroup, Row} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React from 'react';
import {Redirect} from "react-router-dom";
import NetworkedPage from "../utility/NetworkedPage";
import ProgressBar from "react-bootstrap/ProgressBar";
import ButtonOrWait from "../Component/ButtonOrWait";

class MatchDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.player = props.player;
        this.matchPairList = props.matchPairList;
        this.callback = props.callback;
        this.callback = this.callback.bind(this);
    }

    GetDropdown() {
        this.playerList = [];
        for (this.pair of this.matchPairList) {
            this.playerList.push(
                <Dropdown.Item onClick={this.props.callback(this.player, this.pair[0])}>
                    {this.pair[0]}
                </Dropdown.Item>
            );
        }
        return <Dropdown>{this.playerList}</Dropdown>;
    }

    render() {
        return(this.GetDropdown());
    }
}

class MatchRow extends React.Component {
    constructor(props) {
        super(props);
        this.player = props.player;
        this.matchPairList = props.matchPairList;
        this.callback = props.callback;
    }

    render() {
        return (
            // Row of an answer + a dropdown of all players
            <Row>
                <Col>{this.player}</Col>
                <Col><MatchDropdown player={this.player} matchPairList={this.matchPairList} callback={this.callback}/></Col>
            </Row>
        );
    }
}

class QuestionMatch extends NetworkedPage {

    constructor(props) {
        super(props);
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.state = {
            matchPairList: this.ConvertMatchStrToList(),
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

    ConvertMatchStrToList() {
        let pairStrList = this.props.location.state.matchPairStr.split(';');
        let pairList = [];
        for (let pStr of pairStrList) {
            pairList.push(pStr.split(','));
        }
        return pairList;
    }

    ConvertMatchesToStr() {
        //TODO copy this into the server so the client and server have the same format
        let matchesList = [];
        for (let m of this.state.matches) {
            matchesList.push(m.join(','));
        }
        return matchesList.join(';')
    }

    HandleSubmit() {
        this.doneAnswering = true;
        const playerMatches = this.ConvertMatchesToStr();
        this.socket.send("DONEMATCHING " + playerMatches); // TODO: Append a semicolon separated list of player numbers. Everyone shares the same player/answer pair list so we can just send indices until we get ids implemented
    }

    HandleDropdownSelect(answer, answerPlayer, guessedPlayer) {
        console.log("Chosen answer: ", guessedPlayer + "\nCorrect answer: ", answerPlayer);
        let newMatches = this.state.matches;
        newMatches.push([answer, answerPlayer, guessedPlayer]);
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
                console.log("Player Answers: " + this.state.matchPairList);

                this.options = [];
                for(let pair of this.state.matchPairList) {
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
                    this.options.push(
                        <MatchRow player={pair[0]} matchPairList={this.state.matchPairList} callback={this.HandleDropdownSelect}/>);
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
                                {this.options}
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

