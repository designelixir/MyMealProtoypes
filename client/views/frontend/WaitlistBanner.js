import React, { useState, useRef, useEffect, rgba } from "react";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";

const WaitlistBanner = () => {
  return (
    <div id="banner-container" className="top-box-shadow center-flex">
        <div className="banner-wrapper center-flex">
            <div className="banner-text-container">
                <p className="banner-container-title">Want more menus like this one?</p>
                <div className="center-flex banner-container-subtitle">
                    <p>Download the</p>
                    <a href="https://findmymeal.io" target="_blank">
                        <Image
                        className="banner-logo-small"
                        src={
                            "/img/mymeal-lettermark-white.png"
                        }
                        />
                    </a>
                    <p> App!</p>
                </div>
            </div>
                    
            <div>
            {/* <button className="styled-button" onClick={window.open('https://app.findmymeal.io/')}>Download App</button> */}
            </div>

        </div>

    </div>
  );
};


export default (WaitlistBanner);


