import React, { useState } from "react";
import { connect } from "react-redux";
import MenuItemDescription from "./modals/MenuItemDescription.js";


const safeCheckmark = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 12.32" height="35px" width="25px" fill="white"><g><path d="m10.89,15.5c1.71-1.77,3.39-3.57,5.13-5.31,2.69-2.7,5.41-5.36,8.12-8.03.61-.6,1.18-1.32,1.91-1.71.64-.34,1.6-.59,2.22-.35.72.27,1.49.75,1.67,1.86.33,2.02-.84,3.21-2.05,4.42-2.05,2.04-4.13,4.04-6.19,6.07-2.73,2.68-5.46,5.36-8.18,8.05-.34.33-.62.73-.99,1-1.65,1.16-2.58,1.12-3.95-.26-2.58-2.61-5.13-5.26-7.68-7.91C0,12.38-.3,10.01.35,9.3c1.19-1.32,2.59-1.46,4.09-.1,2.2,1.99,4.26,4.15,6.44,6.31Z"/></g></svg>
)

const modExclamation = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 35" height="35px" width="25px" fill="white"
    style={{
      transform: "translateX(15px) translateY(10px)"
      }}>
      <g><g><path className="cls-1" d="m0,3c.11,5.8,1.04,11.66,1.25,17.52.07,2.31,4.32,2.24,4.52.24.73-5.15.91-10.36,1.33-15.55-.01,0-.03,0-.04,0C8.49.01,1.05-2.28,0,3Z"/><circle className="cls-1" cx="3.62" cy="25.58" r="2.33"/></g></g></svg>
)

//Green #189622 Red FF0000
const MenuItemCard = ({ menuitem, type, selectedAllergies, primaryColor }) => {
  const safeColor = "#618547";
  const modColor = "#EF8031";
  const [modalShow, setModalShow] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill={`${type === "Safe" ? safeColor : modColor}`} height="40px" width="40px" className="center-flex" >
              <circle cx="20" cy="20" r="20"/>
              {/* Safe Checkmark  */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style={{transform: "translateY(10px) translateX(5px)"}} fill={`${type === "Safe" ? "white" : "none"}`}><g><path d="m10.89,15.5c1.71-1.77,3.39-3.57,5.13-5.31,2.69-2.7,5.41-5.36,8.12-8.03.61-.6,1.18-1.32,1.91-1.71.64-.34,1.6-.59,2.22-.35.72.27,1.49.75,1.67,1.86.33,2.02-.84,3.21-2.05,4.42-2.05,2.04-4.13,4.04-6.19,6.07-2.73,2.68-5.46,5.36-8.18,8.05-.34.33-.62.73-.99,1-1.65,1.16-2.58,1.12-3.95-.26-2.58-2.61-5.13-5.26-7.68-7.91C0,12.38-.3,10.01.35,9.3c1.19-1.32,2.59-1.46,4.09-.1,2.2,1.99,4.26,4.15,6.44,6.31Z"/></g></svg>
              {/* Modification Exclamation mark */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style={{transform: "translateY(6px) translateX(16px)"}} fill={`${type === "Safe" ? "none" : "white"}`} ><g><g><path className="cls-1" d="m0,3c.11,5.8,1.04,11.66,1.25,17.52.07,2.31,4.32,2.24,4.52.24.73-5.15.91-10.36,1.33-15.55-.01,0-.03,0-.04,0C8.49.01,1.05-2.28,0,3Z"/><circle className="cls-1" cx="3.62" cy="25.58" r="2.33"/></g></g></svg>
            </svg>
        </div>
      <div className="menu-item-card-wrapper bottom-box-shadow" style={{
        border: `6px solid ${type === "Safe" ? safeColor : modColor}`,
      }}>
        
      
      <div className="menu-item-card-image-container" style={{backgroundImage: `url(${menuitem.image ? menuitem.image.url : "/img/generic-bg.jpg"})`}}></div>
          <div className="menu-item-card-text-container">
             <h4 className="menu-item-card-title">{menuitem.name.substring(0, 100)} {menuitem.name.length >= 100 && '...'}</h4>
             <p className="menu-item-card-description"> {menuitem.description.substring(0, 110)} {menuitem.description.length >= 110 && '...'}</p>
          </div>
          {type !== "Safe" ? <>
          <div className="full-width-center-flex mod-necessary-button" onClick={function() {!modalShow && setModalShow(true)}} >
            <div className="menu-item-card-button hover" style={{
            backgroundColor: `${modColor}`
          }}>
              <p  style={{fontWeight: "600", lineHeight: "14px", fontSize: "14px"}}>{type === "Safe" ? "No Modifications Required" : "Modification Required"}</p>
              <p style={{fontSize: "10px", lineHeight: "0px", paddingBottom: "8px", marginTop: "-8px"}}>Click here for details</p>
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


