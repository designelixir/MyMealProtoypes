import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { receiveInvitation, registerInvitation } from "../redux/reducers/auth";
import { Redirect } from "react-router-dom";

const RegisterInvite = ({
  recieveAccessToken,
  match,
  id,
  validInvitation,
  validatingInvitation,
  register,
  registerSuccessful,
}) => {
  const { accessToken } = match.params;
  useEffect(() => {
    recieveAccessToken(accessToken);
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };
  console.log(registerSuccessful);
  if (registerSuccessful) {
    return <Redirect to={"/"} />;
  }
  if (validatingInvitation) {
    return <p>Validating</p>;
  } else if (!validInvitation) {
    return <p>Invalid</p>;
  }
  return (
    <Form>
      <div className="mb-4">
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Form.Control
          name="firstName"
          type="text"
          autoComplete="off"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Form.Label htmlFor="lastName">Last Name</Form.Label>
        <Form.Control
          name="lastName"
          type="text"
          autoComplete="off"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Form.Label htmlFor="email">Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          autoComplete="off"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Form.Label htmlFor="email">Confirm password</Form.Label>
        <Form.Control
          name="confirmPassword"
          type="password"
          autoComplete="off"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <Button
        disabled={
          !formData.firstName ||
          !formData.lastName ||
          !formData.password ||
          !formData.confirmPassword ||
          formData.password !== formData.confirmPassword
        }
        onClick={() =>
          register({
            data: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              password: formData.password,
            },
            userId: id,
          })
        }
      >
        Send
      </Button>
    </Form>
  );
};

const mapState = (state) => {
  const { id, validInvitation, validatingInvitation, registerSuccessful } =
    state.auth;
  return {
    id,
    validInvitation,
    validatingInvitation,
    registerSuccessful,
  };
};

const mapDispatch = (dispatch) => {
  return {
    register(data) {
      dispatch(registerInvitation(data));
    },
    recieveAccessToken(accessToken) {
      dispatch(receiveInvitation(accessToken));
    },
  };
};

export default connect(mapState, mapDispatch)(RegisterInvite);
