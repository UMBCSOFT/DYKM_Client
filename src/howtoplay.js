import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav} from 'react-bootstrap'
import React from 'react';

function howtoplay(){
    return (
        <div className="howtoplay">
    
        <Nav variant="pills" defaultActiveKey="/howtoplay">
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
              <h1>How To Play</h1>
              <h5><i>
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. 
                </i></h5>
                <h5><i>
                2. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </i></h5>
                <h5><i>
                3. Duis 
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. 
                </i></h5>
                <h5><i>
                4. Excepteur sint occaecat cupidatat 
                non proident, sunt in culpa qui officia deserunt mollit anim id 
                est laborum.
                </i></h5>
            </div>
          </container>
        </header>
        </div>
      );
    }

export default howtoplay;

