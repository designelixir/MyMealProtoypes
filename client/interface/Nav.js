/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { reset } from "../redux/reducers/auth";

const Nav = ({ isLoggedIn, logout }) => {
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg"
      style={{ backgroundColor: "#E5EAFA" }}
    >
      <div
        className="container-fluid d-flex justify-content-end"
        style={{ height: 40 }}
      >
        {/* <Link className="navbar-brand" to="/" onClick={() => clearAgent()}>
          <img
            src="/Male/PNG/Omni Agent Male red letters Transparent background @2x.png"
            alt=""
            style={{
              height: 54,

              margin: 0,
              top: 0,
              left: 10,
            }}
            className="d-inline-block align-text-top"
          />
        </Link> */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="d-flex flex-end"
          id="navbarSupportedContent"
          style={{ paddingLeft: 250 }}
        >
          {isLoggedIn && (
            <div className="d-flex" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "#101418" }}
                  >
                    {`Account`}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                    aria-labelledby="navbarDropdown"
                    style={{ marginTop: 8, backgroundColor: "#101418" }}
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="/"
                        onClick={logout}
                        style={{ color: "#E5EAFA" }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </div>
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
