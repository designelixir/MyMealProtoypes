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
      <Button className="backend-styled-edit-button" variant="link" onClick={() => setModalShow(true)}>
       Invite User
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
            Invite User to {corporation.name}
          </h3>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="text-input"
            type="text"
            value={email}
            placeholder="Email"
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleSendNewInvite}>Send</Button>
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
    sendInvitation(data) {
      dispatch(sendNewInvitation(data));
    },
  };
};

export default connect(mapState, mapDispatch)(InviteUserModal);
