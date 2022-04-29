import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";
import menuitemData from "../../../utils/menuitemData";
const MenuItemDescription = ({
  modalShow,
  setModalShow,
  menuitem,
  primaryColor,
  selectedAllergies,
  safeColor,
  modColor,
}) => {
  const data = menuitemData(menuitem, selectedAllergies);
  console.log(menuitem.name, data);
  return (
    <>
      <Modal
        className="noscroll"
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {menuitem.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{menuitem.name}</p>
          {data.meetsRestrictions.length > 0 && (
            <>
              <h4 style={{ fontSize: "1rem" }}>Meets Restrictions:</h4>
              <Container>
                {data.meetsRestrictions.map(({ allergy }) => (
                  <p style={{ color: safeColor }}>{allergy}</p>
                ))}
              </Container>
            </>
          )}
          {data.modifiable.length > 0 && (
            <>
              <h4 style={{ fontSize: "1rem" }}>Modifiable:</h4>
              <Container>
                {data.modifiable.map(({ allergy, description }) => (
                  <p
                    style={{ color: modColor }}
                  >{`${allergy}: ${description}`}</p>
                ))}
              </Container>
            </>
          )}
          {data.crossContact.length > 0 && (
            <>
              <h4 style={{ fontSize: "1rem" }}>*CROSS CONTACT WARNING*</h4>
              <Container>
                {data.crossContact.map(({ allergy, description }) => (
                  <p style={{ color: "red" }}>{`${allergy}: ${description}`}</p>
                ))}
              </Container>
            </>
          )}
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

export default connect(mapState, mapDispatch)(MenuItemDescription);
