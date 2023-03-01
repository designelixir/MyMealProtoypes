import React, { useState, useRef, useEffect, rgba } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";
import MenuWindow from "./MenuWindow";
import "react-loading-skeleton/dist/skeleton.css";
import mixpanel from 'mixpanel-browser';
import { setSelectedAllergy } from "../../redux/reducers/frontend";
import WaitlistBanner from "./WaitlistBanner";
import KitchenProceduresWindow from "./KitchenProceduresWindow";

const OrderMenu = ({ restaurant, categories, selectedAllergies, setSelectedAllergies }) => {

  const location = useLocation();
  const history = useHistory();

  if (!restaurant.id) {
    return <Redirect to={`${location.pathname.replace("/menu", "")}`} />;
  }

  const timer = useRef(null);
  const handleOnIdle = (event) => {
    setInactiveShow(true);
    timer.current = setTimeout(() => {
      history.push(`${location.pathname.replace("/menu", "")}`);
    }, 10000);
  };

  const safeColor = "#007B2A";

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [modalShow, setModalShow] = useState(false);
  const [inactiveShow, setInactiveShow] = useState(false);

  const categoryRefs = categories.map(({ name }) => useRef(name));
  
  const [show, setShow] = useState(false);

  


  return (
    <section id="orderMenuComponent">
    {/* MAIN HEADER */}
    <div className="blur-overlay" style= {{backgroundImage: `url(${restaurant.bg ? restaurant.bg.url : "/img/generic-bg.jpg"})`}}>
      <div className="menu-header blur-overlay" >
      <div className="menu-header-contents  center-flex">
        <div className="menu-header-logo-container center-flex">
        <Image
            className="menu-back-button"
            onClick={() =>
              history.push(`${location.pathname.replace("/menu", "")}`)
            }
            src={"/img/back-arrow.png"}
          />
          <Image
            className="menu-header-logo"
            src={
              restaurant.logo
                ? restaurant.logo.url
                : "/img/demo-restauarant.png"
            }
          />
        </div>
        <div className="menu-header-title-container">
            <h1>{restaurant.name} Menu</h1>
            <p>{restaurant.locations[0].address}</p>
        </div>
        <div className="menu-header-order-button-container center-flex">
        {restaurant.locations[0].menu.orderNow && (
          <button
            className="bottom-box-shadow styled-button"
            style={{
              backgroundColor: restaurant.primaryColor,
            }}
            onClick={function() {
              mixpanel.track('Clicked Menu Order Now button')
              window.open(restaurant.locations[0].menu.orderNow, "_blank")
            }}
          >
            Order Online
          </button>
          )}
        </div>
        
      </div>
      {restaurant.locations[0].menu.dedicatedFrom && (
        <div className="dedicated-free">
          <div className="dedicated-free-title center-flex">
            <p className="tab" style={{backgroundImage: "url(/img/tab.png)"}}>This kitchen is dedicated free from: </p>
          </div>
        </div>
      )}
      <div className="dedicated-allergen-card-container center-flex">
        <div className="dedicated-allergen-card">
          <p>{restaurant.locations[0].menu.dedicatedFrom}</p>
        </div>    
      </div>
      </div>
    </div>

    
{/* MENU NAVIGATION STICKY */}
<div className="menu-nav-container">
      <div className="menu-nav-tabs">
      <div className="last-updated"><strong>Last Updated:</strong> </div>
        <div className="menu-tab-container">
          <div className={`menu-tab ${show ? "" : "active"}`}
          onClick={function() {
            setShow(currentShow => !currentShow)
          }}
          style={{backgroundColor: show? '#e2e2e2' : restaurant.primaryColor}}
          
          >Menu</div>

          <div className={`menu-tab ${show ? "active" : ""}`}
          onClick={() => setShow(currentShow => !currentShow)}
          style={{backgroundColor: !show? '#e2e2e2' : restaurant.primaryColor}}
          >Kitchen Procedures</div>
        </div>
        
      </div>
    </div>
    {/* SELECTED WINDOW */}
    <Container className="tab-section-window ">
        { show ? <KitchenProceduresWindow/> : <MenuWindow></MenuWindow> }
      </Container>
    </section>
  );
};

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

export default connect(mapState, mapDispatchToProps)(OrderMenu);
