import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
// import Logo from "../Logo";
// import Section from "../common/Section";
// import AuthSimpleRoutes from 'components/authentication/simple/AuthSimpleRoutes';
import Login from "./AuthForm";

export const AuthSimpleLayout = ({ match: { path } }) => {
  return (
    <Container className="py-0">
      <h1>Login</h1>
      <Login />
    </Container>
  );
};

export default AuthSimpleLayout;
