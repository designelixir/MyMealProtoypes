import React, { useState, useRef, useEffect, rgba } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";


import "react-loading-skeleton/dist/skeleton.css";

const downloadButton = {borderRadius: "6px", color: "black", backgroundColor: "white", border: "none", padding: "10px 25px", cursor: "pointer", fontWeight: "600", boxShadow: "0px 2px 4px rgba(0,0,0,0.35"}
const bannerComponent = {width: "100%", background: "#2d9cdb", position: "fixed", bottom: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 3000}


const CallToActionBanner = () => {
    const [showPopUp, setShowPopUp] = React.useState(false)
    const togglePop = () => setShowPopUp(true)
    const hidePop = () => setShowPopUp(false)

    const CallToActionPopUp = () => (
        <div id="popUpWindow" style={{ width: "100vw", height: "100vh", backdropFilter: "blur(5px)", position: "fixed", top: 0, left: 0}}>
        <div className="popUpWindowWrapper" style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "25px"}}>
            <div style={{backgroundColor: "#2D9CDB", padding: "25px", textAlign: "center", color: "white", padding: "25px", borderRadius: "6px", border: "2px solid white", margin: "15px"}}>
                <Button onClick={hidePop} style={downloadButton}>X - Close</Button>        
                <h3 style={{paddingTop: "15px"}}>Are you located in Denver, Colorado?</h3>
                <p>MyMeal is currently only available for restaurants in the Denver Metro Area.</p>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                    <a href="https://play.google.com/store/apps/details?id=com.MyMeal.android" target="_blank"><img src="https://findmymeal.io/wp-content/uploads/2023/03/googleplay.png" style={{height: "45px", margin: "10px"}}/></a>
                    <a href="https://apps.apple.com/us/app/mymeal-find-safe-restaurants/id6444025752" target="_blank"><img src="https://findmymeal.io/wp-content/uploads/2023/03/appstore.png" style={{height: "45px", margin: "10px"}}/></a>
                    <button style={downloadButton}><a href="https://forms.gle/i5WxFC5Lj5Etshsu5" target="_blank" style={{textDecoration: "none", color: "black"}}>Request My City</a></button>
                </div>
            </div>

        </div>
    </div>    
    )

  return (
    <div className="bannerComponent" style={bannerComponent}>
        {/* BANNER */}
        
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}> 
            <div id="bannerButtonContainer" style={{ textAlign: "center", display: "inline-flex", justifyContent: "space-between", cursor: "pointer", alignItems: "center", width: "100%", padding: "10px"}} onClick={togglePop}>
                <p style={{color: "white", fontWeight: 600, fontSize: "18px",  margin: "10px"}}>Want more menus like this?</p>
                    
                    <div style={{display: "flex", alignItems: "center", textDecoration: "none", justifyContent: "center",  color: "white", textAlign: "center" , padding: "0px 10px", borderRadius: "5px", border: "2px solid white" }} onClick={togglePop}>
                        <p style={{marginTop: "12px"}}>Download the</p>
                       
                            <Image
                            className="banner-logo-small"
                            src={"/img/mymeal-lettermark-white.png"}
                            style={{maxHeight: "20px", margin: "0px 7px"}}
                            alt="MY MEAL"
                            />
                      
                        <p style={{marginTop: "14px"}}> App!</p>
                          </div>
                    
            </div>
                
            </div>
            {/* <div style={{minWidth: "400px", textAlign: "center"}}>
                <Button onClick={togglePop} style={downloadButton}>Download the MyMeal App</Button>        
            </div> */}
            { showPopUp ? <CallToActionPopUp />  : null}
        
        </div>

        
        
    
    
    
  );
};



console.log("loaded changes 3:37pm")

export default (CallToActionBanner);
