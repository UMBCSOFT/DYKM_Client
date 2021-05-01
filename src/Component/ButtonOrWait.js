import React from 'react';
import {Button} from "react-bootstrap";

function ButtonOrWait(props) {
    if (props.answer !== null) {
        return (<h2>Waiting for other players...</h2>);
    } else {
        return (
            <Button href="/questionMatch" variant="primary" type="submit" onClick={() => {
                props.SubmitQuestion()
            }}>
                Submit your answer!
            </Button>
        );
    }
}
export default ButtonOrWait;