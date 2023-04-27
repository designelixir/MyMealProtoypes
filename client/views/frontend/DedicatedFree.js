import React, { useState, useRef, useEffect, rgba } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";
import MenuWindow from "./MenuWindow";
import "react-loading-skeleton/dist/skeleton.css";
import { setSelectedAllergy } from "../../redux/reducers/frontend";
import WaitlistBanner from "./WaitlistBanner";
import KitchenProceduresWindow from "./KitchenProceduresWindow";

const DedicatedFree = ({ restaurant, categories, selectedAllergies, setSelectedAllergies }) => {

  const location = useLocation();
  const history = useHistory();

  if (!restaurant.id) {
    return <Redirect to={`${location.pathname.replace("/menu", "")}`} />;
  }



  const safeColor = "#007B2A";

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [modalShow, setModalShow] = useState(false);
  const [inactiveShow, setInactiveShow] = useState(false);

  const categoryRefs = categories.map(({ name }) => useRef(name));
  
  const [show, setShow] = useState(false);



  return (
    <div className="dedicated-allergen-card-container center-flex">
        <div className="dedicated-allergen-card">
          <p>{restaurant.locations[0].menu.dedicatedFrom}</p>
        </div>    
      </div>
  );
};
console.log('this is the dedicated free:' + restaurant.locations[0].menu.dedicatedFrom)

const changeStyles = () => {
  let element = document.getElementById('menu-tab-button')
  console.log("clicked")
  ReactDOM.findDOMNode(element).style.backgroundColor = this.state.isClicked?'black' : 'white'
}

const mapState = (state) => {
  const { restaurant, categories, selectedAllergies } = state.frontend;
  return {
    restaurant,
    categories,
    selectedAllergies,
  };
};



const mapDispatchToProps = {};

export default connect(mapState, mapDispatchToProps)(DedicatedFree);
