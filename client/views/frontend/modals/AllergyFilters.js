import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Row, Form } from "react-bootstrap";
import { setSelectedAllergy } from "../../../redux/reducers/frontend";

const AllergyFilters = ({
  modalShow,
  setModalShow,
  restaurantAllergies,
  primaryColor,
  selectedAllergies,
  setSelected,
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
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xl"
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Allergy Filters
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex flex-wrap justify-content-evenly">
            {restaurantAllergies.map((allergy) => (
              <div
                key={allergy.id}
                className="allergy-card-popup"
                style={{
                  height: selectedAllergies[allergy.id].selected ? 140 : 40,
                }}
              >
                <Row
                  className="d-flex justify-content-center align-items-center allergy-header above-overlay"
                  style={{
                    backgroundColor: selectedAllergies[allergy.id].selected
                      ? primaryColor
                      : "white",
                    color: selectedAllergies[allergy.id].selected
                      ? "white"
                      : "black",
                  }}
                  onClick={() =>
                    setSelected({
                      ...selectedAllergies,
                      [allergy.id]: {
                        ...selectedAllergies[allergy.id],
                        selected: !selectedAllergies[allergy.id].selected,
                      },
                    })
                  }
                >
                  {allergy.name}
                </Row>
                {selectedAllergies[allergy.id].selected && (
                  <div className="allergy-info d-flex flex-column">
                    <p style={{ paddingTop: "1rem" }}>
                      Are you sensitive to cross contact?
                    </p>
                    <Row className="d-flex justify-content-center align-items-center">
                      <Button
                        onClick={() =>
                          setSelected({
                            ...selectedAllergies,
                            [allergy.id]: {
                              ...selectedAllergies[allergy.id],
                              cross: true,
                            },
                          })
                        }
                        className="cross-contact-button"
                        style={{
                          color: !selectedAllergies[allergy.id].cross
                            ? "black"
                            : "white",
                          backgroundColor: !selectedAllergies[allergy.id].cross
                            ? "white"
                            : primaryColor,
                          border: !selectedAllergies[allergy.id].cross
                            ? "1px solid black"
                            : "none",
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={() =>
                          setSelected({
                            ...selectedAllergies,
                            [allergy.id]: {
                              ...selectedAllergies[allergy.id],
                              cross: false,
                            },
                          })
                        }
                        className="cross-contact-button ms-3"
                        style={{
                          color: selectedAllergies[allergy.id].cross
                            ? "black"
                            : "white",
                          backgroundColor: selectedAllergies[allergy.id].cross
                            ? "white"
                            : primaryColor,
                          border: selectedAllergies[allergy.id].cross
                            ? "1px solid black"
                            : "none",
                        }}
                      >
                        No
                      </Button>
                    </Row>
                  </div>
                )}
              </div>
            ))}
          </Container>
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
  const { selectedAllergies } = state.frontend;
  return {
    selectedAllergies,
  };
};
const mapDispatch = (dispatch) => {
  return {
    setSelected(selectedAllergies) {
      dispatch(setSelectedAllergy(selectedAllergies));
    },
  };
};

export default connect(mapState, mapDispatch)(AllergyFilters);
