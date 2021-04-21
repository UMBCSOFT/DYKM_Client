import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './about'
import howtoplay from './howtoplay';
import {Route, Link} from 'react-router-dom'
import {Container, Row, Col, Button, Alert, Nav, Badge, Form, ListGroup} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

import React from 'react';

function questionmatch(){
    return (
        <div className="questionmatch">
    
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
          <container>
            <div className= "mb-2">
              <h1>Round 1</h1>
              
              <br />
                <Card border="primary" bg="light" text = "dark">
                <Card.Body>* question will be generated here *</Card.Body>
                </Card>

                <br />
                <h4>Match each answer to a player!</h4>

                <Card text = "dark" style={{ width: '30rem' }}>
                <ListGroup variant="flush" >
                    <ListGroup.Item>Cras justo odio
                    </ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                </Card>

                <Form inline>
                <Form.Control
                    as="select"
                    className="my-1 mr-sm-2"
                    id="inlineFormCustomSelectPref"
                    custom
                >
                    <option value="0">Choose...</option>
                    <option value="1">player 1</option>
                    <option value="2">player 2</option>
                    <option value="3">player 3</option>
                </Form.Control>
               
                </Form>

            
            </div>
          </container>
        </header>
        </div>
      );
    }

export default questionmatch;

