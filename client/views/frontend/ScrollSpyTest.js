import React from "react";
import { connect } from "react-redux";
import ScrollSpyTabs from "./ScrollSpyTabs";

export const ScrollSpyTest = (props) => {
  return (
    <div>
      <ScrollSpyTabs
        tabsInScroll={[
          {
            text: "Tab no. 1",
            component: <p style={{ height: "80vh" }}>tab no 1 - some text</p>,
          },
          {
            text: "Tab no. 2",
            component: <p style={{ height: "80vh" }}>tab no 2 - some text</p>,
          },
          {
            text: "Tab no. 3",
            component: <p style={{ height: "150vh" }}>tab no 3 - some text</p>,
          },
          {
            text: "Tab no. 4",
            component: <p style={{ height: "100vh" }}>tab no 4 - some text</p>,
          },
          {
            text: "Tab no. 5",
            component: <p style={{ height: "100vh" }}>tab no 4 - some text</p>,
          },
        ]}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollSpyTest);
