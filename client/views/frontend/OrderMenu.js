import React, { useState, useRef, useEffect, rgba } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";
import MenuWindow from "./MenuWindow";
import "react-loading-skeleton/dist/skeleton.css";
import { setSelectedAllergy } from "../../redux/reducers/frontend";
import WaitlistBanner from "./WaitlistBanner";
import KitchenProceduresWindow from "./KitchenProceduresWindow";
import CallToActionBanner from "./CallToActionBanner";
import FilterBar from "./FilterBar";
import Categories from "./Categories";
import Category from "./Category";
import GeneratedByBanner from "./GeneratedByBanner"
const OrderMenu = ({ restaurant, categories, selectedAllergies, setSelectedAllergies }) => {
  window.scrollTo(0, 0);
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
  const addressSearchUrl = "https://www.google.com/maps/search/" + restaurant.locations[0].address;

  


  return (
    <section id="orderMenuComponent">
      <div className="restaurant-message-banner bottom-box-shadow" style={{backgroundColor: restaurant.primaryColor}}>
        <p className="restaurant-message">{restaurant.locations[0].menu.dedicatedFrom}</p>
      </div>
    {/* MAIN HEADER */}
    <div className="blur-overlay">
            
      <div className="menu-header blur-overlay" style={{
          backgroundImage: `url(${
            restaurant.bg ? restaurant.bg.url : "/img/generic-bg.jpg"
          })`,
        }}>
      <div className="menu-header-contents">
        <div className="menu-header-logo-container">
          <div className="center-flex ">
        {/* <Image
            className="menu-back-button"
            onClick={() =>
              history.push(`${location.pathname.replace("/menu", "")}`)
            }
            src={"/img/back-arrow.png"}
          /> */}
          <Image
            className="menu-header-logo"
            src={
              restaurant.logo
                ? restaurant.logo.url
                : null 
                
            }
            onClick={() =>
              history.push(`${location.pathname.replace("/menu", "")}`)
            }
          />
          </div>
          
        </div>
        <div className="menu-header-title-container">
            <h1>{restaurant.name}</h1>
            <a style={{color: 'black', textDecoration: 'none', cursor: "pointer", textAlign: "center"}} href={addressSearchUrl} target='_blank'>
              <p style={{margin: "0px"}}>{restaurant.locations[0].streetOne} {restaurant.locations[0].streetTwo && ( <span>, {restaurant.locations[0].streetTwo}</span>) }</p>
              <p style={{margin: "0px", paddingBottom: "10px"}}>{restaurant.locations[0].city}, {restaurant.locations[0].state}, {restaurant.locations[0].zip}</p>
            </a>
            
        </div>
        <div className="menu-header-order-button-container center-flex">
        {restaurant.locations[0].menu.orderNow && (
          <button
            className="bottom-box-shadow styled-button"
            style={{
              backgroundColor: restaurant.primaryColor,
              fontSize: "12px"
            }}
            
          >
            Order Online
          </button>
          )}
        </div>
        
      </div>

      {/* The TAB for dedicated free from options */}
      {/* {restaurant.locations[0].menu.dedicatedFrom && (
        <div className="dedicated-free">
          <div className="dedicated-free-title center-flex">
            <p className="tab" style={{backgroundImage: "url(/img/tab.png)"}}>Dedicated-Free From:</p>
          </div>
          <div className="dedicated-allergen-card-container center-flex">
        <div className="dedicated-allergen-card">
          <p>{restaurant.locations[0].country}</p>
        </div>    
      </div>
        </div>
        
      )} */}
      
      </div>
    </div>

           
            

            
   
    
{/* MENU NAVIGATION STICKY */}
<div className="menu-nav-container" style={{}}>
      <div className="menu-nav-tabs">
      <div className="last-updated"><strong>Last Updated:</strong> {restaurant.locations[0].country} </div>
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
      <div style={{height: "100px"}}></div>
      <CallToActionBanner></CallToActionBanner>
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
