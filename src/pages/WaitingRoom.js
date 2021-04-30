import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'
import React from 'react';

function waitingroom(){
    return (
        <div className="waitingroom">
    
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

