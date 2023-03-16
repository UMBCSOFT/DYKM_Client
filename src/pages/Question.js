import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import React, { useState, useEffect } from 'react';
import { useDYKMNetworker } from './DYKM_Networking';
import ButtonOrWait from "../Component/ButtonOrWait";

function QuestionPage() {

    let doneAnswering = false;
    const [_timerSeconds, _setTimerSeconds] = useState();
    const [_timerPercent, _setTimerPercent] = useState();

    const {
        SubmitQuestion,
        question,
        setAnswer,
        timerSeconds, timerPercent } = useDYKMNetworker();

    useEffect(() => {
        console.log(timerSeconds, timerPercent);
        _setTimerSeconds(timerSeconds);
        _setTimerPercent(timerPercent);
    }, [timerSeconds, timerPercent]);

    function HandleAnswerChange(e) {
        console.log("Answer submission:", e.target.value);
        setAnswer(e.target.value);
    }

    function HandleSubmitQuestion() {
        doneAnswering = true;
        SubmitQuestion();
    }

    return (
        <div className="question">
            <header className="App-header">
                <div className="prompt">

                    <ProgressBar now={_timerPercent} label={`${_timerSeconds} secs left!`}/>
                    <br/>

                    <h1>QUESTION</h1>

                    <Card border="primary" bg="light" text="dark">
                        <Card.Body>{question}</Card.Body>
                    </Card>

                    <Form.Group>
                        <br/>
                        <Form.Control type="text" placeholder="Type your answer here!" onChange={HandleAnswerChange}/>
                        <br/>
                        <ButtonOrWait label={"Submit Answer"} switchToWait={doneAnswering} callback={() => HandleSubmitQuestion()}/>
                    </Form.Group>
                </div>
            </header>
        </div>
    );
}

export default QuestionPage;
