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
            roundScore = <Col md={2}>+{orderedPlayerList[i].numCorrectMatches}</Col>
        }
        scoreRowList.push(
            <Row className="ScoreRowItem">
                <Col md={"auto"}>{orderedPlayerList[i].name}:</Col>
                {roundScore}
                <Col md={1}>{orderedPlayerList[i].score}</Col>
            </Row>
        )
    }
    return (scoreRowList);
}

export default ScoreContent;
