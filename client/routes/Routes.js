/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { me } from "../redux/reducers/auth";

import Portal from "../interface/Portal";
import AuthForm from "../views/AuthForm";
import FourOhFour from "../views/FourOhFour";
import Home from "../views/Home";
import Menu from "../views/Menu";
import Authenticate from "../views/Authenticate";
import Dashboard from "../views/Dashboard";
import Corporation from "../views/Corporation";
import RegisterInvite from "../views/RegisterInvite";
import Restaurant from "../views/Restaurant";
import Category from "../views/Category";
import MenuItem from "../views/MenuItem";

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
          <Route
            exact
            path="/"
            render={(props) => renderer(Dashboard, props)}
          />
          <Route
            exact
            path="/corporations/:corporationId"
            render={(props) => renderer(Corporation, props)}
          />
          <Route
            exact
            path="/corporations/:corporationId/restaurants/:restaurantId"
            render={(props) => renderer(Restaurant, props)}
          />
          <Route
            exact
            path="/corporations/:corporationId/restaurants/:restaurantId/menus/:menuId"
            render={(props) => renderer(Menu, props)}
          />
          <Route
            exact
            path="/corporations/:corporationId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId"
            render={(props) => renderer(Category, props)}
          />
          <Route
            exact
            path="/corporations/:corporationId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/menuitems/:menuitemId"
            render={(props) => renderer(MenuItem, props)}
          />
          <Route
            exact
            path="/:any"
            render={(props) => renderer(FourOhFour, props)}
          />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" render={(props) => renderer(Home, props)} />
          <Route
            exact
            path="/invite/:accessToken"
            render={(props) => renderer(RegisterInvite, props)}
          />
          <Route
            exact
            path="/menus/:menuId"
            render={(props) => renderer(Menu, props)}
          />
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
