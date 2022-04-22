import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";

const CrossContact = ({ CCP, primaryColor }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="link"
        style={{ color: primaryColor }}
        onClick={() => setModalShow(true)}
      >
        Cross Contact Procedure
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
            Cross Contact Procedure
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{CCP}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              color: "white",
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            }}
            onClick={() => setModalShow(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(CrossContact);
