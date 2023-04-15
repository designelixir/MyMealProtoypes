import React, { useState, useRef, useEffect, rgba } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import FilterButton from "./FilterButton";
import RestrictedAllergiesGrid from "./RestrictedAllergiesGrid";
import Filter from "./iconcomponents/Filter";
import AllergyFilters from "./modals/AllergyFilters";

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

const FilterBar = ({ restaurant, categories, selectedAllergies, setSelectedAllergies }) => {
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

   
  return (
    <div>
      <div className="filtered-by-container">
        <div className="filtered-allergens-row center-flex-start">
           <p>Showing  Menu Items </p> {selectedAllergies && <p> &nbsp; filtered by &nbsp;</p>}
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
        <Filter setModalShow={setModalShow} />
              <AllergyFilters
                {...{ modalShow, setModalShow }}
                restaurantAllergies={restaurant.locations[0].menu.allergies}
                primaryColor={restaurant.primaryColor}
              />
        </div>
        
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
