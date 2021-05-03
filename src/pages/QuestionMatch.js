import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, ListGroup} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React from 'react';
import {Redirect} from "react-router-dom";
import NetworkedPage from "../utility/NetworkedPage";

class QuestionMatch extends NetworkedPage {

    constructor() {
        super();
        this.HandleSubmit = this.HandleSubmit.bind(this);
    }

    componentWillMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }

    HandleSubmit(e) {
        e.preventDefault();
        this.setState({ redirect: true} );
    }

    render(){
        if (this.state.redirect) {
            console.log("Transition to Scores");
            return (
                <Redirect to={{
                    pathname: "/scores",
                    state: {
                        id: this.props.location.state.id,
                        roomCode: this.props.location.state.roomCode,
                        name: this.props.location.state.name,
                        url: this.props.location.state.url,
                    }
                }} />
            )
        } else {
            return (
                <div className="questionmatch">

                    <header className="App-header">
                        <div className= "mb-2">
                            <h1>Round 1</h1>

                            <br />
                            <Card border="primary" bg="light" text = "dark">
                                <Card.Body>* question will be generated here *</Card.Body>
                            </Card>

                            <br />
                            <h4>Match each answer to a player!</h4>

                            <Card text = "dark" style={{ width: '30rem' }}>
                                <ListGroup>
                                    <ListGroup.Item>Cras justo odio <select>
                                        <option value="player 1"> player 1 </option>
                                        <option value="player 2"> player 2 </option>
                                        <option value="player 3"> player 3 </option>
                                    </select>
                                    </ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in <select>
                                        <option value="player 1"> player 1 </option>
                                        <option value="player 2"> player 2 </option>
                                        <option value="player 3"> player 3 </option>
                                    </select> </ListGroup.Item>
                                    <ListGroup.Item>Vestibulum at eros <select>
                                        <option value="player 1"> player 1 </option>
                                        <option value="player 2"> player 2 </option>
                                        <option value="player 3"> player 3 </option>
                                    </select> </ListGroup.Item>
                                </ListGroup>
                            </Card>

                            <Button variant="primary" type="submit" onClick={(e) => this.HandleSubmit(e)}>See the results!</Button>

                            <Form inline>
                                <Form.Control
                                    as="select"
                                    className="my-1 mr-sm-2"
                                    id="inlineFormCustomSelectPref"
                                    custom
                                >
                                    <option value="0">Choose...</option>
                                    <option value="1">player 1</option>
                                    <option value="2">player 2</option>
                                    <option value="3">player 3</option>
                                </Form.Control>

                            </Form>


                        </div>
                    </header>
                </div>
            );

        }
    }
}

export default QuestionMatch;

