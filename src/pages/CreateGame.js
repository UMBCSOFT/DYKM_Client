import '../css/style.css'
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Row, Col, Button, Tab} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDYKMNetworker } from './DYKM_Networking';


function CreateGamePage () {
    const navigate = useNavigate();

    const { roomCode, CreateRoom, gamePack, numRounds, setNumRounds, setGamePack, name, setName} = useDYKMNetworker();

    useEffect(() => {
        setGamePack("doyouknowme");
        setNumRounds(1);
    }, [])

    function handleNameChange(e) {
        console.log("Changing name to", e.target.value)
        setName(e.target.value);
    }

    function radioOnChange(e){
        let value = parseInt(e.target.value);
        setNumRounds(value);
        console.log("Changed rounds to", e.target.value)
    }

    function onPackSelect(e) {
        const pack = e.target.dataset.rbEventKey;
        setGamePack(pack.substr(1)); // Cut off the #
        console.log("Changed game pack to " + pack.substr(1));
    }

    return (
        <div className="App Window-page">
            <div className="Card GameSettings Center w-75">
                <h1>CREATE GAME</h1>
                <Form.Group as={Row} className="w-100 mb-4" id="nickname">
                    <Form.Label column sm={4}>Nickname</Form.Label>
                    <Col className="d-flex align-items-center">
                        <Form.Control type="text" placeholder="Enter a nickname!" value={name} onChange={handleNameChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} id="questionpack" className="w-100 mb-4">
                    <Form.Label column sm={4}>
                        Question Pack
                    </Form.Label>
                    <Col>
                        <Tab.Container id="game-type" defaultActiveKey="#doyouknowme">
                            <Row>
                                <Col>
                                    <ListGroup >
                                        <ListGroup.Item
                                            action
                                            href="#doyouknowme"
                                            onClick={(e)=>onPackSelect(e)}
                                        >
                                            Do You Know Me?
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            action
                                            href="#icebreakers"
                                            onClick={(e)=>onPackSelect(e)}
                                        >
                                            Ice Breakers
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Row>
                                    <Tab.Content onSelect={onPackSelect}>
                                        <Tab.Pane eventKey="#doyouknowme">
                                            Official question pack - see if you <i>really</i> know your friends!
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#icebreakers">
                                            Great question pack to play with new friends!
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Row>
                            </Row>
                        </Tab.Container>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="w-100 mb-4">
                    <Form.Label column sm={4}>
                        Rounds
                    </Form.Label>
                    <Col className="d-flex align-items-center">
                        <Form.Control as="select" onChange={(e)=>radioOnChange(e)}>
                            <option
                                value="1"
                                default={true}
                            >
                                1 Round
                            </option>
                            <option
                                value="5"
                            >
                                5 Rounds
                            </option>
                            <option
                                value="10"
                            >
                                10 Rounds
                            </option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="roomcode" className="w-100 mb-4">
                    <Form.Label column sm={4}>Secret Code</Form.Label>
                    <Col>
                        <Form.Text><b>{roomCode}</b></Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Button size="lg" variant="primary" type="submit" onClick={() =>
                        {
                            CreateRoom(numRounds, gamePack)
                            navigate("/game");
                        }
                    }>Create the game!</Button>
                </Form.Group>
            </div>
        </div>

    );
}
export default CreateGamePage;

