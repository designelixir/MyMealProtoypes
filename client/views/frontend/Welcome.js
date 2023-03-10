import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchFrontendRestaurant } from "../../redux/reducers/frontend";
import { Container, Image, Button } from "react-bootstrap";
import MainScreen from "./MainScreen";
import Restrictions from "./Restrictions";

const Welcome = ({ match, getRestaurant, isLoading, restaurant }) => {

  const { restaurantId, locationId } = match.params;

  useEffect(() => {
    getRestaurant({ restaurantId, locationId });
  }, []);

  const [hasRestrictions, setHasRestrictions] = useState(false);

  if (isLoading) return <></>;

  if (!restaurant.id)

    return (
      <Container>
        <p>Invalid</p>
      </Container>
    );

    return (

      <section
        className="d-flex flex-column justify-content-center"
        style={{
          backgroundImage: `url(${
            restaurant.bg ? restaurant.bg.url : "/img/generic-bg.jpg"
          })`,
          height: "100vh",
          width: "auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}>

          

          {hasRestrictions ? (
            <Restrictions {...{ restaurant, setHasRestrictions }} />
          ) : (
            <MainScreen {...{ restaurant, setHasRestrictions }} />
          )}
      </section>

    );

};

const mapState = (state) => {
  const { restaurant, isLoading } = state.frontend;
  return { restaurant, isLoading };
};

const mapDispatch = (dispatch) => {
  return {
    getRestaurant(data) {
      dispatch(fetchFrontendRestaurant(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Welcome);
