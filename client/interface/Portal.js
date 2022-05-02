/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../views/Loading";
import { receiveInvitation } from "../redux/reducers/auth";
import Nav from "./Nav";

export const Portal = ({ Component, props, auth, preCheck }) => {
  return (
    <main style={{ height: "100vh" }}>
      {!preCheck ? (
        <Loading />
      ) : !auth.id ? (
        <Component auth={null} {...props} />
      ) : props.frontend ? (
        <Component auth={auth} {...props} />
      ) : (
        <>
          <Nav />
          <div style={{ marginTop: 56 }}>
            <Component auth={auth} {...props} />
          </div>
        </>
      )}
    </main>
  );
};

const mapState = (state) => {
  const { auth, preCheck, validInvitation } = state.auth;
  const isLoggedIn = !!auth.id;
  return {
    isLoggedIn,
    auth,
    preCheck,
    validInvitation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    isValid(inviteId) {
      dispatch(receiveInvitation(inviteId));
    },
  };
};

export default connect(mapState, mapDispatch)(Portal);
