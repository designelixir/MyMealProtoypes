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
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
        Create
      </Button>

      <Modal
        className="noscroll"
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xl"
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Corporation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Corporation Name</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="name"
            value={corporationData.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <Form.Label>Cross Contact Procedure</Form.Label>
          <Form.Control
            type="textarea"
            as="textarea"
            name="crossContactProcedure"
            value={corporationData.crossContactProcedure}
            placeholder="Procedure"
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleNewCorporation}>Create</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
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
