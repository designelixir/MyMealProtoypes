import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";

const Disclaimer = ({
  primaryColor,
  location,
  history,
  setSelected,
  selectedAllergies,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [agreement, setAgreement] = useState(false);
  return (
    <>
      <Button
        className="see-menu-button"
        style={{ backgroundColor: primaryColor }}
        onClick={() => {
          setModalShow(true);
        }}
      >
        See Menu
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
            Disclaimer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Disclaimer text</p>
          <Form.Check
            inline
            label="I Agree"
            type="checkbox"
            value={agreement}
            checked={agreement}
            onChange={({ target: { checked } }) => setAgreement(checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!agreement}
            style={{
              color: "white",
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            }}
            onClick={() => {
              setModalShow(false);
              setSelected(selectedAllergies);
              history.push(`${location.pathname}/menu`);
            }}
          >
            See Menu
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

export default connect(mapState, mapDispatch)(Disclaimer);
