import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import NetworkedPage from "../utility/NetworkedPage";
import {Button} from 'react-bootstrap'
class EndGame extends NetworkedPage {
    constructor() {
        super();
    }

    componentWillMount() {
        this.ConnectToWebsocket(
            this.props.location.state.url,
            this.props.location.state.id,
            this.props.location.state.name
        );
    }

    RespondToSocketMessages(e, callback) {
        super.RespondToSocketMessages(e, callback);
    }
    render() {
        return (
            <div className="EndGame">
                <header className="App-header">
                    <div className="mb-2">
                        <h1>Final Scores</h1>
                        <h5>
                            player names + their scores go here
                        </h5>
                    </div>

                    <div className="mb-2">
                        <Button href="/" variant="primary" size="lg" block> Leave Game </Button>{' '}
                    </div>
                </header>
            </div>
        );
    }
}

export default EndGame;