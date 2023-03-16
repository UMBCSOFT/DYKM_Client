import React, { useState, useEffect, createRef } from 'react';

const PORT = 1337;
const WS_PORT = 4567;
const CREATE_ROOM_URL = "http://localhost:".concat(PORT, "/room/create");
const GET_ROOMCODE_URL = "http://localhost:".concat(PORT, "/room/get/");
const WS_URL = "ws://localhost:" + WS_PORT;
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
    const [timerStart, setTimerStart] = useState();
    const [timerEnd, setTimerEnd] = useState();
    const [playerNames, setPlayerNames] = useState();
    const [name, _setName] = useState();
    const [gamePack, _setGamePack] = useState();
    const [numRounds, _setNumRounds] = useState();
    const [playerScoresObjList, setPlayerScoresObjList] = useState([]);
    const [timerSeconds, setTimerSeconds] = useState();
    const [timerPercent, setTimerPercent] = useState();
    const animationFrameID = createRef();
    let _name, _gamePack, _numRounds;

    useEffect(() => {
        console.log("Set gamestate to", gameState);
    }, [gameState]);

    useEffect(() => {
        console.log("Socket changed to", socket);
    }, [socket])

    function setName(x) {
        _setName(x);
        _name = x;
    }

    function setGamePack(x) {
        _setGamePack(x);
        _gamePack = x;
    }

    function setNumRounds(x) {
        _setNumRounds(x);
        _numRounds = x;
    }

    function GetTimerSeconds() {
        if(timerStart && timerEnd) {
            return Math.max(Math.floor((timerEnd - new Date().getTime())/1000), 0);
        }
        console.log(timerEnd/1000, new Date().getTime()/1000);
        console.log(Math.max(Math.floor((timerEnd - new Date().getTime())/1000), 0));
        return 0;
    }

    // TODO fix this
    function GetTimerPercent() {
        if(timerStart && timerEnd) {
            let timeLeft = timerEnd - new Date().getTime();
            let percent = timeLeft / (timerEnd - timerStart);
            return Math.min(Math.max(percent * 100, 0), 100);
        }
        return 100;
    }

    // pass setTimerSeconds, setTimerPercent, timerEnd, and animationFrameID ref
    function TimerHandler() {
        setTimerSeconds(GetTimerSeconds);
        setTimerPercent(GetTimerPercent);
        console.log("TimerHandler:", timerStart, timerEnd, timerSeconds);

        // We're using requestAnimationFrame so this runs at the apps framerate
        if(timerEnd - new Date().getTime() > 0) {
            animationFrameID.current = requestAnimationFrame(TimerHandler);
        }
    }

    // Keep timer in sync with server
    useEffect(() => {
        console.log("Updating timer animation");
        TimerHandler();
        return () => cancelAnimationFrame(animationFrameID.current);
        }, [timerStart, timerEnd, animationFrameID]);


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

    function CreateRoom() {
        isHost.current = true;

        console.log("CreateRoom()");
        fetch(CREATE_ROOM_URL, {method: "POST"})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                if (data.roomCode === undefined) {
                    alert("Roomcode is undefined.");
                } else {
                    JoinRoom(data.roomCode);
                }
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

            socket.send("CHANGENICK " + _name);
            if (isHost.current) {
                socket.send("SETNUMROUNDS " + _numRounds);
                socket.send("SETGAMEPACK " + _gamePack);
                setGameState(GameStateEnum.HostWaitingRoom);
                // add host name to list
                setPlayerNames([_name]);
            } else {
                setGameState(GameStateEnum.WaitingRoom);
            }
        }

        else if (e.data.startsWith("REJOINED")) {
            console.log("Reconnected!");
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
            setTimerStart(startAndEnd[0]);
            setTimerEnd(startAndEnd[1]);
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
        console.log(`[error] ${error.message}`);
    }

    return (
        <DYKMContext.Provider value={{
            StartGame,
            CreateRoom,
            JoinRoom,
            SubmitQuestion,
            HandleMatchSubmit,
            HandleReadyNextRound,
            gameState,
            roomCode, setRoomCode,
            question, setAnswer,
            pairs, setPairs,
            timerStart, timerEnd,
            timerSeconds, timerPercent,
            name, setName,
            gamePack, setGamePack,
            numRounds, setNumRounds,
            playerNames,
            playerScoresObjList,
            animationFrameID
        }}>
            {props.children}
        </DYKMContext.Provider>
    )
}

const useDYKMNetworker = () => React.useContext(DYKMContext);

export {DYKMProvider, useDYKMNetworker, GameStateEnum}
