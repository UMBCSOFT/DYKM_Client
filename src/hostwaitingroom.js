import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './about'
import howtoplay from './howtoplay';
import {Route, Link} from 'react-router-dom'
import {Container, Row, Col, Button, Alert, Nav, Badge, Form} from 'react-bootstrap'
import React from 'react';

function hostwaitingroom(){
    return (
        <div className="hostwaitingroom">
    
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
              <h1>Your Game</h1>
              <h5>
                Your game was created successfully! Share the following ✨ secret code ✨
                with your friends so they can join in on the fun!
              </h5>
            </div>
          
            <div className= "code">
              <h1>Secret Code: 123456</h1>
            </div>

            <div className= "players">
              <h1>Waiting for players to join...</h1>
              <h5>* as players join, their names will show up here * </h5>
            </div>

            <Button href= "/" type="submit" >Start The Game!</Button>


            </container>
            
        </header>
        </div>
      );
    }

export default hostwaitingroom;

