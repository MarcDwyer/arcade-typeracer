import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { ReduxStore } from "./reducers/main";

import Homepage from "./containers/Homepage/home";

import { Theme } from "./themes/theme_colors.";

import "./App.scss";

// Number of words in text / time taken to complete
function App() {
  const status = useSelector((state: ReduxStore.State) => state.status);
  const dispatch = useDispatch();

  console.log(status);
  return (
    <div className="App">
      <div className="inner-div" style={{ backgroundColor: Theme.shadeColor }}>
        <Router>
          <Switch>
            <Route component={Homepage} path="/" />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
