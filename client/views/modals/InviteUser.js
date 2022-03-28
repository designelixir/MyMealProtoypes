import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";
import { sendNewInvitation } from "../../redux/reducers/auth";

const InviteUserModal = ({ corporation, sendInvitation }) => {
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const handleSendNewInvite = () => {
    sendInvitation({ email, corporationId: corporation.id });
  };
  return (
    <>
      <Button variant="link" onClick={() => setModalShow(true)}>
        Invite User
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
            Invite User to {corporation.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={email}
            placeholder="Email"
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSendNewInvite}>Send</Button>
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
    sendInvitation(data) {
      dispatch(sendNewInvitation(data));
    },
  };
};

export default connect(mapState, mapDispatch)(InviteUserModal);
