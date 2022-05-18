import React, { useState, useRef, useEffect } from "react";
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

const OrderMenu = ({ restaurant, categories, selectedAllergies }) => {
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

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 60000,
    onIdle: handleOnIdle,
    debounce: 500,
  });
  const safeColor = "#007B2A";

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
    <Container className="mt-5" style={{ minWidth: 390 }}>
      <InactiveWarning
        {...{ inactiveShow, setInactiveShow, timer }}
        primaryColor={restaurant.primaryColor}
      />
      <Row>
        <Col xs={1} className="d-flex justify-content-start">
          <Image
            className="menu-back-button"
            onClick={() =>
              history.push(`${location.pathname.replace("/menu", "")}`)
            }
            src={"/img/back-arrow.png"}
          />
        </Col>
        <Col xs={10}>
          <h1 className="menu-title">{restaurant.name}</h1>
          <h2 className="menu-sub-title">{restaurant.locations[0].address}</h2>
          {restaurant.locations[0].menu.orderNow && (
            <Button
              className="rounded-button"
              style={{
                backgroundColor: restaurant.primaryColor,
                width: "fit-content",
              }}
              onClick={() =>
                window.open(restaurant.locations[0].menu.orderNow, "_blank")
              }
            >
              Order Now
            </Button>
          )}
          {restaurant.locations[0].menu.dedicatedFrom && (
            <p className="dedicated-from">
              {restaurant.locations[0].menu.dedicatedFrom}
            </p>
          )}
          <CrossContact
            CCP={restaurant.locations[0].crossContactProcedure}
            primaryColor={restaurant.primaryColor}
          />
          <Row className="d-flex pt-3 pb-2 filtered-by align-items-center justify-content-between">
            <Col className="d-flex align-items-center flex-wrap">
              <p className="mb-2">Filtered By:</p>
              <Row>
                {Object.values(selectedAllergies)
                  .filter(({ selected }) => selected)
                  .map(({ name }) => (
                    <p
                      key={name}
                      className="mb-2"
                      style={{
                        borderRadius: "2rem",
                        background: safeColor,
                        color: "white",
                        padding: "0.5rem 1rem",
                        fontStyle: "italic",
                        fontSize: 10,
                      }}
                    >
                      {capitalize(name)}
                    </p>
                  ))}
              </Row>
            </Col>
            <Col className="col-auto">
              <Filter setModalShow={setModalShow} />
              <AllergyFilters
                {...{ modalShow, setModalShow }}
                restaurantAllergies={restaurant.locations[0].menu.allergies}
                primaryColor={restaurant.primaryColor}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={1} />
      </Row>
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
    </Container>
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

export default connect(mapState, mapDispatchToProps)(OrderMenu);
