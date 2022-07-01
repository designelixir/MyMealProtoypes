import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Breadcrumb,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import {
  createCorporation,
  fetchCorporations,
} from "../../redux/reducers/corporation";
import { Link } from "react-router-dom";
import InviteUser from "../modals/InviteUser";
import { useHistory } from "react-router-dom";
import CreateNewCorporation from "../modals/CreateNewCorporation";
import Divider from "../components/Divider";
import { createAllergy, fetchAllergies } from "../../redux/reducers/allergy";

const AdminDashboard = ({
  getCorporations,
  corporations,
  addCorporation,
  getAllergies,
  allergies,
  addAllergy,
}) => {
  const history = useHistory();
  useEffect(() => {
    getAllergies();
    getCorporations();
  }, []);
  const [corporationData, setCorporationData] = useState({
    name: "",
    crossContactProcedure: "",
  });
  const [allergyName, setAllergyName] = useState("");
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
      <Divider />
      <ListGroup>
        {corporations.map((corporation) => (
          <ListGroupItem key={corporation.id} className="mb-3">
            <Row>
              <Col
                onClick={() => history.push(`/corporations/${corporation.id}`)}
                style={{ cursor: "pointer" }}
              >
                {corporation.name}
              </Col>
              <Col>
                <InviteUser corporation={corporation} />
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>Allergies</h1>

        <Row>
          <Col>
            <Form.Control
              type="text"
              value={allergyName}
              placeholder="Name"
              onChange={({ target: { value } }) => setAllergyName(value)}
            />
          </Col>
          <Col>
            <Button
              onClick={() => {
                setAllergyName("");
                addAllergy({ name: allergyName });
              }}
            >
              Add New
            </Button>
          </Col>
        </Row>
      </Row>
      <Divider />
      <ListGroup>
        {allergies.map((allergy, index) => (
          <ListGroupItem key={index}>{allergy.name}</ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

const mapState = (state) => {
  const { corporations } = state.corporation;
  const { allergies } = state.allergy;
  return {
    corporations,
    allergies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCorporations() {
      dispatch(fetchCorporations());
    },
    getAllergies() {
      dispatch(fetchAllergies());
    },
    addAllergy(data) {
      dispatch(createAllergy(data));
    },
  };
};

export default connect(mapState, mapDispatch)(AdminDashboard);
