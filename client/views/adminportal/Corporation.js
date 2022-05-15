import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCorporation } from "../../redux/reducers/corporation";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Breadcrumb,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import CreateNewRestaurant from "../modals/CreateNewRestaurant";
import Divider from "../components/Divider";
import EditCorporation from "../modals/EditCorporation";
export const Corporation = ({
  getCorporation,
  match,
  isLoading,
  corporation,
}) => {
  const history = useHistory();
  const { corporationId } = match.params;
  useEffect(() => {
    getCorporation(corporationId);
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

        <Breadcrumb.Item active>{corporation.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>{corporation.name}</h1>
        <EditCorporation corporation={corporation} />
      </Row>
      <Divider />
      <Row className="d-flex justify-content-start align-items-center">
        <h3 style={{ width: "fit-content" }}>Restaurants</h3>
        <CreateNewRestaurant
          corporationId={corporationId}
          corporationCCP={corporation.crossContactProcedure}
        />
      </Row>
      <ListGroup>
        {corporation.restaurants &&
          corporation.restaurants.map((restaurant) => (
            <ListGroupItem>
              <Container
                onClick={() =>
                  history.push(
                    `/corporations/${corporationId}/restaurants/${restaurant.id}`
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Row className="d-flex align-items-center">
                  <Col
                    lg={1}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <img
                      style={{ width: "auto", height: 50 }}
                      src={restaurant.logo ? restaurant.logo.url : ""}
                      className="img-fluid rounded shadow"
                    />
                  </Col>
                  <Col>{restaurant.name}</Col>
                </Row>
              </Container>
            </ListGroupItem>
          ))}
      </ListGroup>
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
    uploadImages(body) {
      dispatch(uploadFiles(body));
    },
    addRestaurant(data) {
      dispatch(createRestaurant(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Corporation);
