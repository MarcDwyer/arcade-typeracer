import React, { useEffect } from "react";
import { typeText } from "./typing_text";
import { SET_TYPING } from "./reducers/typing_reducer";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "./reducers/main";

import { handleTyping } from "./actions/typing_actions";

import { transformChar } from "./util";

import "./App.scss";
import { Theme } from "./themes/theme_colors.";

// Number of words in text / time taken to complete

function App() {
  const tData = useSelector((state: ReduxStore.State) => state.typing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_TYPING,
      payload: transformChar(typeText.tutorial),
    });
  }, []);

  return (
    <div className="App">
      <div className="inner-div" style={{ backgroundColor: Theme.shadeColor }}>
        {tData.completed && <span>Congrats you have finished!</span>}
        {tData.typing_text && (
          <>
            <div className="text">
              {tData.typing_text.map(({ char, completed }, i) => {
                let styles = {};
                if (completed) {
                  styles = {
                    ...styles,
                    color: Theme.colorSuccess,
                  };
                }
                return (
                  <span key={i} style={styles}>
                    {char}
                  </span>
                );
              })}
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
