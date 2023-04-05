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
import mixpanel from 'mixpanel-browser';
import FilterBar from "./FilterBar";
  

const MenuWindow = ({ restaurant, categories, selectedAllergies }) => {

  const location = useLocation();
  const history = useHistory();

  if (!restaurant.id) {
    return <Redirect to={`${location.pathname.replace("/menu", "")}`} />;
  }


  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [modalShow, setModalShow] = useState(false);
  const [inactiveShow, setInactiveShow] = useState(false);

  const categoryRefs = categories.map(({ name }) => useRef(name));
  const catNav = useRef(null);

  const [showDropShadow, setShowDropShadow] = useState(false);

  const setDropShadow = () => {
    const el = document.documentElement;

    if (Math.ceil(el.scrollTop) === catNav.current.offsetTop) {
      setShowDropShadow(true);
    } else {
      setShowDropShadow(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", setDropShadow);
    return () => {
      window.removeEventListener("scroll", setDropShadow);
    };
  }, []);

  return (
    <div className="custom-sticky-top">
      <section className="menu-section">
       
      <ScrollSpyTabs
      
        primaryColor={restaurant.primaryColor}
        catNav={catNav}
        showDropShadow={showDropShadow}
        tabsInScroll={categories.map((category, idx) => ({
          text: category.name,
          component: (
            <Category
              category={category}
              primaryColor={restaurant.primaryColor}
              categoryRef={categoryRefs[idx]}
            />
          ),
        }))}
      />
      
      </section>
    </div>
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
