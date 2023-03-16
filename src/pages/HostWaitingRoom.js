import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import {useDYKMNetworker} from '../pages/DYKM_Networking';
import {Navigate} from "react-router-dom";

function HostWaitingRoom(props) {

    const [playerElements, setPlayerElements] = useState([]);
    const {StartGame, playerNames, roomCode} = useDYKMNetworker();

    // create player name elements from their names
    useEffect(() => {
        let elems = [];
        for (let name of playerNames) {
            elems.push(<h5 key={name}>{name}</h5>);
        }
        setPlayerElements(elems);
    }, [playerNames]);

    return (
        <div className="hostwaitingroom">
            <header className="App-header">
                <div className="mb-2">
                    <h1>Your Game</h1>
                    <h5>
                        Your game was created successfully! Share the following ✨ secret code ✨
                        with your friends so they can join in on the fun!
                    </h5>
                </div>

                <div className="code">
                    <Form.Text><h1>Secret Code: <b>{roomCode}</b></h1></Form.Text>
                </div>

                <div className="players">
                    <h1>Waiting for players to join...</h1>
                    {playerElements.length === 0 && <h5>* as players join, their names will show up here * </h5>}
                    {playerElements}
                </div>

                <Button type="submit" onClick={StartGame}>Start The Game!</Button>
            </header>
        </div>
    );
}

export default HostWaitingRoom;

