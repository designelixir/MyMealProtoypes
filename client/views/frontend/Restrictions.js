import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Image, Button, Row } from "react-bootstrap";
import { setSelectedAllergy } from "../../redux/reducers/frontend";

const Restrictions = ({ restaurant, setHasRestrictions, setSelected }) => {
  const history = useHistory();
  const location = useLocation();
  const [selectedAllergies, setSelectedAllergies] = useState(
    restaurant.locations[0].menu.allergies.reduce((allergyObj, allergy) => {
      allergyObj[allergy.id] = {
        name: allergy.name,
        selected: false,
        cross: false,
      };
      return allergyObj;
    }, {})
  );
  return (
    <Container
      className="d-flex flex-column justify-content-start align-items-center noscroll"
      style={{ height: "100%", overflow: "scroll" }}
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
        <Container className="d-flex flex-wrap justify-content-evenly">
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
                  <p style={{ paddingTop: "1rem" }}>
                    Are you sensitive to cross contact?
                  </p>
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
        <Button
          className="see-menu-button"
          style={{ backgroundColor: restaurant.primaryColor }}
          onClick={() => {
            setSelected(selectedAllergies);
            history.push(`${location.pathname}/menu`);
          }}
        >
          See Menu
        </Button>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatch = (dispatch) => {
  return {
    setSelected(selectedAllergies) {
      dispatch(setSelectedAllergy(selectedAllergies));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Restrictions);
