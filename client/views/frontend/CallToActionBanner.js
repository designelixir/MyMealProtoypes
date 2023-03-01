import React, { useState, useRef, useEffect, rgba } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";

const downloadButton = {borderRadius: "6px", color: "black", backgroundColor: "white", border: "none", padding: "10px 25px", cursor: "pointer", fontWeight: "600", boxShadow: "0px 2px 4px rgba(0,0,0,0.35"}
const bannerComponent = {width: "100vw", background: "#2d9cdb", position: "fixed", padding: "10px", bottom: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 3000}


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
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <button style={downloadButton}><a href="https://previewer.adalo.com/0dca8933-3d50-45a8-9f27-8048ac8dfbf4" target="_blank" style={{textDecoration: "none", color: "black"}}>Download App</a></button>
                    <span>&nbsp; &nbsp;</span>
                    <button style={downloadButton}><a href="https://forms.gle/i5WxFC5Lj5Etshsu5" target="_blank" style={{textDecoration: "none", color: "black"}}>Request My City</a></button>
                </div>
            </div>

        </div>
    </div>    
    )

  return (
    <div className="banner-component" style={bannerComponent}>
        {/* BANNER */}
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}> 
            <div style={{width: "calc(100% - 400px)", minWidth: "400px", margin: "0px 0px 10px 25px"}}>
                <p style={{color: "white", fontWeight: 600, fontSize: "18px", lineHeight: "0px"}}>Want more menus like this?</p>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", height: "20px", lineHeight: "14px", color: "white", textAlign: "center" }}>
                        <p>Download the <a href="https://findmymeal.io" target="_blank">
                            <Image
                            className="banner-logo-small"
                            src={"/img/mymeal-lettermark-white.png"}
                            style={{height: "20px", transform: "translateY(5px)"}}
                            alt="MY MEAL"
                            />
                        </a> App!</p>
                    </div>
            </div>
                
            </div>
            <div style={{minWidth: "400px", textAlign: "center"}}>
                <button onClick={togglePop} style={downloadButton} className="styled-button">Download the MyMeal App</button>        
            </div>
            
        </div>

        { showPopUp ? <CallToActionPopUp />  : null}
        
        
    </div>
    
    
  );
};



console.log("loaded changes 3:37pm")

export default (CallToActionBanner);