/* eslint-disable no-unused-vars */
import React from "react";
import Routes from "../routes/Routes";
import Home from "../views/Home";
import { Container } from "react-bootstrap";
import Nav from "./Nav";
import { useLocation } from "react-router-dom";


const Main = () => {
  
  return (
    <div>
      <Routes />
    </div>
  );
};

export default Main;
