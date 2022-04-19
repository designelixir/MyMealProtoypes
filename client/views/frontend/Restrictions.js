import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Image, Button, Row } from "react-bootstrap";

export const Restrictions = ({ restaurant, setHasRestrictions }) => {
  const [selectedAllergies, setSelectedAllergies] = useState(
    restaurant.locations[0].menu.allergies.reduce((allergyObj, allergy) => {
      allergyObj[allergy.id] = { selected: false, cross: false };
      return allergyObj;
    }, {})
  );
  return (
    <Container
      className="d-flex flex-column justify-content-start align-items-center"
      style={{ height: "100%", padding: "1rem 4rem" }}
    >
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <Image
          className="above-overlay restriction-logo"
          src={restaurant.logo.url}
        />
        <p className="above-overlay">
          {restaurant.locations[0].menu.dedicatedFrom}
        </p>
      </Container>
      <Container className="d-flex flex-column justify-content-start align-items-center restriction-container above-overlay">
        <Row
          className="d-flex justify-content-center align-items-center restriction-header above-overlay"
          style={{ backgroundColor: restaurant.primaryColor, color: "white" }}
        >
          Select Your Dietary Resitrictions
        </Row>
        <Container className="d-flex flex-wrap justify-content-between">
          {restaurant.locations[0].menu.allergies.map((allergy) => (
            <div
              key={allergy.id}
              className="allergy-card"
              style={{
                height: selectedAllergies[allergy.id].selected ? 140 : 40,
              }}
            >
              <Row
                className="d-flex justify-content-center align-items-center allergy-header above-overlay"
                style={{
                  backgroundColor: selectedAllergies[allergy.id].selected
                    ? restaurant.primaryColor
                    : "white",
                  color: selectedAllergies[allergy.id].selected
                    ? "white"
                    : "black",
                }}
                onClick={() =>
                  setSelectedAllergies({
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
                  <p>Are you sensitive to cross contact?</p>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Button
                      onClick={() =>
                        setSelectedAllergies({
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
                          : restaurant.primaryColor,
                        border: !selectedAllergies[allergy.id].cross
                          ? "1px solid black"
                          : "none",
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() =>
                        setSelectedAllergies({
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
                          : restaurant.primaryColor,
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
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Restrictions);
