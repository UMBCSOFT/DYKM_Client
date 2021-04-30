import React from 'react'
import logo from "../media/logo.svg";
import {Button} from "react-bootstrap";

export const Home = () => {
    return (
        <div className="Home">
            <header className="App-header">
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
                        href="https://github.com/UMBCSOFT"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h6>Repo for this project</h6>
                    </a>
                </p>
            </header>
        </div>
    )
};
