import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';

function EndGame() {
    return (
        <div className="EndGame">
            <header className="App-header">
                    <div className= "mb-2">
                        <h1>Final Scores</h1>
                        <h5>
                            player names + their scores go here
                        </h5>
                    </div>

                
                    <div className="mb-2">
                        <Button href="/waitingroom" variant="primary" size="lg" block> Play Again </Button>{' '}
                    </div>
                    
                    <div className="mb-2">
                        <Button href="/" variant="primary" size="lg" block> Leave Game </Button>{' '}
                    </div>
            </header>
        </div>
    );
}

export default EndGame;