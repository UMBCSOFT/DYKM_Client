import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './about'
import howtoplay from './howtoplay';
import {Route, Link} from 'react-router-dom'
import {Container, Row, Col, Button, Alert, Nav, Badge, Form} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import React from 'react';

const now = 60;

function question(){
    return (
        
        <div className="question">
    
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
            <div className= "prompt">

            <ProgressBar now={now} label={`${now} secs left!`} />
            <br />

                <h1>QUESTION</h1>

                <Card border="primary" bg="light" text = "dark">
                <Card.Body>* question will be generated here *</Card.Body>
                </Card>
                
                <Form.Group>

            
                    <br />
                    <Form.Control as="text">
                        <option>Type your answer here!</option>
                    </Form.Control>

                    <br />

                    
                    <Button href= "/questionmatch" variant="primary" type="submit">
                    Submit your answer!
                </Button>
                   
                </Form.Group>

                
              
            </div>
            </container>
            
        </header>
        </div>
      );
    }

export default question;

