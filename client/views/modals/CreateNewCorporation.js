import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";
import { createCorporation } from "../../redux/reducers/corporation";

const CreateNewCorporation = ({ addCorporation }) => {
  const [modalShow, setModalShow] = useState(false);
  const [corporationData, setCorporationData] = useState({
    name: "",
    crossContactProcedure: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setCorporationData({ ...corporationData, [name]: value });
  };
  const handleNewCorporation = () => {
    addCorporation(corporationData);
    setModalShow(false);
  };
  return (
    <>
      <Button
        variant="primary"
        className="backend-styled-button"
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
        + Create Corporation
      </Button>

      <Modal
        className="noscroll modal-window"
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xl"
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container className="modal-container">
        <Modal.Header className="space-between-flex" >
          <h3 id="contained-modal-title-vcenter">
            Create New Corporation
          </h3>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Corporation Name</Form.Label> <br></br>
          <Form.Control
            className="text-input"
            type="text"
            name="name"
            value={corporationData.name}
            placeholder="Name"
            onChange={handleChange}
          /><br></br>
          <Form.Label>Cross Contact Procedure</Form.Label><br></br>
          <Form.Control
            className="text-area"
            type="textarea"
            as="textarea"
            name="crossContactProcedure"
            value={corporationData.crossContactProcedure}
            placeholder="Procedure"
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleNewCorporation}>Create</Button>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
        </Container>
        
      </Modal>
    </>
  );
};

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => {
  return {
    addCorporation(data) {
      dispatch(createCorporation(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewCorporation);
