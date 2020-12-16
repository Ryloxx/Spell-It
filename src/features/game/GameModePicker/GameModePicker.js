import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";
import { actions, selectors } from "../gameSlice";
import "./gameModePicker.css";
export default function GameModePicker() {
  const gameModes = useSelector(selectors.selectgameModes);
  const dispatch = useDispatch();
  return (
    <ButtonGroup className="gameModePicker_box">
      {gameModes.map((mode) => (
        <Button
          key={mode}
          className="text-capitalize btn-info"
          onClick={() => dispatch(actions.startNewGame(mode))}
        >
          {mode}
        </Button>
      ))}
    </ButtonGroup>
  );
}
