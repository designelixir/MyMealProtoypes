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
    <Container id="corporationComponent">
      <Row className="space-between-flex">
        <div>
          <div className="center-flex-start page-path-container">
            <div onClick={() => history.push("/")}>Dashboard</div>{" "}
            <p>&nbsp;/&nbsp;</p>
            <div className="active-breadcrumb">{corporation.name}</div>
          </div>
          <h1>Restaurants</h1>
        </div>

        <div>
          <EditCorporation corporation={corporation} />
          <CreateNewRestaurant
            corporationId={corporationId}
            corporationCCP={corporation.crossContactProcedure}
          />
        </div>
      </Row>

      <div>
        {corporation.restaurants &&
          corporation.restaurants.map((restaurant, index) => (
            <div key={index} className="space-between-flex corporations hover" onClick={() =>history.push(`/corporations/${corporationId}/restaurants/${restaurant.id}`)}>

                <Row className="center-flex-start" >
                  <img
                    style={{ width: "auto", height: 50 }}
                    src={
                      restaurant.logo
                        ? restaurant.logo.url
                        : "/icons/gallery.png"
                    }
                    className="img-fluid rounded shadow"
                  />

                  <p className="hover-text p2-text">&nbsp; {restaurant.name}</p>
                </Row>
                <Button className="backend-styled-edit-button" >
                  View
                </Button>
            </div>
            
          ))}
      </div>
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
