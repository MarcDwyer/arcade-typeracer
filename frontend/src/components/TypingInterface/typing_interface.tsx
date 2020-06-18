import React, { useEffect, useRef } from "react";

import IndividualChar from "../Individual_Character/individualChar";
import { useDispatch } from "react-redux";
import { handleTyping } from "../../actions/game_actions";
import { TextData } from "../../reducers/reducer_types";
import { PhaseTypes } from "../../reducers/reducer_types";

import { TypeRacingDiv } from "../../styled-components/game_styles";

import { MyInput } from "../../styled-components/inputs";

import "./typing_interface.scss";
import { Phases } from "../../enums";

type Props = {
  textData: TextData;
  phase: PhaseTypes;
};

function TypingInterface(props: Props) {
  const dispatch = useDispatch();
  const { text, value, error } = props.textData;
  const inputRef = useRef<HTMLInputElement | null>();
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="typing-interface">
      {text && (
        <>
          <TypeRacingDiv>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <div className="text-data">
              {text &&
                text.map((char, index) => {
                  return <IndividualChar key={index} char={char} />;
                })}
            </div>
            <MyInput
              disabled={props.phase === Phases.complete}
              //@ts-ignore
              ref={inputRef}
              value={value}
              onChange={(e) => dispatch(handleTyping(e.target.value))}
            />
          </TypeRacingDiv>
        </>
      )}
    </div>
  );
}

export default TypingInterface;
