import {Col, Row} from "react-bootstrap";

/* expects a list of players called playerList with attributes:
 *  name
 *  score (total score for game so far)
 *  numCorrectMatches (score for this round only)
 */
function ScoreContent({ displayRoundScore, playerList }) {
    let scoreRowList = [];
    let orderedPlayerList = playerList.sort((a, b) => b.score - a.score);
    let roundScore = null;
    for (let i = 0; i < orderedPlayerList.length; i++) {
        if (displayRoundScore) {
            roundScore = <Col>+{orderedPlayerList[i].numCorrectMatches}</Col>
        }
        scoreRowList.push(
            <Row className="ScoreRowItem">
                <Col>{orderedPlayerList[i].name}:</Col>
                {roundScore}
                <Col>{orderedPlayerList[i].score}</Col>
            </Row>
        )
    }
    return (scoreRowList);
}

export default ScoreContent;
