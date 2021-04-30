import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button,  Nav} from 'react-bootstrap'
import React from 'react';

function waitingroom(){
    return (
        <div className="waitingroom">
    
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
            <div className= "players">
              <h1>Waiting for more players to join...</h1>
              <h5>* as players join, their names will show up here * </h5>
              <Button href= "/example" type="submit" >go to example page</Button>
            </div>
            </container>
            
        </header>
        </div>
      );
    }

export default waitingroom;

