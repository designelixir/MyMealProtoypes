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
        variant="primary"
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
        Edit
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
            Edit Corporation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
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
          <Button onClick={handleEditCorporation}>Update</Button>
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
    editCorporation(data) {
      dispatch(updateCorporation(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditCorporation);
