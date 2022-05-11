import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useIdleTimer } from "react-idle-timer";
import Scrollspy from "react-scrollspy";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";
import CrossContact from "./modals/CrossContact";
import MenuItems from "./MenuItems";
import Filter from "./iconcomponents/Filter";
import AllergyFilters from "./modals/AllergyFilters";
import InactiveWarning from "./modals/InactiveWarning";
import { Categories } from "./Categories";
import { capitalize } from "../../utils/common";

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
  // const categories = restaurant.locations[0].menu.categories;
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [modalShow, setModalShow] = useState(false);
  const [inactiveShow, setInactiveShow] = useState(false);
  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    const scrollDiv = document.getElementById(`${category.name}`).offsetTop;
    window.scrollTo({ top: scrollDiv - 50, behavior: "smooth" });
  };

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
  const setScrollableActiveCategory = () => {
    categoryRefs.forEach((ref, idx) => {
      const diffFromTop = ref.current.getBoundingClientRect().top;
      if (diffFromTop <= 50 && activeCategory.name !== ref.current.id) {
        setActiveCategory(categories[idx]);
      }
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", setDropShadow);
    window.addEventListener("scroll", setScrollableActiveCategory);
    return () => {
      window.removeEventListener("scroll", setDropShadow);
      window.removeEventListener("scroll", setScrollableActiveCategory);
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
          <Row className="d-flex pt-3 filtered-by align-items-center justify-content-between">
            <Col className="d-flex align-items-center flex-wrap">
              <p>Filtered By:</p>
              <Row>
                {Object.values(selectedAllergies)
                  .filter(({ selected }) => selected)
                  .map(({ name }) => (
                    <p
                      key={name}
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
          <Row
            className="d-flex category-nav noscroll custom-sticky-top mt-1"
            id="category-nav"
            ref={catNav}
            style={{
              borderBottom: showDropShadow && "2px solid lightgray",
              // boxShadow: showDropShadow && "0 2px 4px 0 rgb(0 0 0 / 12%)",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: activeCategory.id === category.id ? "black" : "none",
                  backgroundColor:
                    activeCategory.id === category.id
                      ? restaurant.primaryColor
                      : "white",
                  color: activeCategory.id === category.id ? "white" : "black",
                }}
                onClick={() => handleSelectCategory(category)}
              >
                <p>{category.name}</p>
              </div>
            ))}
          </Row>
          <Scrollspy
            items={categories.map(({ name }) => name)}
            currentClassName="is-current"
            onUpdate={(e) => {
              // console.log("Spy", e, e.getBoundingClientRect().top);
            }}
            offset={100}
          >
            <Categories
              categoryRefs={categoryRefs}
              categories={categories}
              primaryColor={restaurant.primaryColor}
            />
          </Scrollspy>
        </Col>
        <Col xs={1}></Col>
      </Row>
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

// <Container className="mt-5">
//       <InactiveWarning
//         {...{ inactiveShow, setInactiveShow, timer }}
//         primaryColor={restaurant.primaryColor}
//       />

//       <div className="d-flex">
//         <Image
//           className="menu-back-button"
//           onClick={() =>
//             history.push(`${location.pathname.replace("/menu", "")}`)
//           }
//           src={"/img/back-arrow.png"}
//         />
//         <Container style={{ marginRight: "2rem" }}>
//           <h1 className="menu-title">{restaurant.name}</h1>
//           <h2 className="menu-sub-title">{restaurant.locations[0].address}</h2>
//           {restaurant.locations[0].menu.orderNow && (
//             <Row style={{ paddingLeft: "0.82rem", width: "100%" }}>
//               <Button
//                 className="rounded-button"
//                 style={{
//                   backgroundColor: restaurant.primaryColor,
//                   width: "fit-content",
//                 }}
//                 onClick={() =>
//                   window.open(restaurant.locations[0].menu.orderNow, "_blank")
//                 }
//               >
//                 Order Now
//               </Button>
//             </Row>
//           )}
//           <Row style={{ paddingLeft: "0.82rem", width: "100%" }}>
//             <p className="dedicated-from">
//               {restaurant.locations[0].menu.dedicatedFrom}
//             </p>
//           </Row>
//           <Row style={{ paddingLeft: "0.82rem", width: "100%" }}>
//             <CrossContact
//               CCP={restaurant.locations[0].crossContactProcedure}
//               primaryColor={restaurant.primaryColor}
//             />
//           </Row>
//           <Row
//             className="d-flex pt-3 filtered-by align-items-center justify-content-between"
//             style={{ paddingLeft: "0.82rem", width: "100%" }}
//           >
//             <Col className="d-flex align-items-center flex-wrap">
//               <p style={{ paddingLeft: "0.5rem", paddingRight: 0 }}>
//                 Filtered By:
//               </p>
//               <Row>
//                 {Object.values(selectedAllergies)
//                   .filter(({ selected }) => selected)
//                   .map(({ name }) => (
//                     <p
//                       key={name}
//                       style={{
//                         borderRadius: "2rem",
//                         background: safeColor,
//                         color: "white",
//                         padding: "0.5rem 1rem",
//                         fontStyle: "italic",
//                         fontSize: 10,
//                       }}
//                     >
//                       {(() => {
//                         const [first, ...rest] = name;
//                         const capitalAllergy =
//                           first.toUpperCase() + rest.join("");
//                         return capitalAllergy;
//                       })()}
//                     </p>
//                   ))}
//               </Row>
//             </Col>
//             <Col className="col-auto">
//               <Filter setModalShow={setModalShow} />
//               <AllergyFilters
//                 {...{ modalShow, setModalShow }}
//                 restaurantAllergies={restaurant.locations[0].menu.allergies}
//                 primaryColor={restaurant.primaryColor}
//               />
//             </Col>
//           </Row>
//           <Row
//             className="d-flex category-nav noscroll custom-sticky-top mt-1"
//             style={{
//               background: "white",
//               paddingLeft: "0.82rem",
//               width: "100%",
//             }}
//           >
//             {categories.map((category) => (
//               <div
//                 key={category.id}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   border: activeCategory.id === category.id ? "black" : "none",
//                   backgroundColor:
//                     activeCategory.id === category.id
//                       ? restaurant.primaryColor
//                       : "white",
//                   color: activeCategory.id === category.id ? "white" : "black",
//                 }}
//                 onClick={() => handleSelectCategory(category)}
//               >
//                 <p>{category.name}</p>
//               </div>
//             ))}
//           </Row>
//           {/* <MenuItems
//             categories={categories}
//             primaryColor={restaurant.primaryColor}
//           /> */}
//           <Categories
//             categories={categories}
//             primaryColor={restaurant.primaryColor}
//           />
//         </Container>
//       </div>
//     </Container>
