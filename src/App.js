import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './about'
import howtoplay from './howtoplay';
import creategame from './creategame';
import joingame from './joingame';
import {Route, Link} from 'react-router-dom'
import {Container, Row, Col, Button, Alert, Nav, Badge} from 'react-bootstrap'
//import React from 'react';


function App() {
  return (
    <div className="App">

    <Nav variant="pills" defaultActiveKey="/home">
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
        <img src={logo} className="App-logo" alt="logo" />
        <div className= "mb-2">
          <h1>
            Do You Know Me? 
          </h1>
          <h5><i>
            Play with your friends!
          </i>
          </h5>
        </div>
 
        <div className="mb-2">
          <Button href="/creategame" variant="primary" size="lg" block> Create Game </Button>{' '}
        </div>
        <div className="mb-2">
          <Button href="/joingame" variant="primary" size="lg" block> Join Game </Button>{' '}
        </div> 

        <p>
          <h6>Team SOFT</h6>
          <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h6>Learn React</h6>
        </a>
        </p>
        </container>
      </header>
    </div>
  );
}

export default App;
