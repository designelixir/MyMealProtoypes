import React, { useEffect } from "react";
import { connect } from "react-redux";
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
import { fetchMyCorporation } from "../../redux/reducers/corporation";
import { Link, useHistory } from "react-router-dom";
import CreateNewRestaurant from "../modals/CreateNewRestaurant";
import Divider from "../components/Divider";
import EditCorporation from "../modals/EditCorporation";
const UserDashboard = ({ getMyCorporation, corporation, isLoading }) => {
  const history = useHistory();
  useEffect(() => {
    getMyCorporation();
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
      </Breadcrumb>
      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>{corporation.name}</h1>
        <EditCorporation corporation={corporation} />
      </Row>
      <Divider />
      <Row className="d-flex justify-content-start align-items-center">
        <h3 style={{ width: "fit-content" }}>Restaurants</h3>
        <CreateNewRestaurant
          corporationId={corporation.id}
          corporationCCP={corporation.crossContactProcedure}
        />
      </Row>
      <ListGroup>
        {corporation.restaurants &&
          corporation.restaurants.map((restaurant) => (
            <ListGroupItem>
              <Container
                onClick={() => history.push(`/restaurants/${restaurant.id}`)}
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
    corporation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMyCorporation() {
      dispatch(fetchMyCorporation());
    },
  };
};

export default connect(mapState, mapDispatch)(UserDashboard);
