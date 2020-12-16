import React from "react";
import "./App.css";
import Game from "./features/game/Game";
import { Col, Row } from "reactstrap";

function App() {
  return (
    <div className="App">
      <Row>
        <Col xs="12" className="text-center">
          <div className="floating" id="game_logo" />
        </Col>
        <Col xs="12" md={{ offset: 1, size: 10 }} xl={{ offset: 2, size: 8 }}>
          <Game />
        </Col>
      </Row>
    </div>
  );
}

export default App;
