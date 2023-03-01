import React, { useState, useRef, useEffect, rgba } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import FilterButton from "./FilterButton";
import RestrictedAllergiesGrid from "./RestrictedAllergiesGrid";

const CheckmarkSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={props.fill}
    className="checkmark"
    width="70.8"
    height="69.235"
    viewBox="0 0 70.8 69.235"
  >
    <g>
      <path d="m0,33.723c1.577-1.611,3.172-3.207,4.723-4.843.578-.609.915-.75,1.736-.149,4.099,3.005,8.293,5.883,12.45,8.81,1.566,1.102,3.124,2.215,4.808,3.41,2.417-2.293,4.905-4.508,7.223-6.888,3.234-3.319,6.344-6.758,9.503-10.149,3.078-3.303,6.139-6.623,9.233-9.912,1.96-2.083,3.887-4.208,5.974-6.161,2.978-2.786,5.78-5.799,9.389-7.842.32,0,.64,0,.96,0,1.6,1.515,3.2,3.03,4.8,4.544v.239c-1.48,1.676-2.997,3.322-4.431,5.036-1.611,1.925-3.146,3.913-4.717,5.87-2.26,2.815-4.577,5.587-6.771,8.452-3.354,4.381-6.705,8.769-9.908,13.259-3.538,4.96-6.996,9.983-10.328,15.083-3.521,5.39-6.851,10.904-10.269,16.361-.061.097-.173.163-.422.389C15.955,57.537,7.978,45.869,0,34.202c0-.159,0-.319,0-.478Z" />
    </g>
  </svg>
);

