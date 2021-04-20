import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Nav, Form} from 'react-bootstrap'
import React from 'react';

function joingame(){
    return (
        <div className="joingame">

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
                    <h1>JOIN A GAME</h1>
                    <Form>
                        <Form.Group controlId="nickname">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control type="name" placeholder="Enter a nickname!" />
                        </Form.Group>

                        <Form.Group controlId="secretcode">
                            <Form.Label>Secret Code</Form.Label>
                            <Form.Control type="name" placeholder="Enter the secret code!" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Enter Room
                        </Button>
                    </Form>
                </div>
            </header>
        </div>
    );
}

export default joingame;

