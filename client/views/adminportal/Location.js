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
} from "../../redux/reducers/menu";
import { fetchCorporation } from "../../redux/reducers/corporation";
import { fetchRestaurant } from "../../redux/reducers/restaurant";
import Divider from "../components/Divider";
import EditMenu from "../modals/EditMenu";
import { fetchAllergies } from "../../redux/reducers/allergy";
import CreateNewLocation from "../modals/CreateNewLocation";
import CreateNewCategory from "../modals/CreateNewCategory";
import { fetchLocation } from "../../redux/reducers/location";
import EditLocation from "../modals/EditLocation";

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
    <Container id="locationComponent">
      
      <div>
      <div className="center-flex-start page-path-container">
        <div onClick={() => history.push("/")}>Dashboard</div> <p>&nbsp;/&nbsp;</p>
        <div onClick={() => history.push(`/corporations/${corporationId}`)}>{restaurantLocation.menu?.restaurant.corporation.name}</div> <p>&nbsp;/&nbsp;</p>
        <div onClick={() =>history.push(`/corporations/${corporationId}/restaurants/${restaurantId}`)}>{restaurantLocation.menu?.restaurant.name}</div><p>&nbsp;/&nbsp;</p>
        <div className="active-breadcrumb" >{restaurantLocation.address}</div>
      </div>
      <br></br>
          <h1>Edit Location</h1>
        </div>
      <Row className="space-between-flex corporations">
        <div>
        <p className="p2-text">{restaurantLocation.address}</p>
        <p><strong>Last updated:</strong> {restaurantLocation.country}</p>
        </div>
        <EditLocation
       
          restaurantLocation={restaurantLocation}
          restaurantMenus={
            restaurantLocation.menu && restaurantLocation.menu.restaurant.menus
          }
        />
      </Row>
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
