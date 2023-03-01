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
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import {
  createMenu,
  duplicateMenu,
  fetchRestaurant,
} from "../../redux/reducers/restaurant";
import { fetchAllergies } from "../../redux/reducers/allergy";
import { fetchCorporation } from "../../redux/reducers/corporation";
import CreateNewMenu from "../modals/CreateNewMenu";
import Divider from "../components/Divider";
import EditRestaurant from "../modals/EditRestaurant";
import CreateNewLocation from "../modals/CreateNewLocation";

const Restaurant = ({
  getData,
  isLoading,
  allergies,
  match,
  restaurant,
  addMenu,
  newMenu,
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
    <Container id="restaurantComponent">
      <Row className="space-between-flex">
        <div>
          <div className="center-flex-start page-path-container">
          <div onClick={() => history.push("/")}>Dashboard</div> <p>&nbsp;/&nbsp;</p>
          <div onClick={() => history.push(`/corporations/${corporationId}`)}>{restaurant.corporation?.name}</div> <p>&nbsp;/&nbsp;</p>
          <div className="active-breadcrumb" >{restaurant.name}</div>
        </div>
        <h1>Menus</h1>
        </div>
        
        <div>
          <EditRestaurant restaurant={restaurant} />
          <CreateNewMenu restaurantId={restaurantId} allergies={allergies} />
          
        </div>
        
      </Row>
      

      <ListGroup className="mb-3">
        {restaurant.menus &&
          restaurant.menus.map((menu) => (
            <ListGroupItem
              key={menu.id}
              className="corporations"
            >
              <Container
              className="space-between-flex hover-text"
                style={{ cursor: "pointer" }} onClick={() =>history.push(`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menu.id}`)}
              >
                {menu.name}
                <div>
                  
                  <Button
              className="backend-styled-edit-button"
                onClick={() => newMenu({ restaurantId, menuId: menu.id })}
              >
                &#x274F; Duplicate
              </Button>
              <Button className="backend-styled-edit-button" onClick={() =>history.push(`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menu.id}`)}>
                  &#9998;  Edit
                  </Button>
                </div>
                
              </Container>
              
            </ListGroupItem>
          ))}
      </ListGroup>

      <Row className="space-between-flex">
        <h1>Locations</h1>
        <CreateNewLocation
          restaurantId={restaurantId}
          restaurantCCP={restaurant.crossContactProcedure}
          restaurantMenus={restaurant.menus}
        />
      </Row>

      <div>
        {restaurant.locations &&
          restaurant.locations.map((location) => (
            <ListGroupItem key={location.id}>
              <div className="space-between-flex corporations">
                <div>
                <p style={{fontSize: "16px" }}>
                &#128204; {location.address}
              </p>
              <p> <a target="_blank" className="hover" href={`${window.location.origin}/order/restaurants/${restaurantId}/locations/${location.id}`}>{`${window.location.origin}/order/restaurants/${restaurantId}/locations/${location.id}`}</a></p>
              </div>
              
              <div className="backend-styled-edit-button" onClick={() =>
                  history.push(
                    `/corporations/${corporationId}/restaurants/${restaurantId}/locations/${location.id}`
                  )
                }>
          &#9998;  Edit 
          
              </div>
              </div>
              
              
            </ListGroupItem>
            
          ))}
          
      </div>
      
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
    newMenu(data) {
      dispatch(duplicateMenu(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Restaurant);
