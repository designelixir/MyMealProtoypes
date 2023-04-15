/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { reset } from "../redux/reducers/auth";

const Nav = ({ isLoggedIn, logout }) => {
  return (
    <nav className="backend-nav bottom-drop-shadow space-between-flex bottom-box-shadow">
      <div className="center-flex-start">
        <img src="/mymeal-logolettermark-blueblack.png" style={{height: "25px", paddingRight: "5px"}}></img>
        <p style={{fontSize: "28px"}}>&nbsp;Admin Portal</p>  
      </div>
      <div>
          {isLoggedIn && (
            <div id="navbarSupportedContent">
                  <a
                    className="nav-link dropdown-toggle backend-styled-edit-button"
                    href="#"
                    style={{textDecoration:"none"}}
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {`Account`}
                  </a>
                  
                    
                  <a
                    className="backend-styled-edit-button"
                    href="/"
                    onClick={logout}
                    style={{textDecoration:"none"}}
                  >
                    Logout
                  </a>
            </div>
          )}
      </div>
      
       
    </nav>
  );
};

const mapState = (state) => {
  const { auth } = state.auth;

  const isLoggedIn = !!auth.id;

  return {
    isLoggedIn,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logout() {
      dispatch(reset());
    },
  };
};

export default connect(mapState, mapDispatch)(Nav);
