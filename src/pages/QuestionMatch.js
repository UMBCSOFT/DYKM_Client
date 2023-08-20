import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Dropdown, DropdownButton, Row, Card, Container} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useDYKMNetworker } from './DYKM_Networking';
import ButtonOrWait from "../Component/ButtonOrWait";
import DYKMTimer from '../utility/DYKMTimer';
import "../css/Pages.css"

//TODO combine Question and QuestionMatch pages

// pair = [correctPlayer, theirAnswer]
// matchPairList
function MatchDropdown({ pair, matchPairList, callback }) {
    let correctPlayer = pair[0];
    let correctPlayerAnswer = pair[1];
    const [dropdownText, setDropdownText] = useState("Guess author...");

    let playerList = [];
    for (let chosenPlayerData of matchPairList) {
        playerList.push(
            <Dropdown.Item
                key={chosenPlayerData}
                onClick={() => {
                    callback(correctPlayer, correctPlayerAnswer,
                        chosenPlayerData.nickname, chosenPlayerData.answer);
                    setDropdownText(chosenPlayerData.nickname);
                    }
                }
            >
                {chosenPlayerData[0]}
            </Dropdown.Item>
        );
    }

    return (
        <DropdownButton align="end" title={dropdownText}>
            {playerList}
        </DropdownButton>
    );
}

// currentPlayer, pair, matchPairList, callback
function MatchRow({key, pair, matchPairList, callback}) {
    return (
        // Row of an answer + a dropdown of all players
        <Row>
            <Col>{props.pair[1]}</Col>
            <Col xs={2} sm={4}>
                <MatchDropdown
                    key={key}
                    pair={pair}
                    matchPairList={matchPairList}
                    callback={callback}/>
            </Col>
        </Row>
    );
}

function QuestionMatchPage() {

    let options;
    const {
        id,
        question,
        pairs,
        timerSeconds,
        HandleMatchSubmit } = useDYKMNetworker();
    let matchPairList = pairs.filter(function(x) {
        return x.id !== id;
    });
    const [matches, setMatches] = useState({});
    const [doneAnswering , setDoneAnswering] = useState(timerSeconds);

    //Durstenfeld Shuffle
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function ShuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function HandleSubmit() {
        setDoneAnswering(true);
        HandleMatchSubmit(matches.values());
    }

    function HandleDropdownSelect(correctPlayer, correctPlayerAnswer, guessedPlayer, guessedPlayerAnswer) {
        //TODO delete this log, it spoils everything lol
        console.log("Chosen player: ", guessedPlayer + "\nCorrect player: ", correctPlayer);
        let newMatches = matches;
        newMatches[correctPlayer] = [correctPlayer, correctPlayerAnswer, guessedPlayer, guessedPlayerAnswer];
        setMatches(newMatches);
    }

    if(options === undefined) {

        // create a list with a row with a dropdown for each player's answer (except your own)
        options = [];
        for(let pair of matchPairList) {
            options.push(
                <MatchRow
                    key={pair}
                    pair={pair}
                    matchPairList={matchPairList}
                    callback={HandleDropdownSelect}
                />
            );
        }
        ShuffleArray(options);
    }


    useEffect(() => {
        console.log("timer seconds:", timerSeconds);
    }, []);

    return (
        <div className="questionmatch">
            <div className= "mb-2 text-center">
                <h1>Round 1</h1>

                <br />
                <Card>
                    <Card.Body>{question}</Card.Body>
                </Card>

                <br />
                <h4>Match each answer to a player!</h4>
                <DYKMTimer
                    className="MatchTimer"
                    timerSeconds={timerSeconds}/>
                <Card
                    className="MatchRowCard mx-auto px-4 py-2">
                    <Container fluid>
                        {options}
                    </Container>
                </Card>

                <ButtonOrWait label={"Submit Answer"} switchToWait={doneAnswering} callback={()=>HandleSubmit()}/>
            </div>
        </div>
    );

}

export default QuestionMatchPage;

