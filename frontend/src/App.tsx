import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ModeHandler from "./containers/ModeHandler/mode_handler";
import Homepage from "./containers/Homepage/home";

import { Theme } from "./themes/theme_colors.";
import { useDispatch } from "react-redux";
import { setWs } from "./actions/socket_actions";

import "./App.scss";

// Number of words typed / time taken to complete
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWs());
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundColor: Theme.bgColor,
      }}
    >
      <div className="inner-div" style={{ backgroundColor: Theme.shadeColor }}>
        <Router>
          <Switch>
            <Route component={ModeHandler} path="/:mode" />
            <Route component={Homepage} path={"/"} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
