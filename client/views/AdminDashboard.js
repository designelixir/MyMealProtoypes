import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import {
  createCorporation,
  fetchCorporations,
} from "../redux/reducers/corporation";
import { Link } from "react-router-dom";
import InviteUser from "./modals/InviteUser";
import { useHistory } from "react-router-dom";

const AdminDashboard = ({ getCorporations, corporations, addCorporation }) => {
  const history = useHistory();
  useEffect(() => {
    getCorporations();
  }, []);
  const [corporationName, setCorporationName] = useState("");
  const handleNewCorporation = () => {
    addCorporation(corporationName);
  };
  return (
    <Container>
      <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
        <Breadcrumb.Item active>Corporations</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Create New Corporation</h1>
      <Row>
        <Col>
          <Form.Control
            type="text"
            value={corporationName}
            placeholder="Name"
            onChange={({ target: { value } }) => setCorporationName(value)}
          />
        </Col>
        <Col>
          <Button onClick={handleNewCorporation}>Add New</Button>
        </Col>
      </Row>
      <h1>Corporations</h1>
      {corporations.map((corporation) => (
        <Row>
          <Col>
            <Link to={`corporations/${corporation.id}`}>
              {corporation.name}
            </Link>
          </Col>
          <Col>
            <InviteUser corporation={corporation} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

const mapState = (state) => {
  const { corporations } = state.corporation;
  return {
    corporations,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addCorporation(data) {
      dispatch(createCorporation(data));
    },
    getCorporations() {
      dispatch(fetchCorporations());
    },
  };
};

export default connect(mapState, mapDispatch)(AdminDashboard);
