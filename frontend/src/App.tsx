import React, { useEffect } from "react";
import { typeText } from "./typing_text";
import { SET_TYPING } from "./reducers/typing_reducer";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "./reducers/main";

import { handleTyping, setTimer } from "./actions/typing_actions";

import { transformChar, wordsCalc } from "./util";

import { Theme } from "./themes/theme_colors.";
import IndividualChar from "./components/Individual_Character/individualChar";

import "./App.scss";

// Number of words in text / time taken to complete

function App() {
  const tData = useSelector((state: ReduxStore.State) => state.typing);
  const { textData } = tData;
  const dispatch = useDispatch();

  useEffect(() => {
    const selected = typeText.tutorial;

    const payload: ReduxStore.TxtData = {
      text: transformChar(selected),
      totalWords: wordsCalc(selected),
    };

    dispatch({
      type: SET_TYPING,
      payload,
    });
  }, []);
  console.log(tData);
  return (
    <div className="App">
      <div className="inner-div" style={{ backgroundColor: Theme.shadeColor }}>
        <button onClick={() => dispatch(setTimer(15))}>Start</button>
        {tData.timer &&
          (() => {
            const [_, minutes, seconds] = tData.timer;
            return <span>{`Minutes: ${minutes}. Seconds: ${seconds}`}</span>;
          })()}
        {tData.completed && <span>Congrats you have finished!</span>}
        {textData && (
          <>
            <div className="text">
              {textData.text.map((char, i) => (
                <IndividualChar char={char} index={i} key={i} />
              ))}
            </div>
            <div className="input-area">
              {tData.error && <span>{tData.error}</span>}
              <input
                value={tData.value}
                onChange={(e) => dispatch(handleTyping(e.target.value))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
