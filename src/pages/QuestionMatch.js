import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Dropdown, DropdownButton, Row, Card} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useDYKMNetworker } from './DYKM_Networking';
import ProgressBar from "react-bootstrap/ProgressBar";
import ButtonOrWait from "../Component/ButtonOrWait";


// currentPlayer, pair[correctPlayer, theirAnswer], matchPairList, callback
function MatchDropdown(props) {
    let correctPlayer = props.pair[0];
    let correctPlayerAnswer = props.pair[1];
    const [dropdownText, setDropdownText] = useState("Guess author...");

    let playerList = [];
    for (let chosenPlayerPair of props.matchPairList) {
        if (chosenPlayerPair[0] === props.currentPlayer) continue;
        playerList.push(
            <Dropdown.Item key={chosenPlayerPair}
                           onClick={() => {
                props.callback(correctPlayer, correctPlayerAnswer,
                               chosenPlayerPair[0], chosenPlayerPair[1]);
                setDropdownText(chosenPlayerPair[0]);}}
            >
                {chosenPlayerPair[0]}
            </Dropdown.Item>
        );
    }

    return (
        <DropdownButton title={dropdownText}>
            {playerList}
        </DropdownButton>
    );
}

// currentPlayer, pair, matchPairList, callback
function MatchRow(props) {
    return (
        // Row of an answer + a dropdown of all players
        <Row>
            <Col>{props.pair[1]}</Col>
            <Col><MatchDropdown
                key={props.pair}
                currentPlayer={props.currentPlayer}
                pair={props.pair}
                matchPairList={props.matchPairList}
                callback={props.callback}/>
            </Col>
        </Row>
    );
}

function QuestionMatchPage() {

    let options;
    let doneAnswering = false;
    const {
        name,
        question,
        pairs,
        timerPercent,
        timerSeconds,
        HandleMatchSubmit } = useDYKMNetworker();
    const matchPairList = ConvertNameAnswerPairsStrToList(pairs);
    const [matches, setMatches] = useState({});


    //Durstenfeld Shuffle
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function ShuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function ConvertNameAnswerPairsStrToList(_pairs) {
        let _pairstrList = _pairs.split(';');
        let pairList = [];
        for (let pStr of _pairstrList) {
            let matchStr = pStr.split(',');
            if (matchStr[0] === name) continue;
            pairList.push(matchStr);
        }
        return pairList;
    }

    function HandleSubmit() {
        doneAnswering = true;
        HandleMatchSubmit(matches);
    }

    function HandleDropdownSelect(correctPlayer, correctPlayerAnswer, guessedPlayer, guessedPlayerAnswer) {
        console.log("Chosen player: ", guessedPlayer + "\nCorrect player: ", correctPlayer);
        let newMatches = matches;
        newMatches[[correctPlayer, correctPlayerAnswer].join("-->")] = [correctPlayer, correctPlayerAnswer, guessedPlayer, guessedPlayerAnswer];
        setMatches(newMatches);
    }

    if(options === undefined) {

        // create a list with a row with a dropdown for each player's answer (except your own)
        options = [];
        for(let pair of matchPairList) {
            if (pair[0] === name) continue;
            options.push(
                <MatchRow
                    key={pair}
                    currentPlayer={name}
                    pair={pair}
                    matchPairList={matchPairList}
                    callback={HandleDropdownSelect}
                />
            );
        }
        ShuffleArray(options);
    }


    useEffect(() => {
        console.log("Question match page");
    }, []);
    return (
        <div className="questionmatch">

            <header className="App-header">
                <div className= "mb-2">
                    <h1>Round 1</h1>

                    <br />
                    <Card border="primary" bg="light" text = "dark">
                        <Card.Body>{question}</Card.Body>
                    </Card>

                    <br />
                    <h4>Match each answer to a player!</h4>

                    <Card text = "dark" style={{ width: '100%' }}>
                        {options}
                    </Card>

                    <ProgressBar now={timerPercent} label={`${timerSeconds} secs left!`}/>
                    <ButtonOrWait label={"Submit Answer"} switchToWait={doneAnswering} callback={()=>HandleSubmit()}/>
                </div>
            </header>
        </div>
    );

}

export default QuestionMatchPage;

