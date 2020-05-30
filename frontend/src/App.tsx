import React, { useReducer, useEffect } from "react";
import { typeText } from "./typing_text";
import TypingReducer, {
  INC_INDEX,
  SET_ERROR,
  TData,
  SET_TYPING,
} from "./reducers/typing_reducer";
import { transformChar, Character } from "./util";
import "./App.scss";

export const initState: TData = {
  error: false,
  index: 0,
  text: null,
  value: "",
};

function App() {
  const [tData, dispatch] = useReducer(TypingReducer, initState);
  const handleTyping = (char: string) => {
    const { index, text } = tData;
    if (!text) return;
    char = char[char.length - 1];
    const curr = text[index];
    try {
      if (!curr) throw "There is no current";
      if (curr.char === char) {
        dispatch({
          type: INC_INDEX,
          payload: char,
        });
      } else {
        dispatch({
          type: SET_ERROR,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch({
      type: SET_TYPING,
      payload: transformChar(typeText.tutorial),
    });
  }, []);
  console.log();
  return (
    <div className="App">
      <div className="inner-div">
        {tData.text && (
          <>
            <div className="text">
              {tData.text.map(({ char, completed }, i) => {
                return <span
                  key={i}
                  style={{ color: completed ? "green" : "#eee" }}
                >
                  {char}
                </span>;
              })}
            </div>
            <div className="input-area">
              {tData.error && (
                <span>Not the correct character</span>
              )}
              <input
                value={tData.value}
                onChange={(e) => handleTyping(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
