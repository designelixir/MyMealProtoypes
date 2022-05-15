import React from "react";
import { connect } from "react-redux";
import AdminDashboard from "./adminportal/AdminDashboard";
import UserDashboard from "./userportal/UserDashboard";

const Dashboard = ({ auth }) => {
  return auth.role === "Admin" ? <AdminDashboard /> : <UserDashboard />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
