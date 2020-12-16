import React from "react";
import { Provider, useSelector } from "react-redux";
import { selectors } from "./gameSlice";
import { TransitionGroup } from "react-transition-group";
import store from "./gameStore";
import Playground from "./Playground/Playground";
import Score from "./Score/Score";
import "./game.css";
import GameTransition from "./GameTransition";
import GameModePicker from "./GameModePicker/GameModePicker";
export default function Game() {
  const Controller = () => {
    const status = useSelector(selectors.selectgameStatus);
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      return (
        <div class="display-4 text-dark">
          Spell it is not compatible with your device, sorry.{" "}
          <span role="img" aria-label="sad cat emoji">
            😿
          </span>
        </div>
      );
    }
    return (
      <TransitionGroup mode="in-out">
        <GameTransition inc={status === "idle"}>
          <div className="game_start">
            <GameModePicker />
          </div>
        </GameTransition>
        <GameTransition inc={status === "running"}>
          <div className="game_running">
            <Score />
            <Playground />
          </div>
        </GameTransition>
        <GameTransition inc={status === "done"}>
          <div className="game_end">
            <h2 className="">Your score</h2>
            <Score />
            <div className="game_start">
              <GameModePicker />
            </div>
          </div>
        </GameTransition>
      </TransitionGroup>
    );
  };
  return (
    <Provider store={store}>
      <div className="game_box">
        <Controller />
      </div>
    </Provider>
  );
}
