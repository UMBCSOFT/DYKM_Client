import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect } from 'react';
import { useDYKMNetworker } from './DYKM_Networking';
import ButtonOrWait from "../Component/ButtonOrWait";
import DYKMTimer from "../utility/DYKMTimer";

function QuestionPage() {

    const [_timerSeconds, _setTimerSeconds] = useState();
    const [_timerPercent, _setTimerPercent] = useState();
    const [doneAnswering, setDoneAnswering] = useState(false);

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
        setDoneAnswering(true);
        SubmitQuestion();
    }
    //<ProgressBar striped now={_timerPercent} label={`${_timerSeconds} secs left!`}/>

    return (
        <div className="question">
                <div className="prompt">
                    <br/>
                    <h1 className='text-center'>QUESTION</h1>

                    <Card>
                        <Card.Body>{question}</Card.Body>
                    </Card>

                    <Form.Group className='text-center'>
                        <br/>
                        <DYKMTimer timerSeconds={60}/>
                        <Form.Control type="text" placeholder="Type your answer here!" onChange={HandleAnswerChange}/>
                        <br/>
                        <ButtonOrWait label={"Submit Answer"} switchToWait={doneAnswering} callback={() => HandleSubmitQuestion()}/>
                    </Form.Group>
                </div>
        </div>
    );
}

export default QuestionPage;
