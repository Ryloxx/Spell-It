import React from 'react';
import { useSelector } from 'react-redux';
import { Col, ListGroup, ListGroupItem, Progress, Row } from 'reactstrap';
import { selectors } from '../gameSlice';
import './score.css';

export default function Score() {
  const maxWord = useSelector(selectors.selectmaxWord);
  const wordCount = useSelector(selectors.selectwordCount);
  const errorCount = useSelector(selectors.selecterrorCount);
  const goodWord = useSelector(selectors.selectGoodword);
  const status = useSelector(selectors.selectgameStatus);
  const wrongWords = useSelector(selectors.selectWrongWords);
  return (
    <div className="score_box">
      {status === 'running' ? (
        <div className="score_running">
          <Progress multi>
            <Progress bar color="primary" value={100 * (goodWord / maxWord)} />
            <Progress
              bar
              color="danger"
              value={(100 * (wordCount - goodWord)) / maxWord}
            />
          </Progress>
        </div>
      ) : (
        <div className="score_end">
          <Row>
            <Col xs={12} sm={6}>
              <h4>
                Errors: <b className="text-danger">{errorCount}</b>
              </h4>
              <h4>
                Well spelled words: <b className="text-success">{goodWord} </b>/
                {maxWord}
              </h4>
            </Col>
            <Col>
              <ListGroup>
                {wrongWords.map((word) => (
                  <ListGroupItem color="danger" key={word}>
                    <h6>
                      <b className="text-danger">{word}</b>
                    </h6>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
