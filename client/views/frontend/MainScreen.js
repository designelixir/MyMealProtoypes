import React, {useState} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Image, Button, Modal, Form } from "react-bootstrap";
import CallToActionBanner from "./CallToActionBanner";
import GeneratedByBanner from "./GeneratedByBanner";


const MainScreen = ({ restaurant, setHasRestrictions }) => {
  const history = useHistory();
  return (
    <section className="blur-overlay center-flex" id="mainScreenComponent" style={{
      backgroundImage: `url(${
        restaurant.bg ? restaurant.bg.url : "/bartacobg.jpeg"
      })`}}>
      <div className="main-screen-component-wrapper" >
        
          <Image
            className="restaurant-logo img-drop-shadow"
            src={
              restaurant.logo ? restaurant.logo.url : '/bartaco.png'
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
      
      <GeneratedByBanner></GeneratedByBanner>
    </section>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
