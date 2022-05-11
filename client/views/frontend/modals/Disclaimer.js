import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row } from "react-bootstrap";

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
          <Container style={{ overflow: "scroll", height: 300 }}>
            <p style={{ color: "red" }}>
              **MAKE SURE TO CLICK ON THE MENU ITEMS. THEY MAY CONTAIN
              PERSONALIZED ORDERING INSTRUCTIONS. ALWAYS COMMUNICATE WITH YOUR
              SERVER ABOUT YOUR FOOD RESTRICTIONS.**
            </p>
            <p>
              <strong>You Acknowledge and Agree:</strong> The Services and menu
              are provided for information purposes only and are NOT intended to
              be a replacement for nutritional or medical advice from a licensed
              medical services provider. Restaurants contain a variety of
              allergens and purchase materials from several different suppliers.
              Additionally, standard kitchen operations involve shared cooking
              equipment & preparation areas. As a result, we DO NOT and are
              UNABLE to control the safety of the restaurant environment. You
              are responsible for communicating your specific dietary needs to
              the restaurant. While MyMeal provides information to help you be
              informed about what menu items are subject to possible cross
              contact, neither MyMeal nor the restaurant can guarantee that any
              menu item is completely free from any particular allergen or
              ingredient. Information provided on our site, along with the terms
              and conditions of use may be revised and updated at any time, and
              your continued use of this menu means you understand and accept
              those changes.
            </p>
            <p>
              By accessing and using MyMeal, you agree to indemnify, defend and
              hold harmless MyMeal (including its employees, officers directors,
              attorneys, agents, and affiliates) & any of their partner
              restaurants from any claim, injury, illness, damages, liabilities,
              and any costs whatsoever (“<strong>Claims</strong>”) arising out
              of or relating to your interaction with or visit to any partner
              restaurant.
            </p>
            <p style={{ color: "red" }}>
              **MAKE SURE TO CLICK ON THE MENU ITEMS. THEY MAY CONTAIN
              PERSONALIZED ORDERING INSTRUCTIONS. ALWAYS COMMUNICATE WITH YOUR
              SERVER ABOUT YOUR FOOD RESTRICTIONS.**
            </p>
          </Container>
          <Container>
            <div class="mt-3 form-check form-check-inline">
              <input
                style={{
                  backgroundColor: agreement && primaryColor,
                  borderColor: primaryColor,
                  boxShadow: "none",
                }}
                type="checkbox"
                class="form-check-input"
                value="true"
                type="checkbox"
                value={agreement}
                checked={agreement}
                onChange={({ target: { checked } }) => setAgreement(checked)}
              />
              <label title="" class="form-check-label">
                I agree to the Disclaimer of this allergen tool.
              </label>
            </div>
          </Container>
          {/* <Form.Check
            className="mt-3"
            inline
            label="I agree to the Disclaimer of this allergen tool."
            type="checkbox"
            value={agreement}
            checked={agreement}
            onChange={({ target: { checked } }) => setAgreement(checked)}
          /> */}
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
