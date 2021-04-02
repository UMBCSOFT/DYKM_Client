import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {Container, Row, Col, Button, Alert, Nav, Badge} from 'react-bootstrap'


function App() {
  return (
    <div className="App">

    <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">How To Play</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">About</Nav.Link>
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
          <Button variant="primary" size="lg" block> Create Game </Button>{' '}
        </div>
        <div className="mb-2">
          <Button variant="primary" size="lg" block> Join Game </Button>{' '}
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
