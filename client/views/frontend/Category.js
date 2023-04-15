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
    <section id={category.name} className="category-section" ref={categoryRef} >
      <h3>{category.name}</h3>  
      {/* Container for No Mods and Mods Required */} 
      <div className="category-type-container">   

            
          
  
            <div className="category-no-mods-container" >
              
              <h3>No Modifications Necessary</h3>
                <div className="category-menu-item-container" >
                {filteredMenuitems.map(({ type, menuitem }) => (
                  <div className="menu-card-wrapper">
                    {type === "Safe" ? <>
                    <MenuItemCard
                      key={menuitem.id}
                      type={type}
                      menuitem={menuitem}
                      primaryColor={primaryColor}
                      selectedAllergies={selectedAllergies}
                    />
                    </> : null}
                    
                  </div>
                ))}
                
                </div>
              </div>

              <div className="category-mods-container ">
              <h3>Modifications Necessary</h3>
                <div className="category-menu-item-container" >
                
                {filteredMenuitems.map(({ type, menuitem }) => (
                  <div className="menu-card-wrapper">
                    
                    {type !== "Safe" ? <>
                    <MenuItemCard
                      key={menuitem.id}
                      type={type}
                      menuitem={menuitem}
                      primaryColor={primaryColor}
                      selectedAllergies={selectedAllergies}
                    />
                    </> : null}
                  </div>
                  
                ))}
                </div>
              </div>
      </div>
    </section>
  );
};

function hideEmptyCategories(categoryCount){
  if (categoryCount === 0){
    console.log("empty" + categoryCount)
  } else {
    console.log("full" + categoryCount)
  }

}



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
