import { combineReducers } from "redux";

// import auth from "./reducers/auth";

import auth from "./reducers/auth";
import allergy from "./reducers/allergy";
import menu from "./reducers/menu";
import corporation from "./reducers/corporation";
import restaurant from "./reducers/restaurant";
import location from "./reducers/location";
import category from "./reducers/category";
import menuitem from "./reducers/menuitem";

const rootReducer = combineReducers({
  auth,
  corporation,
  restaurant,
  location,
  category,
  menuitem,
  allergy,
  menu,
});

export default rootReducer;
