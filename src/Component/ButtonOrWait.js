import React from 'react';
import {Button} from "react-bootstrap";

function ButtonOrWait(props) {
    if (props.answer !== null) {
        return (<h2>Waiting for other players...</h2>);
    } else {
        return (
            <Button variant="primary" type="submit" onClick={() => {
                props.Callback()
            }}>
                Submit your answer!
            </Button>
        );
    }
}
export default ButtonOrWait;