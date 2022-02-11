/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";

export const Loading = () => {
  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        className="spinner-grow"
        style="width: 6rem; height: 6rem;"
        role="status"
        style={{
          color: "#c11c24",
          boxShadow: "inset 0 0 8px 0 #c11c24, 0 0 8px 0 #c11c24",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default connect(null, null)(Loading);
