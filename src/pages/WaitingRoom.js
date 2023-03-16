import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import {useDYKMNetworker} from '../pages/DYKM_Networking';

function WaitingRoomPage() {

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
        <div className="waitingroom">

            <header className="App-header">
                <div className="players">
                    <h1>Waiting for more players to join...</h1>
                    {playerElements.length === 0 &&
                    <h5>* as players join, their names will show up here * </h5>}
                    {playerElements}
                </div>
            </header>
        </div>
    );
}

export default WaitingRoomPage;

