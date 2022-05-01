import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";

const InactiveWarning = ({
  inactiveShow,
  setInactiveShow,
  primaryColor,
  timer,
}) => {
  return (
    <>
      {/* <Button
        variant="link"
        style={{
          color: "black",
          padding: 0,
          marginBottom: "1.5rem",
          fontSize: "1.25rem",
          textAlign: "left",
        }}
        onClick={() => setModalShow(true)}
      >
        Cross Contact Procedure
      </Button> */}

      <Modal
        className="noscroll"
        show={inactiveShow}
        onHide={() => setInactiveShow(false)}
        size="xl"
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Inactivity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ textAlign: "center" }}>
            You have been inactive for 30 seconds. Would you like to continue
            looking at the menu?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              color: "white",
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            }}
            onClick={() => {
              clearTimeout(timer.current);
              setInactiveShow(false);
            }}
          >
            Continue
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

export default connect(mapState, mapDispatch)(InactiveWarning);
