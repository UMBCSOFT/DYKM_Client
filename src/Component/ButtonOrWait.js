import React from 'react';
import {Button} from "react-bootstrap";

function ButtonOrWait(props) {
    if (props.clicked === true) {
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