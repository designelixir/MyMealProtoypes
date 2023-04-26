import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Container,
  Form,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import menuitemData from "../../../utils/menuitemData";
import priceFormat from "../../../utils/priceFormat";

const MenuItemDescription = ({
  modalShow,
  setModalShow,
  menuitem,
  primaryColor,
  selectedAllergies,
  safeColor,
  modColor,
  
}) => {
  const data = menuitemData(menuitem, selectedAllergies);
  return (
    <>
      <Modal
        className="noscroll"
        show={modalShow}
        onHide={() => setModalShow(false)}>
          
        

        <div className="overlay-window" style={{height: "100vh"}}>
        <section className="menu-pop-up-contents">
          {/* Notify Restaurant of Allergens Message */}
          <div className="report-error-container bottom-box-shadow center-flex">
            <p className="report-error-message p2-text">Always notify the restaurant of your allergens!</p>
            <button className="utility-button hover" style={{fontStyle: "italic"}}>Suggest an Edit</button>
          </div>
          {/* Menu Description Card */}
          <div className="menu-item-pop-up-wrapper">
            <div className="menu-item-pop-up bottom-box-shadow" style={{border: `6px solid ${data.modifiable.length > 0 ? modColor : safeColor}`}} >
            {menuitem.image ? (
              <div className="menu-image" style={{backgroundImage: "url(/img/generic-bg.jpg)"}}> 
              <button className="hover menu-pop-up-close-button" onClick={function() {modalShow && setModalShow(false)}}>X</button>
                </div> ) 
                : 
                (
              <div className="no-menu-image"> 
                <button className="hover menu-pop-up-close-button" onClick={function() {modalShow && setModalShow(false)}}>X</button>
                </div>)}
             

          
            <div className="menu-item-info">
              <h4 className="menu-title"><strong>{menuitem.name}</strong>{menuitem.price && (
                <span className="menu-price"> - ${menuitem.price}</span>
              )}</h4>
              <p className="menu-description">{menuitem.description}</p>
              
            </div>
            
          

          <div className="modifications-container">
          {data.modifiable.length > 0 ? (
            <>
              <div className="modifications-container bottom-box-shadow">
                <div className="modifications-container-title center-flex">
                  <p>Modifications</p>
                </div>
                <div className="instructions">
                  {data.modifiable.map(({ allergy, description }, idx) => (
                      <p
                      key={`${allergy}-${idx}`}
                    >
                      <span className="bolded-allergy">{`${allergy}`}: &nbsp;</span>
                       {`${description}`}
                      </p>
                    ))}
                </div>
              </div>
            </>
          ) : (<div className="no-mods-container bottom-box-shadow">
            <div className="center-flex no-mods-container-title">
                  <p>No Mods Necessary</p>
                </div>
                <div className="instructions">
                  <p style={{textAlign: "center"}}>Make sure to always notify the restaurant of your allergens!</p>
                  </div>

          </div>)}
          {data.crossContact.length > 0 ? (
            <>
              <div className="cross-contact-container bottom-box-shadow">
                <div className="center-flex cross-contact-container-title">
                  <p>Cross Contact Warning</p>
                </div>
                <div className="instructions">
                  {data.crossContact.map(({ allergy, description }, idx) => (
                    <p
                      key={`${allergy}-${idx}`}
                    >
                      <span className="bolded-allergy">{`${allergy}`}: &nbsp;</span>
                       {`${description}`}
                      </p>
                  ))}
                </div>
              </div>
            </>
          ) : (null)}
        

          {menuitem.ingredients && (
            <div className="menu-ingredients">
              <p className="p2-text" style={{fontWeight: 600}}>Ingredients</p>
              <p style={{opacity: "0.85"}}>{menuitem.ingredients}</p>
              <br></br>
            </div>
              
          
          )}

          {menuitem.nutritionFacts && (
            <div className="menu-nutrition">
              <p className="p2-text" style={{fontWeight: 600}}>Nutrition Facts</p>
              <p style={{opacity: "0.85"}}>{menuitem.nutritionFacts}</p>
            </div>
          )}
          </div>
      </div>
      </div>

        </section>
        </div>
      </Modal>
    </>
  );
};

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(MenuItemDescription);
