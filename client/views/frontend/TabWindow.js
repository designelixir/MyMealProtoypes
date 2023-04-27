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
import MenuWindow from "./MenuWindow";
import InactiveWarning from "./modals/InactiveWarning";
import { Categories } from "./Categories";
import { capitalize } from "../../utils/common";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollSpyTabs from "./ScrollSpyTabs";

import WaitlistBanner from "./WaitlistBanner";
import KitchenProceduresWindow from "./KitchenProceduresWindow";

class TabWindow extends React.Component {
    constructor() {
      super();
  
      this.state = { active: false} 
    }
  
    toggleMenu = () => {
  
    // function that will toggle active/false
      this.setState((prevState) => {
        active: !prevState.active
      });
    }
  
  
    render() {
      return ( 
        <div>
          <KitchenProceduresWindow active={this.state.active} onClick={this.toggleMenu} />
          <MenuWindow active={this.state.active} />
        </div>
      )
    }
  }