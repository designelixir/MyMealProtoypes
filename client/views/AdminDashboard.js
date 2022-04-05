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
import CreateNewCorporation from "./modals/CreateNewCorporation";

const AdminDashboard = ({ getCorporations, corporations, addCorporation }) => {
  const history = useHistory();
  useEffect(() => {
    getCorporations();
  }, []);
  const [corporationData, setCorporationData] = useState({
    name: "",
    crossContactProcedure: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setCorporationData({ ...corporationData, [name]: value });
  };
  const handleNewCorporation = () => {
    addCorporation(corporationData);
  };
  return (
    <Container>
      <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
        <Breadcrumb.Item active>Corporations</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>Corporations</h1>
        <CreateNewCorporation />
      </Row>
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
    getCorporations() {
      dispatch(fetchCorporations());
    },
  };
};

export default connect(mapState, mapDispatch)(AdminDashboard);
