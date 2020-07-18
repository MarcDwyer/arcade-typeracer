import React, { useEffect, useContext } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ModeHandler from "./containers/ModeHandler/mode_handler";
import Homepage from "./containers/Homepage/home";
import ErrorModal from "./containers/Error_Modal/error_modal";
import { observer } from "mobx-react";

import Store from "./stores/main";

import { isDev } from "./util";

import { Theme } from "./themes/theme_colors.";

import "./App.scss";

// Number of words typed / time taken to complete

const App = observer(() => {
  const store = useContext(Store);
  useEffect(() => {
    if (!store.socket) {
      const aUrl = isDev()
        ? `ws://localhost:1867/ws/`
        : `wss://${document.location.hostname}/ws/`;
      const newSocket = new WebSocket(aUrl);

      newSocket.onopen = function () {
        console.log("ws open");
        if (store.error) store.error = null;
        store.socket = newSocket;
      };
      newSocket.onerror = function () {
        store.error = "Error connecting to server";
      };
    }
  }, [store.socket]);
  return (
    <div
      className="App"
      style={{
        backgroundColor: Theme.bgColor,
      }}
    >
      <div className="inner-div">
        <ErrorModal />
        <Router>
          <Switch>
            <Route component={ModeHandler} path="/:mode" />
            <Route component={Homepage} path={"/"} />
          </Switch>
        </Router>
      </div>
    </div>
  );
});

export default App;
