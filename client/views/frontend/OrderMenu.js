import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Container, Row, Image, Button, Tabs, Tab } from "react-bootstrap";
import CrossContact from "./modals/CrossContact";
import MenuItems from "./MenuItems";

const OrderMenu = ({ restaurant }) => {
  const location = useLocation();

  // Array(15)
  //   .fill("")
  //   .map((_, idx) => ({ id: idx, name: "Category" }));
  // [
  //   { id: 0, name: "One" },
  //   { id: 1, name: "Two" },
  //   { id: 2, name: "Three" },
  // ];
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
          <h1>{restaurant.name}</h1>
          <h2 className="menu-sub-title">{restaurant.locations[0].address}</h2>
        </Row>
        <Button
          className="rounded-button"
          style={{ backgroundColor: restaurant.primaryColor }}
        >
          Order Now
        </Button>
        <p>{restaurant.locations[0].menu.dedicatedFrom}</p>
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
        <MenuItems category={activeCategory} />
      </Container>
    </Container>
  );
};

const mapState = (state) => {
  const { restaurant } = state.frontend;
  return {
    restaurant,
  };
};

const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(OrderMenu);
