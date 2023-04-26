import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchFrontendCategoryMenuitems } from "../../redux/reducers/frontend";
import menuitemFilter from "../../utils/menuitemFilter";
import MenuItemCard from "./MenuItemCard";

export var totalItems = 0;


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



  // my own stuff

  
  const safeCollection = filteredMenuitems.filter(menuitem => menuitem.type === "Safe");
  const unsafeCollection = filteredMenuitems.filter(menuitem => menuitem.type != "Safe");
  const totalCategoryItems = unsafeCollection.length + safeCollection.length;
  totalItems = totalItems + totalCategoryItems;
  console.log(totalItems)

  const determineSafeItems = (safeCollection) => {
    return safeCollection.map(({ type, menuitem }) => 
     ( type === "Safe" ?   
      (<div className="menu-card-wrapper">
        <MenuItemCard
          key={menuitem.id}
          type={type}
          menuitem={menuitem}
          primaryColor={primaryColor}
          selectedAllergies={selectedAllergies}
        />
      </div>)
     : null))
  }
 
  const filteredSafeItems = determineSafeItems(filteredMenuitems)

  const determineUnsafeItems = (unsafeCollection) => {
    
    return unsafeCollection.map(({ type, menuitem }) => 
    
     ( type != "Safe" ?   
      (<div className="menu-card-wrapper">
        
        <MenuItemCard
          key={menuitem.id}
          type={type}
          menuitem={menuitem}
          primaryColor={primaryColor}
          selectedAllergies={selectedAllergies}
        />
      </div>)
     : null))
  }

  const filteredUnsafeItems = determineUnsafeItems(filteredMenuitems)
  
  
  return (
    
    <section id={category.name} className="category-section" ref={categoryRef} >
       <h3>{category.name} ({totalCategoryItems})</h3>  
      {/* Container for No Mods and Mods Required */} 
      <div className="category-type-container">
            {safeCollection.length > 0 ? 
            <div className="category-no-mods-container" >
              <h3>No Modifications Necessary</h3>
                <div className="category-menu-item-container" >
                {filteredSafeItems.map((s) => (
                  <div className="menu-card-wrapper">{s}</div>
                ))}
                </div>
              </div>
              : null}
            

            {unsafeCollection.length > 0 ?
            <div className="category-mods-container ">
            <h3>Modifications Necessary</h3>
              <div className="category-menu-item-container" id="mods-container">
              {filteredUnsafeItems.map((s) => (
                <div className="menu-card-wrapper">{s}</div>
              ))}
              </div>
            </div> : null }
      
            </div>
              
      
    </section>
    
  );
  
};


// function hideEmptyCategories(categoryCount){
//   if (categoryCount === 0){
//     console.log("empty" + categoryCount)
//   } else {
//     console.log("full" + categoryCount)
//   }

// }




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
