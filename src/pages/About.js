import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';

function About(){
    return (
        <div className="About">
            <header className="App-header">
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
            </header>
        </div>
    );
}

export default About;

