import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import mainmenu from '../media/mainmenu.png';
import creategame from '../media/creategame.png';
import joingame from '../media/joingame.png';
import waitingroom from '../media/waitingroom.png';
import waitingroom2 from '../media/waitingroom2.png';
import question from '../media/question.png';
import questionmatch from '../media/gamematch.png';
import roundend from '../media/roundend.png';
import finalscores from '../media/finalscores.png';
import dykm from '../media/dykm.png';


function ProductPage(){
    return (
        <div className="ProductPage">
            <header className="App-header">
                <br></br>
            <div className= "mb-2">
                <img src={dykm} alt="logo" />

              <h1>Do You Know Me?</h1>

              <h5><i>See if you really know your friends!</i></h5>
              <br></br>

              <h5><i>
              Do You Know Me? is a fun, friend-group focused, web-based multiplayer game 
              built around the idea of figuring out how well you know your friends. You 
              can create a game, invite all your friends to join with a secret game code, 
              choose the question pack you want to play with, and choose how many rounds 
              of the game you’d like to play. Each round, all players are asked the same 
              question from the pre-chosen game pack and must submit an answer. Afterwards, 
              all the answers are gathered and then all of the players must guess who wrote 
              each answer. For each question and answer pair you match correctly, you get 
              a point. The main idea of the game is to see whether or not you really know 
              your friends!

              </i></h5>
              <br></br>
              <h5><i>*30 second demo video here*</i></h5>
              <br></br>
              
              <h5><i>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={mainmenu}
                        alt="First slide"
                        style={{width:"10%", height:"auto"}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={creategame}
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={joingame}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={waitingroom}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={waitingroom2}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={question}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={questionmatch}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={roundend}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={finalscores}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
              </i></h5>
             
              <br></br>
            </div>
            </header>
        </div>
    );
}

export default ProductPage;
