import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Breadcrumb } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Divider from "./components/Divider";

import { fetchLocation } from "../redux/reducers/location";
import EditLocation from "./modals/EditLocation";

const UserLocation = ({
  getLocation,
  restaurantLocation,
  match,
  isLoading,
}) => {
  const history = useHistory();
  const { restaurantId, locationId } = match.params;

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
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => history.push(`/restaurants/${restaurantId}`)}
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

export default connect(mapState, mapDispatch)(UserLocation);
