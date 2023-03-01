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
        onHide={() => setModalShow(false)}
        // fullscreen
        
      >
        <div className="report-error-container bottom-box-shadow center-flex">
          <p style={{color: "white", fontWeight: "600", fontSize: "18px"}}>Always notify the restaurant of your allergens! &nbsp; &nbsp;</p>
          <button className="utility-button hover" style={{fontStyle: "italic"}}>Suggest an Edit</button>
        </div>

        <div className="overlay-window full-width-center-flex" style={{height: "100%"}}>
          <div className="menu-item-pop-up-container bottom-box-shadow">
        
        {menuitem.image ? (
          
          <div className="menu-item-image-wrapper full-width-center-flex">
          <img
            className="menu-item-image"
            style={{
              backgroundImage: "url(/img/generic-bg.jpg)", 
              border: `4px solid ${modColor}` 
              // need to fix color
            }}
          />
        </div>
          ) : (
            <div></div>

          )} 
  


          <div className="menu-item-popup-contents">
            <div className="menu-item-popup-header">
            <div style={{marginBottom: "25px"}}>
              <h3 style={{lineHeight: "22px"}}>{menuitem.name}</h3>
              <p >{menuitem.description}</p>
            </div>
            
              <div className="hover" style={{fontWeight: "600"}} onClick={function() {modalShow && setModalShow(false)}}>X</div>
            </div>
          {data.modifiable.length === 0 && (
            <>
              <div className="modifications-container bottom-box-shadow">
                <div className="modifications-container-title center-flex">
                  <p>Modifications</p>
                </div>
                <div className="instructions">
                  {data.modifiable.map(({ allergy, description }, idx) => (
                      <p
                        key={`${allergy}-${idx}`}
                      >{`${allergy}: ${description}`}</p>
                    ))}
                </div>
              </div>
            </>
          )}
          {data.modifiable.length === 0 && (
            <>
              <div className="cross-contact-container bottom-box-shadow">
                <div className="center-flex cross-contact-container-title">
                  <p>Cross Contact Warning</p>
                </div>
                <div className="instructions">
                  {data.crossContact.map(({ allergy, description }, idx) => (
                    <p
                      key={`${allergy}-${idx}`}
                    >{`${allergy}: ${description}`}</p>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {menuitem.ingredients && (
            <>
              <h4 style={{ fontSize: "1rem" }}>Ingredients</h4>
              <p>{menuitem.ingredients}</p>
            </>
          )}
          {menuitem.nutritionFacts && (
            <>
              <h4 style={{ fontSize: "1rem" }}>Nutrition Facts</h4>
              <p>{menuitem.nutritionFacts}</p>
            </>
          )}
          </div>
      </div>
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
