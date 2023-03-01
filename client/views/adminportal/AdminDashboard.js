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
    <Container id="adminDashboardComponent">
       <div className="center-flex-start page-path-container">
        <div onClick={() => history.push("/")}>Dashboard</div>
      </div>


      <Row className="space-between-flex">
        <h1 style={{ width: "fit-content" }}>Corporations</h1>
        <CreateNewCorporation className="styled-button" />
      </Row>
      
      <ListGroup>
        {corporations.map((corporation) => (
          <ListGroupItem key={corporation.id} >
            <Row className="space-between-flex corporations">
              <Col
              className="hover-text"
                onClick={() => history.push(`/corporations/${corporation.id}`)}
                style={{ cursor: "pointer" }}
              >
                {corporation.name}
              </Col>
              <Col className="center-flex-start">
                <InviteUser corporation={corporation} />
                <Button className="backend-styled-edit-button" onClick={() => history.push(`/corporations/${corporation.id}`)}>
                &#9998;  Edit
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
      <div className="backend-spacer"></div>
      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>Allergies</h1>

        <Row style={{display: "flex", alignItems:"center", justifyContent: "flex-start"}}>
            <Form.Control
              className="text-input"
              style={{maxWidth: "500px!important"}}
              type="text"
              value={allergyName}
              placeholder="New Allergen Name"
              onChange={({ target: { value } }) => setAllergyName(value)}
            />
            <Button
            className="backend-styled-button" style={{minWidth: "200px"}}
              onClick={() => {
                setAllergyName("");
                addAllergy({ name: allergyName });
              }}
            >
              + Create New Allergen
            </Button>
          
        </Row>
      </Row>
      
      <ListGroup className="backend-allergy-grid">
        {allergies.map((allergy, index) => (
          <Container className="backend-allergy-card center-flex">
            <div style={{textAlign: "center"}}>
            <div className="backend-allergy-image" style={{
                      backgroundImage: `url('../../icons/allergens/${allergy.name}.png')`}}></div>
          <p style={{lineHeight: "18px"}} key={index}>{allergy.name}</p>
            </div>
           
          </Container>
          
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
