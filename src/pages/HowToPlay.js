import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function howToPlay(){
  return (
      <div className="howtoplay">
        <header className="App-header">
            <div className= "mb-2">
              <h1>How To Play</h1>
              <h5><i>
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </i></h5>
              <h5><i>
                2. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </i></h5>
              <h5><i>
                3. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </i></h5>
              <h5><i>
                4. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
              </i></h5>
            </div>
        </header>
      </div>
  );
};

export default howToPlay;