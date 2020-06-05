import React from "react";

import IndividualChar from "../../components/Individual_Character/individualChar";
import { useDispatch } from "react-redux";
import { handleTyping } from "../../actions/typing_actions";
import { TextData } from "../../reducers/typing_reducer";

import "./typing_interface.scss";

type Props = {
  textData: TextData;
};

function TypingInterface(props: Props) {
  const dispatch = useDispatch();
  const { text, value, error } = props.textData;
  console.log(props);
  return (
    <div className="typing-interface">
      {text && (
        <div className="typering">
          {error && <span>{error}</span>}
          <div className="text-data">
            {text && text.map((char, index) => {
              return (
                <IndividualChar key={index} char={char} />
              );
            })}
          </div>
          <input
            value={value}
            onChange={(e) => dispatch(handleTyping(e.target.value))}
          />
        </div>
      )}
    </div>
  );
}

export default TypingInterface;
