import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";
import CrossContact from "./modals/CrossContact";
import MenuItems from "./MenuItems";
import Filter from "./iconcomponents/Filter";

const OrderMenu = ({ restaurant, selectedAllergies }) => {
  const location = useLocation();
  if (!restaurant.id) {
    return <Redirect to={`${location.pathname.replace("/menu", "")}`} />;
  }
  const safeColor = "#007B2A";
  const categories = restaurant.locations[0].menu.categories;
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  return (
    <Container>
      <Row className="d-flex justify-content-start">
        <Image className="menu-logo" src={restaurant.logo.url} />
      </Row>
      <Container style={{ marginTop: 125 }}>
        <Row className="d-flex flex-column justify-content-start align-items-start">
          <h1 className="menu-title">{restaurant.name}</h1>
          <h2 className="menu-sub-title">{restaurant.locations[0].address}</h2>
        </Row>
        <Row>
          <Button
            className="rounded-button"
            style={{
              backgroundColor: restaurant.primaryColor,
              width: "fit-content",
            }}
          >
            Order Now
          </Button>
        </Row>
        <Row>
          <p style={{ fontWeight: 600, fontSize: "1.5rem", paddingLeft: 0 }}>
            {restaurant.locations[0].menu.dedicatedFrom}
          </p>
        </Row>
        <Row>
          <CrossContact
            CCP={restaurant.locations[0].crossContactProcedure}
            primaryColor={restaurant.primaryColor}
          />
        </Row>
        <Row className="d-flex category-nav noscroll">
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: activeCategory.id === category.id ? "black" : "none",
                backgroundColor:
                  activeCategory.id === category.id
                    ? restaurant.primaryColor
                    : "white",
                color: activeCategory.id === category.id ? "white" : "black",
              }}
              onClick={() => setActiveCategory(category)}
            >
              <p>{category.name}</p>
            </div>
          ))}
        </Row>
        <Row className="d-flex pt-3 filtered-by align-items-center justify-content-between">
          <Col className="d-flex align-items-center flex-wrap">
            <p style={{ paddingLeft: "0.5rem", paddingRight: 0 }}>
              Filtered By:
            </p>
            {Object.values(selectedAllergies)
              .filter(({ selected }) => selected)
              .map(({ name }) => (
                <p
                  key={name}
                  style={{
                    borderRadius: "2rem",
                    background: safeColor,
                    color: "white",
                    padding: "0.5rem 1rem",
                    fontStyle: "italic",
                    fontSize: 10,
                  }}
                >
                  {(() => {
                    const [first, ...rest] = name;
                    const capitalAllergy = first.toUpperCase() + rest.join("");
                    return capitalAllergy;
                  })()}
                </p>
              ))}
          </Col>
          <Col className="col-auto">
            <Filter />
          </Col>
        </Row>
        <MenuItems
          category={activeCategory}
          primaryColor={restaurant.primaryColor}
        />
      </Container>
    </Container>
  );
};

const mapState = (state) => {
  const { restaurant, selectedAllergies } = state.frontend;
  return {
    restaurant,
    selectedAllergies,
  };
};

const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(OrderMenu);
