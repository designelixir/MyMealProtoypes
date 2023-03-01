import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchFrontendCategoryMenuitems } from "../../redux/reducers/frontend";
import menuitemFilter from "../../utils/menuitemFilter";
import MenuItemCard from "./MenuItemCard";

export const Category = ({
  category,
  getMenuitems,
  selectedAllergies,
  primaryColor,
  categoryRef,
}) => {
  const [filteredMenuitems, setFilteredMenuitems] = useState([]);
  const [unfilteredMenuitems, setUnfilteredMenuitems] = useState([]);

  
  useEffect(() => {
    getMenuitems({
      categoryId: category.id,
      cb(menuitems) {
        setUnfilteredMenuitems(menuitems);
        setFilteredMenuitems(menuitemFilter(menuitems, selectedAllergies));
      },
    });
  }, []);
  useEffect(() => {
    if (!unfilteredMenuitems.length) return;
    setFilteredMenuitems(
      menuitemFilter(unfilteredMenuitems, selectedAllergies)
    );
  }, [selectedAllergies]);
  return (
    <div key={category.name}>
      {
        <div>
          <div className="category-title-container">
            <h3 id={category.name} ref={categoryRef}>
              {category.name} - {filteredMenuitems.length}
            </h3>
          </div>
          
          <div className="category-menu-item-container">
            {filteredMenuitems.length > 0 ? (
              filteredMenuitems.map(({ type, menuitem }) => (
                <div className="menu-card-wrapper">
                  {type === "Safe" ? <>
                  <p>No Modifications Necessary</p>
                  </> : <></>}
                  <MenuItemCard
                    key={menuitem.id}
                    type={type}
                    menuitem={menuitem}
                    primaryColor={primaryColor}
                    selectedAllergies={selectedAllergies}
                  />
                </div>
                
              ))
            ) : (
              <p style={{ width: "100%", textAlign: "center" }}>No Items</p>
            )}
          </div>
          
        </div>
        
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedAllergies } = state.frontend;
  return {
    selectedAllergies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenuitems(data) {
      dispatch(fetchFrontendCategoryMenuitems(data));
      
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
