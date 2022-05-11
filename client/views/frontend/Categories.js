import React from "react";
import { connect } from "react-redux";
import Category from "./Category";

export const Categories = ({ categories, primaryColor, categoryRefs }) => {
  return (
    <div>
      {categories.map((category, idx) => (
        <Category
          category={category}
          primaryColor={primaryColor}
          categoryRef={categoryRefs[idx]}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
