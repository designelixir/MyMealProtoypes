import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMyCorporation } from "../redux/reducers/corporation";

const UserDashboard = ({ getMyCorporation, corporation }) => {
  useEffect(() => {
    getMyCorporation();
  }, []);
  return <div>{corporation.name}</div>;
};

const mapState = (state) => {
  const { corporation } = state.corporation;
  return {
    corporation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMyCorporation() {
      dispatch(fetchMyCorporation());
    },
  };
};

export default connect(mapState, mapDispatch)(UserDashboard);
