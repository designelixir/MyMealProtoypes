import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  createRestaurant,
  fetchCorporation,
} from "../redux/reducers/corporation";
import { Container, Row, Col, Form, Button, Breadcrumb } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
export const Corporation = ({
  getCorporation,
  match,
  isLoading,
  corporation,
  addRestaurant,
}) => {
  const history = useHistory();
  const { corporationId } = match.params;
  useEffect(() => {
    getCorporation(corporationId);
  }, []);
  const [restaurantName, setRestaurantName] = useState("");
  const handleNewRestaurant = () => {
    setRestaurantName("");
    addRestaurant({ restaurantName, corporationId });
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

        <Breadcrumb.Item active>{corporation.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{corporation.name}</h1>

      <Row>
        <Col>
          <h2>Restaurants</h2>
        </Col>
        <Col>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={restaurantName}
                placeholder="Name"
                onChange={({ target: { value } }) => setRestaurantName(value)}
              />
            </Col>
            <Col>
              <Button onClick={handleNewRestaurant}>Add New</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {corporation.restaurants &&
        corporation.restaurants.map((restaurant) => (
          <Container>
            <Link
              to={`/corporations/${corporationId}/restaurants/${restaurant.id}`}
            >
              {restaurant.name}
            </Link>
          </Container>
        ))}
    </Container>
  );
};

const mapState = (state) => {
  const { corporation, isLoading } = state.corporation;
  return {
    isLoading,
    corporation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCorporation(corporationId) {
      dispatch(fetchCorporation(corporationId));
    },
    addRestaurant(data) {
      dispatch(createRestaurant(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Corporation);
