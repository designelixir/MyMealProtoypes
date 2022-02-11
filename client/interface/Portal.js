/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../views/Loading";
import { receiveInvitation } from "../redux/reducers/auth";

export const Portal = ({ Component, props, auth, preCheck }) => {
  return (
    <main className="container" style={{ height: "calc(100vh - 112px)" }}>
      {!preCheck ? (
        <Loading />
      ) : !auth.id ? (
        <Component auth={null} {...props} />
      ) : (
        <Component auth={auth} {...props} />
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
