import React from "react";
import iconData from "../data.json";
import Grain from "./Grain";
export default function Icon(props) {
  switch (props.icon) {
    case "grain":
      return <Grain fill={props.fill} cross={props.cross} />;
  }
}
