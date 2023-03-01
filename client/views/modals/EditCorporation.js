import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";
import { updateCorporation } from "../../redux/reducers/corporation";

const EditCorporation = ({ corporation, editCorporation }) => {
  const [modalShow, setModalShow] = useState(false);
  const [corporationData, setCorporationData] = useState({
    name: corporation.name,
    crossContactProcedure: corporation.crossContactProcedure,
  });
  const handleChange = ({ target: { name, value } }) => {
    setCorporationData({ ...corporationData, [name]: value });
  };
  const handleEditCorporation = () => {
    editCorporation({ corporationId: corporation.id, body: corporationData });
    setModalShow(false);
  };
  return (
    <>
      <Button
      className="backend-styled-edit-button"
        variant="primary"
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
        &#9998; Edit Corporation
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
          <Modal.Header className="space-between-flex">
          <h3 id="contained-modal-title-vcenter">
           Edit Corporation
          </h3>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label><br></br>
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
          /><br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleEditCorporation}>Update</Button>
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
    editCorporation(data) {
      dispatch(updateCorporation(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditCorporation);
