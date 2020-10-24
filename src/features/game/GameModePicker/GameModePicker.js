import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';
import { actions, selectors } from '../gameSlice';
import './gameModePicker.css';
export default function GameModePicker() {
  const gameModes = useSelector(selectors.selectgameModes);
  const dispatch = useDispatch();
  return (
    <ButtonGroup className="gameModePicker_box pulsing">
      {gameModes.map((mode) => (
        <Button
          className="text-capitalize"
          onClick={() => dispatch(actions.startNewGame(mode))}
        >
          {mode}
        </Button>
      ))}
    </ButtonGroup>
  );
}
