/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";

const Footer = () => {
  return (
    <nav
      className="navbar fixed-bottom navbar-light"
      style={{ backgroundColor: "#E5EAFA" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" style={{ color: "#101418" }}>
          OmniAgent
        </a>
        <div className="d-flex">
          <small style={{ color: "#101418" }}>
            © 2021 OmniAgent LLC. All Rights Reserved.
          </small>
        </div>
      </div>
    </nav>
  );
};

export default connect(null, null)(Footer);
