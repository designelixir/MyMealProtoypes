/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../redux/reducers/auth";

import { Button, Form, Row, Col } from "react-bootstrap";

const AuthForm = ({ name, displayName, authenticateUser, error }) => {
  const hasLabel = true;
  const layout = "TODO";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    authenticateUser(formData);
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit} id="authFormComponent">
      <Form.Group className="login-field">
        {hasLabel && <Form.Label>Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "Email address" : ""}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
          className="login-textbox"
        />
      </Form.Group>
      <br></br>

      <Form.Group className="login-field">
        {hasLabel && <Form.Label>Password &nbsp;</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "Password" : ""}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
          className="login-textbox"
          
        />
      </Form.Group>
      <br></br>

      <Row>
        <Col>
          <Form.Check type="checkbox" id="rememberMe">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remember: e.target.checked,
                })
              }
            />
            <Form.Check.Label className="ms-2 mb-0">
              Remember Me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        {/* <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/authentication/${layout}/forgot-password`}
          >
            Forget Password?
          </Link>
        </Col> */}
      </Row>
      <br></br>
      

      <Form.Group>
        <button className="styled-button"
          type="submit"
          style={{backgroundColor: "#4B9BD2", maxWidth: "440px", width: "100%"}}
          disabled={!formData.email || !formData.password}
        >
          Log In
        </button>
      </Form.Group>

      

      {/* <Divider className="mt-4">or log in with</Divider> */}
    </Form>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticateUser(formData) {
      dispatch(authenticate({ ...formData }));
    },
  };
};

export default connect(mapLogin, mapDispatch)(AuthForm);
export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
