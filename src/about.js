import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//import About from './about'
import howtoplay from './howtoplay';
import {Route, Link} from 'react-router-dom'
import {Container, Row, Col, Button, Alert, Nav, Badge} from 'react-bootstrap'
import React from 'react';

function About(){
    return (
        <div className="About">
    
        <Nav variant="pills" defaultActiveKey="/about">
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
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
              <h1>About</h1>
              <h5>
                This game was created as a project for Software Engineering I (CMSC 447) at UMBC, Spring 2021
              </h5>
            </div>
            
            <div className= "mb-2">
              <h1>Meet Team SOFT</h1>
              <h5>
                Lorem ipsum dolor 
                </h5>
            </div>
            </container>
            
        </header>
        </div>
      );
    }

export default About;

