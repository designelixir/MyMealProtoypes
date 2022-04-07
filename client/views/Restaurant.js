import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Breadcrumb,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { createMenu, fetchRestaurant } from "../redux/reducers/restaurant";
import { fetchAllergies } from "../redux/reducers/allergy";
import { fetchCorporation } from "../redux/reducers/corporation";
import CreateNewMenu from "./modals/CreateNewMenu";
import Divider from "./components/Divider";
import EditRestaurant from "./modals/EditRestaurant";

const Restaurant = ({
  getData,
  isLoading,
  allergies,
  match,
  restaurant,
  addMenu,
}) => {
  const history = useHistory();
  const { restaurantId, corporationId } = match.params;
  useEffect(() => {
    getData({ restaurantId, corporationId });
  }, []);
  const [menuData, setMenuData] = useState({
    name: "",
    allergyIds: [],
  });

  const handleCreateMenu = () => {
    const { name, allergyIds } = menuData;
    const ids = Object.keys(allergyIds).reduce((ids, id) => {
      if (allergyIds[id]) {
        ids.push(id);
      }
      return ids;
    }, []);
    addMenu({ data: { name, restaurantId }, allergyIds: ids });
  };

  if (isLoading) {
    return <></>;
  }
  return (
    <Container>
      <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
        <Breadcrumb.Item
          onClick={() => history.push("/")}
          style={{ color: "#4e66f8" }}
        >
          Corporations
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => history.push(`/corporations/${corporationId}`)}
          style={{ color: "#4e66f8" }}
        >
          {restaurant.corporation && restaurant.corporation.name}
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{restaurant.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>{restaurant.name}</h1>
        <EditRestaurant restaurant={restaurant} />
      </Row>
      <Divider />
      <Row className="d-flex justify-content-start align-items-center">
        <h3 style={{ width: "fit-content" }}>Menus</h3>
        <CreateNewMenu restaurantId={restaurantId} allergies={allergies} />
      </Row>
      {restaurant.menus &&
        restaurant.menus.map((menu) => (
          <Container>
            <Link
              to={`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menu.id}`}
            >
              {menu.name}
            </Link>
          </Container>
        ))}
    </Container>
  );
};

const mapState = (state) => {
  const { allergies } = state.allergy;
  const { restaurant, isLoading } = state.restaurant;
  return {
    isLoading,
    allergies,
    restaurant,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData({ restaurantId, corporationId }) {
      dispatch(fetchRestaurant(restaurantId));
      // dispatch(fetchCorporation(corporationId));
      dispatch(fetchAllergies());
    },
    addMenu(data) {
      dispatch(createMenu(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Restaurant);
