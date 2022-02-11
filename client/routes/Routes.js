/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { me } from "../redux/reducers/auth";

import Portal from "../interface/Portal";
import AuthForm from "../views/AuthForm";
import FourOhFour from "../views/FourOhFour";
import Home from "../views/Home";
import Authenticate from "../views/Authenticate";

const Routes = ({ getMe, isLoggedIn, preCheck, auth }) => {
  useEffect(() => {
    getMe();
  }, [isLoggedIn]);

  const renderer = (Component, props) => (
    <Portal {...{ Component, props, preCheck, auth }} />
  );

  return (
    <>
      {isLoggedIn ? (
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => renderer(Authenticate, props)}
          />
          <Route exact path="/" render={(props) => renderer(Home, props)} />

          <Route
            exact
            path="/:any"
            render={(props) => renderer(FourOhFour, props)}
          />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" render={(props) => renderer(AuthForm, props)} />
          <Route
            exact
            path="/login"
            render={(props) => renderer(AuthForm, props)}
          />
        </Switch>
      )}
    </>
  );
};

const mapState = (state) => {
  const { auth, preCheck, validInvitation } = state.auth;
  const isLoggedIn = !!auth.id;
  return {
    isLoggedIn,
    auth,
    preCheck,
    validInvitation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMe() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
