import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Container, Row, Image, Button, Tabs, Tab } from "react-bootstrap";
import CrossContact from "./modals/CrossContact";
import MenuItems from "./MenuItems";

const OrderMenu = ({ restaurant, selectedAllergies }) => {
  const location = useLocation();
  if (!restaurant.id) {
    return <Redirect to={`${location.pathname.replace("/menu", "")}`} />;
  }
  const categories = restaurant.locations[0].menu.categories;
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  return (
    <Container>
      <Row className="d-flex justify-content-start">
        <Image className="menu-logo" src={restaurant.logo.url} />
      </Row>
      <Container>
        <Row className="d-flex flex-column justify-content-start align-items-start">
          <h1 className="menu-title">{restaurant.name}</h1>
          <h2 className="menu-sub-title">{restaurant.locations[0].address}</h2>
        </Row>
        <Button
          className="rounded-button"
          style={{
            backgroundColor: restaurant.primaryColor,
          }}
        >
          Order Now
        </Button>
        <p style={{ fontWeight: 600 }}>
          {restaurant.locations[0].menu.dedicatedFrom}
        </p>
        <CrossContact
          CCP={restaurant.locations[0].crossContactProcedure}
          primaryColor={restaurant.primaryColor}
        />
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
        <Row className="d-flex pt-3 filtered-by align-items-center">
          <p style={{ paddingLeft: "0.5rem" }}>Filtered By: </p>
          {Object.values(selectedAllergies)
            .filter(({ selected }) => selected)
            .map(({ name }) => (
              <p key={name}>{name}</p>
            ))}
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
