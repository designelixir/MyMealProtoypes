/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import QueryString from "qs";
import { Redirect } from "react-router";

export const FourOhFour = ({ auth, match, location }) => {
  const { any } = match.params;
  const query = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  let message = any;
  if (query.id) {
    message += " with id: " + query.id;
  }

  return <div>{message} - Does not exist</div>;
};

export default connect(null, null)(FourOhFour);
