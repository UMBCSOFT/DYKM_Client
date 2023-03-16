import '../css/App.css';
import '../css/Pages.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col, Button, Form} from 'react-bootstrap'
import React, { useState } from 'react';
import { useDYKMNetworker } from './DYKM_Networking';
import { useNavigate } from 'react-router-dom';

function JoinGamePage() {

    const {name, JoinRoom, setName, roomCode, setRoomCode} = useDYKMNetworker();
    const navigate = useNavigate();

    function handleNameChange(e) {
        setName(e.target.value);
    };

    function handleCodeChange(e) {
        setRoomCode(e.target.value);
    };

    function handleJoinGame() {
        JoinRoom();
        navigate("/game");
    }

    return (
        <div className="App Window-page">
            <Form id="JoinGame" className="mb-2 mx-auto w-75 Center Card">
                <h1>JOIN A GAME</h1>
                <Form.Group className="w-100" as={Row} controlId="nickname">
                    <Form.Label column sm={4}>Nickname</Form.Label>
                    <Col className="d-flex align-items-center">
                        <Form.Control type="text" placeholder="Enter a nickname!" onChange={handleNameChange}/>
                    </Col>
                </Form.Group>

                <Form.Group className="w-100" as={Row} controlId="roomcode">
                    <Form.Label column sm={4}>Secret Code</Form.Label>
                    <Col className="d-flex align-items-center">
                        <Form.Control type="text" placeholder="Enter the roomcode!" onChange={handleCodeChange}/>
                    </Col>
                </Form.Group>

                <Button size="lg" variant="primary" type="button" onClick={handleJoinGame}>
                    Join Game
                </Button>
            </Form>
        </div>
    );
}

export default JoinGamePage;

