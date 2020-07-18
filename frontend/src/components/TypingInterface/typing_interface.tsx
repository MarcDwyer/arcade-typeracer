import React, { useEffect, useRef } from "react";

import IndividualChar from "../Individual_Character/individualChar";
import { handleTyping } from "../../actions/typing_actions";

import { TypeRacingDiv } from "../../styled-components/game_styles";

import { MyInput } from "../../styled-components/inputs";

import { GameData } from "../../stores/gameStore";

import { Phases } from "../../enums";

import "./typing_interface.scss";
import { PhaseTypes } from "../../stores/phaseStore";

type Props = {
  gameData: GameData;
  phase: PhaseTypes;
};

const TypingInterface = ({ gameData, phase }: Props) => {
  const { text, error, value } = gameData;

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
              disabled={phase === Phases.complete}
              //@ts-ignore
              ref={inputRef}
              value={value}
              onChange={(e) => {
                let char = e.target.value;
                char = char[char.length - 1];
              }}
            />
          </TypeRacingDiv>
        </>
      )}
    </div>
  );
};

export default TypingInterface;
