import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ModeHandler from "./containers/ModeHandler/mode_handler";
import Homepage from "./containers/Homepage/home";

import { Theme } from "./themes/theme_colors.";

import "./App.scss";

// Number of words in text / time taken to complete
function App() {
  return (
    <div className="App">
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
