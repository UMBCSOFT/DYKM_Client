import React from 'react';
import logo from "../media/logo.png";
import GitHubLogo from "../media/github-mark-white.svg";
import {Button} from "react-bootstrap";
import {Outlet} from "react-router-dom";
//import {isChrome, isFirefox, isSafari, isChromium} from 'react-device-detect';

const isDevMode = false;

const Home = () => {
    //if(!isDevMode && !(isChrome || isFirefox || isSafari || isChromium)) {
        //alert("Warning: You are using an unsupported browser. This game is only tested with Chrome, Firefox, and Safari. You may encounter bugs because of this");
    //}
    return (
        <div className="App">
            <div className="Columns Center mb-5">
                <div className="Card m-auto" id="Main">
                    <img src={logo} className="App-logo" alt="logo" />

                    <div className="Home-buttons">
                        <div className="mb-2">
                            <Button href="/joingame" variant="primary" size="lg" block> Join Game </Button>
                        </div>
                        <div className="mb-2">
                            <Button href="/creategame" variant="primary" size="lg" block> Host Game </Button>

                        </div>
                    </div>

                    <div className="Home-contact-info">
                        <a
                            className="App-link"
                            href="https://github.com/UMBCSOFT"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <h6>Made by Team SOFT</h6>
                        </a>
                        <a
                            className="App-link"
                            href="stevenlaczko.com"
                        >
                            <h6>UI Remake and one-page rewrite by Steven Laczko</h6>
                        </a>
                    </div>
                </div>
                <div className="Window"><Outlet/></div>
            </div>
            <div className="Footer text-right w-100">
                <a
                    className="App-link"
                    href="https://github.com/UMBCSOFT"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={GitHubLogo} alt="Github"/>
                </a>
            </div>
        </div>
    )
};

export default Home;