const FilterBar = ({ restaurant, categories, selectedAllergies, totalMenuItems, setSelectedAllergies }) => {
  const location = useLocation();
  const history = useHistory();
  
  if (!restaurant.id) {
    return <Redirect to={`${location.pathname.replace("/menu", "")}`} />;
  }

  

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [modalShow, setModalShow] = useState(false);
  const [inactiveShow, setInactiveShow] = useState(false);

  const categoryRefs = categories.map(({ name }) => useRef(name));

  const [showWindow, setShowWindow] = React.useState(false)
    const toggleWindow = () => setShowWindow(true)
    const hidePop = () => setShowWindow(false)

    const PopUpFilterWindow = () => (
        <div className="overlay-window full-width-center-flex noscroll">
        
        
            <div className="modify-filters-window-container">
              <div className="filter-window-header space-between-flex">
                <h3>Modify the Filters for this Menu</h3>
                <button className="styled-button" onClick={hidePop} style={{backgroundColor: restaurant.primaryColor}}>X</button>
              </div>
              <div className="filter-window-filters">
              <section className="restrictedAllergensGridComponent">


      {/* Select the allergen cards */}
      <div className="select-allergens-wrapper">
        <div className="select-allergens-grid center-flex">
          {restaurant.locations[0].menu.allergies.map((allergy) => (
            
            <div key={allergy.id} className="allergy-card-wrapper">
              <div className="checkbox-container" style={{display: `${selectedAllergies[allergy.id].selected} ? "block" : "none"`}}>
                <div
                  className="checkbox" 
                  id={"allergen-check-" + `${allergy.name}`}
                >
                  <CheckmarkSVG fill={restaurant.primaryColor}></CheckmarkSVG>
                </div>
              </div>
              <div className="dedicated-banner-container">
                <div className="dedicated-banner-wrapper" style={{ backgroundImage: "url(/img/banner2.png)", display: "none"}} id={"dedications-"+`${allergy.name}`}>
                    <p>DEDICATED FREE</p>
                </div>
             
              </div>

              <div
                className="allergen-card center-flex bottom-box-shadow"
                id={"allergen-card-" + `${allergy.name}`}
                onClick={() => {
                  setSelectedAllergies({
                    ...selectedAllergies,
                    [allergy.id]: {
                      ...selectedAllergies[allergy.id],
                      selected: !selectedAllergies[allergy.id].selected,
                    },
                  });
                  selectCard(
                    selectedAllergies[allergy.id].name,
                    selectedAllergies[allergy.id].selected
                  );
                }}
              >
                <div className="allergen-card-contents">
                  <div
                    className="allergen-image-container"
                    style={{
                      backgroundImage: `url('/icons/allergens/${allergy.name}.png')`,
                    }}
                  ></div>
                  {allergy.name}
                </div>
              </div>
              {selectedAllergies[allergy.id].selected && (
                <div className="cross-contamination-container">
                  <p className="cross-contamination-text">
                    Sensitive to cross contact?
                  </p>
                  <div className="cross-contamination-button-container">
                    <button
                      onClick={() =>
                        setSelectedAllergies({
                          ...selectedAllergies,
                          [allergy.id]: {
                            ...selectedAllergies[allergy.id],
                            cross: true,
                          },
                        })
                      }
                      className="cross-contact-button"
                      style={{
                        color: !selectedAllergies[allergy.id].cross
                          ? "black"
                          : "white",
                        backgroundColor: !selectedAllergies[allergy.id].cross
                          ? "white"
                          : restaurant.primaryColor,
                        border: !selectedAllergies[allergy.id].cross
                          ? "1px solid black"
                          : "none",
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() =>
                        setSelectedAllergies({
                          ...selectedAllergies,
                          [allergy.id]: {
                            ...selectedAllergies[allergy.id],
                            cross: false,
                          },
                        })
                      }
                      className="cross-contact-button ms-3"
                      style={{
                        color: selectedAllergies[allergy.id].cross
                          ? "black"
                          : "white",
                        backgroundColor: selectedAllergies[allergy.id].cross
                          ? "white"
                          : restaurant.primaryColor,
                        border: selectedAllergies[allergy.id].cross
                          ? "1px solid black"
                          : "none",
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
              </div>
                <div style={{padding: "15px"}} className="full-width-center-flex">
                  <button className="styled-button" onClick={hidePop} style={{backgroundColor: restaurant.primaryColor}}>Update Menu</button>
                </div>
            </div>
        
    </div>    
    )

  return (
    <div>
      <div className="filtered-by-container">
        <div className="filtered-allergens-row center-flex-start">
          <p>Showing {totalMenuItems} Menu Items filtered by</p>
          {Object.values(selectedAllergies)
            .filter(({ selected }) => selected)
            .map(({ name }) => (
              <p
                key={name}
                className="filtered-allergen center-flex"
                style={{
                  background: restaurant.primaryColor,
                  color: "white",
                }}
              >
                {name}
              </p>
            ))}
          <p>&nbsp; •{" "}<strong><i>15 items removed</i></strong></p>
        </div>

        <div className="filter-icon">
        <svg onClick={toggleWindow} style={{ width: 20, height: 22, cursor: "pointer" }} width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15C10 14.31 10.5612 13.75 11.25 13.75C11.9388 13.75 12.5 14.31 12.5 15C12.5 15.69 11.9388 16.25 11.25 16.25C10.5612 16.25 10 15.69 10 15ZM7.5 15C7.5 17.0712 9.17875 18.75 11.25 18.75C13.3212 18.75 15 17.0712 15 15C15 12.9288 13.3212 11.25 11.25 11.25C9.17875 11.25 7.5 12.9288 7.5 15ZM12.5 26.25C12.5 28.3212 14.1788 30 16.25 30C18.3212 30 20 28.3212 20 26.25C20 24.1788 18.3212 22.5 16.25 22.5C14.1788 22.5 12.5 24.1788 12.5 26.25ZM12.5 3.75C12.5 5.82125 14.1788 7.5 16.25 7.5C18.3212 7.5 20 5.82125 20 3.75C20 1.67875 18.3212 0 16.25 0C14.1788 0 12.5 1.67875 12.5 3.75ZM5 15C5 14.5712 5.04375 14.1538 5.12625 13.75H1.25C0.56 13.75 0 14.3088 0 15C0 15.6912 0.56 16.25 1.25 16.25H5.12625C5.04375 15.8462 5 15.4288 5 15ZM10 3.75C10 3.32125 10.0437 2.90375 10.1262 2.5H1.25C0.56 2.5 0 3.05875 0 3.75C0 4.44125 0.56 5 1.25 5H10.1262C10.0437 4.59625 10 4.17875 10 3.75ZM22.5 3.75C22.5 4.17875 22.4563 4.59625 22.3738 5H26.25C26.94 5 27.5 4.44125 27.5 3.75C27.5 3.05875 26.94 2.5 26.25 2.5H22.3738C22.4563 2.90375 22.5 3.32125 22.5 3.75ZM10 26.25C10 25.8212 10.0437 25.4037 10.1262 25H1.25C0.56 25 0 25.5588 0 26.25C0 26.9412 0.56 27.5 1.25 27.5H10.1262C10.0437 27.0963 10 26.6788 10 26.25ZM17.5 15C17.5 15.4288 17.4563 15.8462 17.3738 16.25H26.25C26.94 16.25 27.5 15.6912 27.5 15C27.5 14.3088 26.94 13.75 26.25 13.75H17.3738C17.4563 14.1538 17.5 14.5712 17.5 15ZM22.5 26.25C22.5 26.6788 22.4563 27.0963 22.3738 27.5H26.25C26.94 27.5 27.5 26.9412 27.5 26.25C27.5 25.5588 26.94 25 26.25 25H22.3738C22.4563 25.4037 22.5 25.8212 22.5 26.25Z" fill="black"/></svg>

          {/* <AllergyFilters
            {...{ modalShow, setModalShow }}
            restaurantAllergies={restaurant.locations[0].menu.allergies}
            primaryColor={restaurant.primaryColor}
          /> */}
        </div>
        { showWindow ? <PopUpFilterWindow />  : null}
      </div>
    </div>
  );
};

function selectCard(cardName, selected) {
  var selectedCard = "allergen-card-" + cardName;
  var selectedCardCheck = "allergen-check-" + cardName;
  var modifyCard = document.getElementById(selectedCard);
  var modifyCardCheck = document.getElementById(selectedCardCheck);
  if (selected) {
    modifyCard.classList.remove("selected-allergen");
    modifyCardCheck.style.display = "none";
  } else {
    modifyCard.classList.add("selected-allergen");
    modifyCardCheck.style.display = "block";
  }
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

export default connect(mapState, mapDispatchToProps)(FilterBar);
