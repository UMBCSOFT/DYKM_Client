import React, { useState, useEffect, createRef } from 'react';

const PORT = 1337;
const WS_PORT = 4567;
const SERVER_IP = process.env.DEV !== "true" ? "192.168.1.57" : "localhost";
const CREATE_ROOM_URL = `http://${SERVER_IP}:`.concat(PORT, "/room/create");
const GET_ROOMCODE_URL = `http://${SERVER_IP}:`.concat(PORT, "/room/get/");
const WS_URL = `ws://${SERVER_IP}:` + WS_PORT;
const GameStateEnum = Object.freeze({
    CreateGame: Symbol("CreateGame"),
    HostWaitingRoom: Symbol("HostWaitingRoom"),
    JoinGame: Symbol("JoinGame"),
    WaitingRoom: Symbol("WaitingRoom"),
    Question: Symbol("Question"),
    QuestionMatch: Symbol("QuestionMatch"),
    Scores: Symbol("Scores"),
    EndGame: Symbol("EndGame")

});

const DYKMContext = React.createContext({
});

const _socket = createRef();
const isHost = createRef(false);

function DYKMProvider(props) {

    let socket = _socket.current;
    const [roomCode, setRoomCode] = useState();
    const [id, setId] = useState();
    const [gameState, setGameState] = useState();
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [pairs, setPairs] = useState();
    const [playerNames, setPlayerNames] = useState();
    const [name, setName] = useState();
    const [gamePack, setGamePack] = useState();
    const [numRounds, setNumRounds] = useState();
    const [playerScoresObjList, setPlayerScoresObjList] = useState([]);
    //const [timerPercent, setTimerPercent] = useState();
    const [timerSeconds, setTimerSeconds] = useState(60);
    const [timerStart, setTimerStart] = useState();
    const [timerEnd, setTimerEnd] = useState();
    let isTimerActive = false;

    useEffect(() => {
        console.log("Set gamestate to", gameState);
    }, [gameState]);

    useEffect(() => {
        console.log("Socket changed to", socket);
    }, [socket])

    useEffect(() => {
        if ((gameState === GameStateEnum.HostWaitingRoom
            || gameState === GameStateEnum.WaitingRoom)
            && isHost.current
            && socket
            && numRounds !== undefined
            && gamePack !== undefined) {
            console.log("rounds", numRounds)
            console.log("pack", gamePack)
            socket.send("SETNUMROUNDS " + numRounds);
            socket.send("SETGAMEPACK " + gamePack);
        }
    }, [numRounds, gamePack, socket, gameState])

    useEffect(() => {
        if (!socket) return;
        // add host name to list
        setPlayerNames([name]);
        socket.send("CHANGENICK " + name);
    }, [name, socket])

    function GetTimerSeconds() {
        if(timerStart && timerEnd) {
            return Math.max(Math.floor((timerEnd - new Date().getTime())/1000), 0);
        }
        console.log(timerEnd/1000, new Date().getTime()/1000);
        console.log(Math.max(Math.floor((timerEnd - new Date().getTime())/1000), 0));
        return 0;
    }

    function GetTimerPercent() {
        if(timerStart && timerEnd) {
            let timeLeft = timerEnd - new Date().getTime();
            let percent = timeLeft / (timerEnd - timerStart);
            return Math.max(percent * 100, 0);
        }
        return 100;
    }

    // pass setTimerSeconds, setTimerPercent, timerEnd, and animationFrameID ref
    function TimerHandler() {
        setTimerSeconds(GetTimerSeconds());
        //setTimerPercent(GetTimerPercent());
        console.log("TimerHandler:", timerStart, timerEnd, timerSeconds);

        /*TODO delete this We're using requestAnimationFrame so this runs at the apps framerate
        if(timerEnd - new Date().getTime() > 0) {
            //animationFrameID.current = requestAnimationFrame(TimerHandler);
        }*/
    }

    // Keep timer in sync with server
    /*useEffect(() => {
        if (isTimerActive) {
            const timer =
                timerSeconds > 0 &&
                setInterval(() => setTimerSeconds(timerSeconds - 1), 1000);
            return () => clearInterval(timer);
        } else if (!isTimerActive && timerSeconds !== 0) {
            clearInterval(timerSeconds);
        }
    }, [timerSeconds, isTimerActive]);*/


    // we wait for a TRANSITION QUESTION message after this
    function StartGame() {
        socket.send("START GAME");
    }

    function ConvertMatchesToStr(matches) {
        let matchesList = [];
        for (let key in matches) {
            if (matches.hasOwnProperty(key)) {
                matchesList.push(matches[key].join(','));
            }
        }
        return matchesList.join(';')
    }

    function ConvertScoreStrToObjList(scoresStr) {
        let playerScoresStrList = scoresStr.split(';');

        let playerScoresObjList = [];
        for (let info of playerScoresStrList) {
            const infoList = info.split(',');
            playerScoresObjList.push({
                name: infoList[0],
                score: infoList[1],
                numCorrectMatches: infoList[2]
            }
            );
        }
        return playerScoresObjList;
    }

    function HandleMatchSubmit(matchesList) {
        socket.send("DONEMATCHING " + ConvertMatchesToStr(matchesList));
    }

    function HandleReadyNextRound() {
        socket.send("READYNEXTROUND")
    }

    function HandlePlayAgain() {
        socket.send("PLAYAGAIN")
    }

    function setTimer(start, end) {
        //setTimerPercent(0);
        setTimerStart(start);
        setTimerEnd(end);
        console.log("Seconds:", (end-start)/1000);
        setTimerSeconds((end-start)/1000);
    }

    function CreateRoom(_numRounds, _gamePack) {
        isHost.current = true;

        console.log("CreateRoom()");
        const args = {
            numRounds: _numRounds,
            gamePack: _gamePack
        }
        const url = CREATE_ROOM_URL;
        const body_str = JSON.stringify(args);
        console.log(`Create room POST request data: `);
        console.log(body_str);
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body_str
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.roomCode === undefined) {
                    alert("Roomcode is undefined.");
                } else {
                    JoinRoom(data.roomCode);
                }
            }).catch((e) => {
                console.log(`Error while POST creating room: ${e}`)
            });
    }

    function JoinRoom(_roomCode) {
        if (_roomCode === undefined && roomCode) {
            _roomCode = roomCode;
            console.log("Using roomCode saved in DYKM provider");
        } else {
            setRoomCode(_roomCode);
        }
        console.log("Passed _roomcode:", _roomCode, "\nRoomcode:", roomCode);
        ConnectToWebsocket(() => {
            socket.send("JOIN " + _roomCode);
        });
    };

    function ConnectToWebsocket(onOpen) {
        socket = _socket.current = new WebSocket(WS_URL);
        socket.addEventListener('message', RespondToSocketMessages);
        socket.addEventListener('close', HandleWebsocketClose);
        socket.addEventListener('error', HandleWebsocketError);
        socket.addEventListener('open', onOpen);
    }

    function RespondToSocketMessages(e) {
        const WELCOME_ = "WELCOME ";
        const transitionToGameMessage = "TRANSITION QUESTION ";
        const playerUpdateMessage = "PLAYERUPDATE ";
        const transitionToQuestionMatchMessage = "TRANSITION QUESTIONMATCH ";
        const transitionToScorePageMessage = "TRANSITION SCORE";
        const transitionEndGame = "TRANSITION ENDGAME";
        const playerScoreMessage = "PLAYERSCORES ";
        const timerMessage = "TIMER ";

        if(e === undefined || socket === undefined) {
            console.log(`== RespondToSocketMessages ==\ne: ${e.data}\nsocket: ${socket}`);
            return;
        }

        console.log(`Received websocket message: ${e.data}`);

        // Respond to heartbeats
        if(e.data === "PING 🏓") {
            socket.send("PONG 🏓");
        }

        // Joined room
        else if (e.data.startsWith(WELCOME_)) {
            console.log("Setting player id to " + e.data.substring(WELCOME_.length));
            setId(e.data.substring(WELCOME_.length));

            console.log("Setting player name to", name);
            socket.send("CHANGENICK " + name);
            if (isHost.current) {
                setGameState(GameStateEnum.HostWaitingRoom);
            } else {
                setGameState(GameStateEnum.WaitingRoom);
            }
        }

        else if (e.data.startsWith("REJOINED")) {
            console.log("Reconnected!");
        }

        else if (e.data.startsWith(playerUpdateMessage)) {
            let updateString = e.data.substr(playerUpdateMessage.length);
            let playerNameList = updateString.split(';');
            setPlayerNames(playerNameList);
        }

        else if (e.data.startsWith(transitionToGameMessage)) {
            let q = e.data.substr(transitionToGameMessage.length);
            setQuestion(q);
            console.log("Got Question transition. Question is " + q);
            setGameState(GameStateEnum.Question);
            socket.send("REQUESTTIMER");
        }


        else if (e.data.startsWith(transitionToQuestionMatchMessage)) {
            let pairs = e.data.substr(transitionToQuestionMatchMessage.length);
            console.log("Server told us to transition to QUESTIONMATCH. Transitioning...");
            console.log("Q/A Pairs: ", pairs);
            setPairs(pairs);
            setGameState(GameStateEnum.QuestionMatch);
            socket.send("REQUESTTIMER");
        }

        else if (e.data.startsWith(transitionToScorePageMessage)) {
            //TODO server should send player scores with transition message
            setGameState(GameStateEnum.Scores);
            socket.send("GETPLAYERSCORES");
        }

        else if (e.data.startsWith(timerMessage)) {
            let timer = e.data.substr(timerMessage.length);
            console.log("Got timer data " + timer);
            let startAndEnd = timer.split(";").map(x=>parseInt(x));
            setTimer(startAndEnd[0], startAndEnd[1]);
        }

        else if (e.data.startsWith(transitionEndGame)) {
            setGameState(GameStateEnum.EndGame);
        }

        else if (e.data.startsWith(playerScoreMessage)) {
            // Expecting string of: name,totalscore,roundscore;name,totalscore,roundscore;etc
            let playerScoreStr = e.data.substr(playerScoreMessage.length);
            setPlayerScoresObjList(ConvertScoreStrToObjList(playerScoreStr));
        }
    }

    function SubmitQuestion() {
        if (!answer) alert("answer is", answer);
        socket.send("ANSWER " + answer);
        console.log("Sending answer " + answer);
    }

    function HandleWebsocketClose(e) {
        // TODO try to reconnect
        if (e.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`);
        }
        /*else if (reconnecting) {
            console.log(`Reconnecting to websocket.\nURL: ${url}\nRoomcode: ${roomCode}\nName: ${name}\nID: ${id}`);
        }*/
        else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
    }

    function HandleWebsocketError(error) {
        alert("Unable to connect to server room");
        console.log('[Websocket error]', error);
    }

    return (
        <DYKMContext.Provider value={{
            StartGame,
            CreateRoom,
            JoinRoom,
            SubmitQuestion,
            HandleMatchSubmit,
            HandleReadyNextRound,
            HandlePlayAgain,
            gameState,
            roomCode, setRoomCode,
            question, setAnswer,
            pairs, setPairs,
            timerStart, timerEnd,
            timerSeconds,
            name, setName,
            gamePack, setGamePack,
            numRounds, setNumRounds,
            playerNames,
            playerScoresObjList
        }}>
            {props.children}
        </DYKMContext.Provider>
    )
}

const useDYKMNetworker = () => React.useContext(DYKMContext);

export {DYKMProvider, useDYKMNetworker, GameStateEnum}
