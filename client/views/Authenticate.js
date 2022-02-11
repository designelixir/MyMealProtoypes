/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

export const Authenticate = ({ auth }) => {
  if (auth) {
    return <Redirect to="/" />;
  }
  return <div>Authenticaion Failed...</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
