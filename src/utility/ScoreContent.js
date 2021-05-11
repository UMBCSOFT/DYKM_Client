import React from "react";
import {Col, Row} from "react-bootstrap";

class ScoreContent extends React.Component {
    constructor(props) {
        /* expects a list of players called playerList with attributes:
        *  name
        *  score (total score for game so far)
        *  numCorrectMatches (score for this round only)
         */
        super(props);
        this.playerList = props.playerList
    }

    GenerateScoreContent() {
        let scoreRowList = [];
        let orderedPlayerList = this.playerList.sort((a, b) => a.score - b.score);
        for (let i = 0; i < orderedPlayerList.length; i++) {
            scoreRowList.push(
                <Row>
                    <Col>{i + 1}. </Col>
                    <Col>{orderedPlayerList[i].name}</Col>
                    <Col>+{orderedPlayerList[i].numCorrectMatches}</Col>
                    <Col>{orderedPlayerList[i].score}</Col>
                </Row>
            )
        }
        return scoreRowList;
    }

    render() {
        return (this.GenerateScoreContent());
    }
}

export default ScoreContent;