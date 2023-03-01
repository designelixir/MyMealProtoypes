import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row } from "react-bootstrap";
import WaitlistBanner from "../WaitlistBanner";


const Disclaimer = ({
  primaryColor,
  location,
  history,
  setSelected,
  selectedAllergies,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [agreement, setAgreement] = useState(false);

  const [isBannerShown, setBannerIsShown] = useState(false);
  const handleBannerClick = event => {
  setBannerIsShown(current => !current);
};

  return (
    <>
    <Container className="disclaimer-container top-box-shadow" >
        <h3 style={{lineHeight: "0"}}>DISCLAIMER</h3>
        <p id="show-menu-button-error" >Please scroll to the bottom of the terms to view your allergen menu.</p>

        <div id="scroll-disclaimer" onScroll={showMenuButton} >
        <strong style={{color: "red"}}><p>****MAKE SURE TO CLICK ON THE MENU ITEMS. THEY MAY CONTAIN PERSONALIZED ORDERING INSTRUCTIONS. ALWAYS COMMUNICATE WITH YOUR SERVER ABOUT YOUR FOOD RESTRICTIONS.**</p></strong>
          <p><strong>You Acknowledge and Agree:</strong> The Services and menu are provided for information purposes only and are NOT intended to be a replacement for nutritional or medical advice from a licensed medical services provider. Restaurants contain a variety of allergens and purchase materials from several different suppliers. Additionally, standard kitchen operations involve shared cooking equipment & preparation areas. As a result, we DO NOT and are UNABLE to control the safety of the restaurant environment. You are responsible for communicating your specific dietary needs to the restaurant. While MyMeal provides information to help you be informed about what menu items are subject to possible cross contact, neither MyMeal nor the restaurant can guarantee that any menu item is completely free from any particular allergen or ingredient. Information provided on our site, along with the terms and conditions of use may be revised and updated at any time, and your continued use of this menu means you understand and accept those changes. By accessing and using MyMeal, you agree to indemnify, defend and hold harmless MyMeal (including its employees, officers directors, attorneys, agents, and affiliates) & any of their partner restaurants from any claim, injury, illness, damages, liabilities, and any costs whatsoever (“Claims”) arising out of or relating to your interaction with or visit to any partner restaurant.</p>
        </div>

        
        <div className="center-flex">
          <Button
            className="styled-button"
            id="show-menu-button"
            style={{
              color: "white", margin: "15px 0px 0px 0px",
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            }}
            onClick={() => {
              handleBannerClick
              setModalShow(false);
              setSelected(selectedAllergies);
              history.push(`${location.pathname}/menu`);
            }}
          >
            See Menu
          </Button>

        </div>
        {isBannerShown && <WaitlistBanner />}
        
    </Container>
    </>
  );
};


function showMenuButton(){
  var obj = document.getElementById('scroll-disclaimer');
  if( obj.scrollTop === (obj.scrollHeight - obj.offsetHeight))
    {
      var menuButton = document.getElementById('show-menu-button');
      menuButton.style.opacity = 1
      menuButton.style.pointerEvents = "auto"
      document.getElementById('show-menu-button-error').style.display="none"
      document.getElementById('scroll-disclaimer').style.boxShadow="none"
    } 
}

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Disclaimer);
