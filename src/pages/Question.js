import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";

const now = 60;

class Question extends NetworkedPage {

    constructor() {
        super();
    }

    componentDidMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }

    render() {
        return (
            <div className="question">
                <header className="App-header">
                    <div className="prompt">

                        <ProgressBar now={now} label={`${now} secs left!`}/>
                        <br/>

                        <h1>QUESTION</h1>

                        <Card border="primary" bg="light" text="dark">
                            <Card.Body>{this.props.location.state.question}</Card.Body>
                        </Card>

                        <Form.Group>


                            <br/>
                            <Form.Control as="text">
                                <option>Type your answer here!</option>
                            </Form.Control>

                            <br/>


                            <Button href="/questionMatch" variant="primary" type="submit">
                                Submit your answer!
                            </Button>

                        </Form.Group>
                    </div>
                </header>
            </div>
        );
    }

}

export default Question;

