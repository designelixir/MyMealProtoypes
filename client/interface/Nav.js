/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetAgent } from "../redux/reducers/agent";
import { reset } from "../redux/reducers/auth";

const Nav = ({ name, isAdmin, isLoggedIn, logout, canKeyword, clearAgent }) => {
  const hasKeyword = canKeyword && isLoggedIn;
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg"
      style={{ backgroundColor: "#E5EAFA" }}
    >
      <div className="container-fluid" style={{ height: 40 }}>
        <Link className="navbar-brand" to="/" onClick={() => clearAgent()}>
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
        </Link>

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
          {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  style={{ color: "#101418" }}
                >
                  Newsfeed
                </Link>
              </li>
            )}

            {hasKeyword && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/keyword"
                  style={{ color: "#101418" }}
                >
                  Keywords
                </Link>
              </li>
            )}
          </ul> */}
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
                    {`${name}'s Account`}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                    aria-labelledby="navbarDropdown"
                    style={{ marginTop: 8, backgroundColor: "#101418" }}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/account"
                        style={{ color: "#E5EAFA" }}
                      >
                        My Account
                      </Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link
                          className="dropdown-item"
                          style={{ color: "#E5EAFA" }}
                          to="/admin"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr
                        className="dropdown-divider"
                        style={{ color: "#E5EAFA" }}
                      />
                    </li>
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
  const isAdmin = auth.role === "Admin";
  const canKeyword =
    (auth.permissions &&
      auth.permissions.some((p) => p.name === "view_keywords")) ||
    isAdmin;

  const isLoggedIn = !!auth.id;
  const firstName = auth.firstName;
  const name = firstName
    ? firstName.substring(0, 1).toUpperCase() + firstName.substring(1)
    : "";
  return {
    isLoggedIn,
    name,
    isAdmin,
    canKeyword,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logout() {
      dispatch(reset());
    },
    clearAgent() {
      dispatch(resetAgent());
    },
  };
};

export default connect(mapState, mapDispatch)(Nav);
