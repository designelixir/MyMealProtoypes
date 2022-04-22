import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Image, Button } from "react-bootstrap";

const MainScreen = ({ restaurant, setHasRestrictions }) => {
  const history = useHistory();
  return (
    <Container
      className="d-flex flex-column justify-content-evenly align-items-center"
      style={{ height: "100%" }}
    >
      <Container className="d-flex flex-column justify-content-between align-items-center">
        <h1 className="above-overlay welcome-header">
          Welcome to {restaurant.name}
        </h1>
        <Image
          className="above-overlay welcome-logo"
          src={restaurant.logo.url}
        />
      </Container>
      <Container className="d-flex flex-column justify-content-between">
        <Button
          className="above-overlay welcome-button"
          style={{
            backgroundColor: "white",
            color: "black",
          }}
          onClick={() => history.push(`${location.pathname}/menu`)}
        >
          I'M READY TO ORDER
        </Button>
        <Button
          className="above-overlay welcome-button"
          style={{
            backgroundColor: restaurant.primaryColor,
            color: "white",
            marginTop: "1rem",
          }}
          onClick={() => setHasRestrictions(true)}
        >
          I HAVE A FOOD RESTRICTION
        </Button>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
