import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col, Button, Nav, Form, Tab} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import React from 'react';
import { Redirect, Link } from "react-router-dom";
import NetworkedPage from './NetworkedPage'

// TODO: Made a "NetworkedPage" class with all of this stuff
// to inherit from
class CreateGamePage extends NetworkedPage {

    constructor(props) {
        super(props);
        this.CreateRoom = this.CreateRoom.bind(this);
    };

    CreateRoom() {
        console.log("CreateRoom()");
        const Http = new XMLHttpRequest();
        const url = "http://localhost:".concat(this.PORT, "/room/create");
        console.log("URL: ".concat(url));
        Http.addEventListener('load', () => this.CreateRoomHTTPCallback(Http));
        Http.open("POST", url);
        console.log("Opened POST request")
        Http.send();
        console.log("Sent post");
    }

    RespondToSocketMessages(e) {
        if (e.data.toString().startsWith("WELCOME ")) {
            this.setState({ redirect: true})
            //this.ChangePage('/hostwaitingroom');
        }
        super.RespondToSocketMessages(e);
    }

    render() {
        if (this.state.redirect) {
            console.log("Roomcode in creategame: " + '\n' + this.state.roomCode);
            return (
                <Redirect to={{
                    pathname: "/hostwaitingroom",
                    state: {
                        id: this.state.id,
                        roomCode: this.state.roomCode
                    }
                }} />
            )
        }
        else {
            return (
                <div className="creategame">

                    {/*TODO: consolidate the header code somewhere*/}
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/howtoplay">How To Play</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                                Disabled
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <header className="App-header">
                        <div className= "mb-2">
                            <h1>CREATE GAME</h1>
                            <div id={"CreateGameSettings"}>
                                <Form.Group as={Row} id="nickname">
                                    <Form.Label column sm={2}>
                                        Nickname
                                    </Form.Label>
                                    <Col sm={10}>
                                        <input type="text" placeholder="Enter a nickname!" value={this.state.name} onChange={this.handleNameChange}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} id="questionpack">
                                    <Form.Label column sm={2}>
                                        Question Pack
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                                            <Row>
                                                <Col sm = "auto">
                                                    <ListGroup>
                                                        <ListGroup.Item  action href="#link1">
                                                            Do You Know Me?
                                                        </ListGroup.Item>
                                                        <ListGroup.Item action href="#link2">
                                                            Ice Breakers
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                                <Col sm={8}>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="#link1">
                                                            Official question pack - see if you <i>really</i> know your friends!
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="#link2">
                                                            Great question pack to play with new friends!
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>
                                    </Col>
                                </Form.Group>

                                <fieldset>
                                    <Form.Group as={Row}>
                                        <Form.Label as="legend" column sm={2}>
                                            Rounds
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Check
                                                type="radio"
                                                label="1 Round"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="5 Rounds"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios2"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="10 Rounds"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios3"
                                            />
                                        </Col>
                                    </Form.Group>
                                </fieldset>

                                <Form.Group controlId="roomcode">
                                    <Form.Label>Secret Code</Form.Label>
                                    <Form.Text><b>{this.state.roomCode}</b></Form.Text>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Button variant="primary" type="submit" onClick={() => this.CreateRoom()}>Create the game!</Button>
                                    </Col>
                                </Form.Group>
                            </div>
                        </div>
                    </header>
                </div>

            );
        }
    }
};
export default CreateGamePage;

