/* eslint-disable no-unused-vars */
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./interface/Main";
import GoogleAnalyticsTracker from './hoc/google_analytics_tracker.js';

render(
  <Provider store={store}>
    <Router>
      <Main />
      <GoogleAnalyticsTracker />
    </Router>
  </Provider>,
  document.getElementById("main")
);
