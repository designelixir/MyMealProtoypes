import React from "react";
import { connect } from "react-redux";
import Category from "./Category";

export const Categories = ({ categories, primaryColor }) => {
  return (
    <div>
      {categories.map((category) => (
        <Category category={category} primaryColor={primaryColor} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
