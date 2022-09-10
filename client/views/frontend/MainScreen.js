import React, {useState} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Image, Button, Modal, Form } from "react-bootstrap";
import mixpanel from 'mixpanel-browser';

const MainScreen = ({ restaurant, setHasRestrictions }) => {
  const history = useHistory();
  return (
    <Container
      className="d-flex flex-column justify-content-evenly align-items-center"
      style={{ height: "100%" }}
    >
      <h1 className="above-overlay welcome-header">
        Welcome to {restaurant.name}
      </h1>
      <Image
        className="above-overlay welcome-logo"
        src={
          restaurant.logo ? restaurant.logo.url : "/img/demo-restauarant.png"
        }
      />
      <Button
        className="above-overlay welcome-button"
        style={{
          backgroundColor: restaurant.primaryColor,
        }}
        onClick={function() {
          mixpanel.track('Clicked Allegy Menu button')
          setHasRestrictions(true)
        }}
      >
        Allergy Menu
      </Button>
      {/* <Container className="d-flex flex-column justify-content-between align-items-center">
      </Container> */}
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
