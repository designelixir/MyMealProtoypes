/* eslint-disable no-unused-vars */
import React from "react";
import Routes from "../routes/Routes";
import Home from "../views/Home";
import { Container } from "react-bootstrap";
import Nav from "./Nav";
import { useLocation } from "react-router-dom";
import mixpanel from 'mixpanel-browser';

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    trackMenuPageViews(location.pathname);
  }, [location]);
}

function trackMenuPageViews(location) {
  if (location.match(/order/g)[0]) {
    mixpanel.track('Menu Page View', {
      'Location': location
    })
  }
}

const Main = () => {
  usePageViews()
  return (
    <div>
      <Routes />
    </div>
  );
};

export default Main;
