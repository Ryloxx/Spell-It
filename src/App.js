import React from 'react';
import gamelogo from './assets/image/game-logo.png';
import './App.css';
import Game from './features/game/Game';
import { Col, Row } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Row>
        <Col xl="12" className="text-center">
          <img className="floating game_logo" src={gamelogo} alt="game logo" />
        </Col>
        <Col xs="12" md={{ offset: 1, size: 10 }} xl={{ offset: 2, size: 8 }}>
          <Game />
        </Col>
      </Row>
    </div>
  );
}

export default App;
