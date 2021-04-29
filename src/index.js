import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from 'react-router-dom'

import About from './about';
import howtoplay from './howtoplay';
import hostwaitingroom from './hostwaitingroom';
import waitingroom from './waitingroom';
import question from './question';
import questionmatch from './questionmatch';
import example from './example';
import CreateGamePage from './creategame';
import JoinGamePage from "./joingame";
import Frame from 'react-frame-component';
import './shared_websocket.js';

// const rootElement = document.getElementById("root");
//     ReactDOM.render(
//       <BrowserRouter>
//        <Switch>
//         <Route exact path="/about" component={About} />
//         <Route path="/howtoplay" component={howtoplay} />
//       </Switch>
//       </BrowserRouter>,
//       rootElement
//     );
const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}</head><body><div></div></body></html>`;

if (typeof window !== 'undefined') {
    ReactDOM.render(
        <Frame initialContent={initialContent} frameBorder="0" id={"Frame"}>
            <BrowserRouter>
                <Route exact path="/" component={App} />
                <Route path="/about" component={About} />
                <Route path="/howtoplay" component={howtoplay} />
                <Route path="/creategame" component={CreateGamePage} />
                <Route path="/joingame" component={JoinGamePage} />
                <Route path="/hostwaitingroom" component={hostwaitingroom} />
                <Route path="/waitingroom" component={waitingroom} />
                <Route path="/question" component={question} />
                <Route path="/questionmatch" component={questionmatch} />
                <Route path="/example" component={example} />
            </BrowserRouter>
        </Frame>,
        document.getElementById('root')
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//<Route exact path="/about" component = {About} />
