import React, {useState} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Image, Button, Modal, Form } from "react-bootstrap";
import CallToActionBanner from "./CallToActionBanner";


const MainScreen = ({ restaurant, setHasRestrictions }) => {
  const history = useHistory();
  return (
    <section className="blur-overlay center-flex" id="mainScreenComponent">
      <div className="main-screen-component-wrapper">
        
          <Image
            className="restaurant-logo"
            src={
              restaurant.logo ? restaurant.logo.url : "/img/demo-restauarant.png"
            }
          />
        
        <div className="full-width-center-flex">
          <button
            className="styled-button bottom-box-shadow"
            style={{ backgroundColor: restaurant.primaryColor }}
            onClick={function () {
              setHasRestrictions(true);
            }}
          >
            View <strong>Allergy Menu →</strong>
          </button>
        </div>
      </div>
      {/* <CallToActionBanner></CallToActionBanner> */}
    </section>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
