import React, { useState, useRef, useEffect, rgba } from "react";
import { connect } from "react-redux";
import { useIdleTimer } from "react-idle-timer";
import Scrollspy from "react-scrollspy";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";
import CrossContact from "./modals/CrossContact";
import MenuItems from "./MenuItems";
import Category from "./Category";
import Filter from "./iconcomponents/Filter";
import AllergyFilters from "./modals/AllergyFilters";
import InactiveWarning from "./modals/InactiveWarning";
import { Categories } from "./Categories";
import { capitalize } from "../../utils/common";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollSpyTabs from "./ScrollSpyTabs";



const MenuWindow = ({ restaurant, categories, selectedAllergies, CCP }) => {

  const location = useLocation();
  const history = useHistory();

  if (!restaurant.id) {
    return <Redirect to={`${location.pathname.replace("/menu", "")}`} />;
  }


  return (
    <section className="menu-section ">
      <div className="bottom-box-shadow" style={{backgroundColor: restaurant.primaryColor, padding: "25px", borderRadius: "0px 6px 6px 6px"}}>
        <p style={{color: "white"}}>{restaurant.name} does the following to ensure your food is safe: </p>
      </div>
      <div className="kitchen-procedures-container">
          <p style={{ whiteSpace: "pre-line" }}>{restaurant.crossContactProcedure}</p>
      </div>
    </section>
    
  );
};

const mapState = (state) => {
  const { restaurant, categories, selectedAllergies } = state.frontend;
  return {
    restaurant,
    categories,
    selectedAllergies,
  };
};

const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(MenuWindow);

