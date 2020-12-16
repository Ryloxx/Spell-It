import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Input } from "reactstrap";
import { actions, selectors } from "../gameSlice";
import speech from "../speech";
import "./playground.css";

export default function Playground() {
  const dispatch = useDispatch();
  const currentWord = useSelector(selectors.selectcurrentWord);
  const error = useSelector(selectors.selecterror);
  const correct = useSelector(selectors.selectCorrect);
  const status = useSelector(selectors.selectgameStatus);
  const [typedWord, setTypedWord] = useState("");
  const inputRef = useRef();
  function validate() {
    dispatch(actions.tryWord(typedWord));
  }
  function next() {
    dispatch(actions.nextWord());
    setTypedWord("");
  }
  function listen() {
    speech(currentWord);
  }
  function handleKeyDown(event) {
    switch (event.key) {
      case "Enter":
        if (event.ctrlKey) {
          next();
        } else {
          validate();
        }
        return;
      case "i":
        if (event.ctrlKey) {
          listen();
        }
        return;
      default:
        return;
    }
  }

  useEffect(() => {
    if (status === "running") next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (correct) {
      next();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correct]);

  useEffect(() => {
    inputRef.current.focus();
    listen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  return (
    <div className="playground_box" onKeyDown={handleKeyDown}>
      <div className="playground_input">
        <Input
          innerRef={inputRef}
          value={typedWord}
          className={error ? "is-invalid" : ""}
          onChange={(event) => setTypedWord(event.target.value)}
          type="text"
        />
      </div>
      <ButtonGroup size="xl">
        <Button
          data-toggle="tooltip"
          data-placement="bottom"
          title="Enter"
          className="playground_button"
          onClick={validate}
        >
          Validate
        </Button>
        <Button
          data-toggle="tooltip"
          data-placement="bottom"
          title="Ctrl+I"
          className="playground_button"
          onClick={listen}
        >
          Listen
        </Button>
        <Button
          data-toggle="tooltip"
          data-placement="bottom"
          title="Ctrl+Enter"
          className="playground_button"
          onClick={next}
        >
          Pass
        </Button>
      </ButtonGroup>
    </div>
  );
}
