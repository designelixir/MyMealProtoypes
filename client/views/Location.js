import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Breadcrumb,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {
  createCategory,
  fetchMenu,
  swapCategoryOrder,
  uploadCSVFile,
} from "../redux/reducers/menu";
import { fetchCorporation } from "../redux/reducers/corporation";
import { fetchRestaurant } from "../redux/reducers/restaurant";
import Divider from "./components/Divider";
import EditMenu from "./modals/EditMenu";
import { fetchAllergies } from "../redux/reducers/allergy";
import CreateNewLocation from "./modals/CreateNewLocation";
import CreateNewCategory from "./modals/CreateNewCategory";
import { fetchLocation } from "../redux/reducers/location";
import EditLocation from "./modals/EditLocation";

const Location = ({ getLocation, restaurantLocation, match, isLoading }) => {
  const history = useHistory();
  const { restaurantId, corporationId, locationId } = match.params;

  useEffect(() => {
    getLocation(locationId);
  }, []);

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
          {restaurantLocation.menu &&
            restaurantLocation.menu.restaurant.corporation.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {restaurantLocation.menu && restaurantLocation.menu.restaurant.name}
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{restaurantLocation.address}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>{restaurantLocation.address}</h1>
        <EditLocation
          restaurantLocation={restaurantLocation}
          restaurantMenus={
            restaurantLocation.menu && restaurantLocation.menu.restaurant.menus
          }
        />
      </Row>
      <Divider />
    </Container>
  );
};

const mapState = (state) => {
  const { restaurantLocation, isLoading } = state.location;
  return {
    isLoading,
    restaurantLocation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getLocation(locationId) {
      dispatch(fetchLocation(locationId));
    },
  };
};

export default connect(mapState, mapDispatch)(Location);
