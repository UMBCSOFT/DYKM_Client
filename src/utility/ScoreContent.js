import React from "react";
import {Col, Row} from "react-bootstrap";

/* expects a list of players called playerList with attributes:
*  name
*  score (total score for game so far)
*  numCorrectMatches (score for this round only)
 */
function ScoreContent(props) {
    let scoreRowList = [];
    let orderedPlayerList = props.playerList.sort((a, b) => b.score - a.score);
    let roundScore = null;
    for (let i = 0; i < orderedPlayerList.length; i++) {
        if (props.displayRoundScore) {
            roundScore = <Col md={"auto"}>+{orderedPlayerList[i].numCorrectMatches}</Col>
        }
        scoreRowList.push(
            <Row>
                <Col md={"auto"}>{i + 1}. </Col>
                <Col md={"auto"}>{orderedPlayerList[i].name}</Col>
                {roundScore}
                <Col md={"auto"}>{orderedPlayerList[i].score}</Col>
            </Row>
        )
    }

    return scoreRowList;
}

export default ScoreContent;
