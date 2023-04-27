import React, { useState } from "react";
import { connect } from "react-redux";
import MenuItemDescription from "./modals/MenuItemDescription.js";


const MenuItemCard = ({ menuitem, type, selectedAllergies, primaryColor }) => {
  const safeColor = "#618547";
  const modColor = "#EF8031";
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <div className="menu-item-card-container">
          {menuitem.allergytypes
            .filter(
              (allergytype) =>
                allergytype.allergyId in selectedAllergies &&
                selectedAllergies[allergytype.allergyId].selected
            )
            .map((allergytype) => {
              const isSafe = allergytype.type === "Safe";
              const isMod = allergytype.type === "Modifiable";
              const isCross = allergytype.cross;
              const isCrossMod = allergytype.crossMod;
            })}
              
          
          <div className="safe-check-container">
            <div className="check-circle center-flex" style={{backgroundColor: `${type === "Safe" ? safeColor : modColor}`}}>
              {type === "Safe" ? <img className="check-type" src="/icons/safe-icon.png" style={{height: "20px"}}></img> : <img className="check-type" src="/icons/mod-icon.png"></img>}
              

            </div>
            
        </div>
      <div className="menu-item-card-wrapper bottom-box-shadow" onClick={function() {!modalShow && setModalShow(true)}} style={{
        border: `6px solid ${type === "Safe" ? safeColor : modColor}`,
      }}>
        
      {menuitem.image ? 
      <div className="menu-item-card-image-container" style={{backgroundImage: `url(${menuitem.image.url})`}}></div> : null}
          <div className="menu-item-card-text-container">
             <h4 className="menu-item-card-title">{menuitem.name.substring(0, 100)} {menuitem.name.length >= 100 && '...'}</h4>
             <p className="menu-item-card-description"> {menuitem.description.substring(0, 110)} {menuitem.description.length >= 110 && '...'}</p>
          </div>
          {type !== "Safe" ? <>
          <div className="full-width-center-flex mod-necessary-button" onClick={function() {!modalShow && setModalShow(true)}} >
            <div className="menu-item-card-button hover" style={{
            backgroundColor: `${modColor}`
          }}>
              <p  style={{fontWeight: "600", fontSize: "14px", margin: "0px"}}>{type === "Safe" ? "No Modifications Required" : "Modification Required"}</p>
              <p style={{fontSize: "12px", fontWeight: 600, margin: "0px"}}>Click here for details</p>
            </div>
            
          </div>
          </> : null}
          

          <MenuItemDescription
            {...{
              modalShow,
              setModalShow,
              menuitem,
              primaryColor,
              selectedAllergies,
              safeColor,
              modColor,
              
            }}
          />
        </div>
      
    </div>
  );
};



const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemCard);


