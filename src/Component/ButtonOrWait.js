import React from 'react';
import {Button} from "react-bootstrap";

function ButtonOrWait({ switchToWait, callback, className, label, id }) {
    const style = {
    };
    if (switchToWait === true) {
        return (<h2 id={id} style={style}>Waiting for other players...</h2>);
    } else {
        return (
            <Button style={style}
                    id={id}
                    className={className}
                    variant="primary"
                    type="submit"
                    onClick={() => {callback()}}>
                {label}
            </Button>
        );
    }
}
export default ButtonOrWait;
