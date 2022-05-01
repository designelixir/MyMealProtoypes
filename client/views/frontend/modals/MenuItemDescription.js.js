import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Container,
  Form,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import menuitemData from "../../../utils/menuitemData";
import priceFormat from "../../../utils/priceFormat";
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
          <Container className="d-flex flex-column justify-content-start align-items-center mb-3">
            <p>{menuitem.description}</p>
            <Container
              className="price-type p-0"
              style={{ textAlign: "center" }}
            >
              {menuitem.pricetypes.length === 0 ? (
                priceFormat(menuitem.price)
              ) : (
                <Row className="d-flex flex-column justify-content-start align-items-start">
                  {menuitem.pricetypes.map((pt) => (
                    <Col key={pt.id} className="price-type">
                      {pt.type} - {priceFormat(pt.price)}
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </Container>
          {menuitem.image && (
            <Container
              style={{ padding: 0 }}
              className="d-flex justify-content-center align-items-center mb-4"
            >
              <Image
                className="menu-description-card-img"
                src={menuitem.image.url}
              />
            </Container>
          )}
          {data.meetsRestrictions.length > 0 && (
            <>
              <h4 style={{ fontSize: "1rem" }}>Meets Restrictions:</h4>
              <Container>
                {data.meetsRestrictions.map(({ allergy }, idx) => (
                  <p key={`${allergy}-${idx}`} style={{ color: safeColor }}>
                    {allergy}
                  </p>
                ))}
              </Container>
            </>
          )}
          {data.modifiable.length > 0 && (
            <>
              <h4 style={{ fontSize: "1rem" }}>Modifiable:</h4>
              <Container>
                {data.modifiable.map(({ allergy, description }, idx) => (
                  <p
                    key={`${allergy}-${idx}`}
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
                {data.crossContact.map(({ allergy, description }, idx) => (
                  <p
                    key={`${allergy}-${idx}`}
                    style={{ color: "red" }}
                  >{`${allergy}: ${description}`}</p>
                ))}
              </Container>
            </>
          )}
          {menuitem.ingredients && (
            <>
              <h4 style={{ fontSize: "1rem" }}>Ingredients</h4>
              <Container>
                <p>{menuitem.ingredients}</p>
              </Container>
            </>
          )}
          {menuitem.nutritionFacts && (
            <>
              <h4 style={{ fontSize: "1rem" }}>Nutrition Facts</h4>
              <Container>
                <p>{menuitem.nutritionFacts}</p>
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
