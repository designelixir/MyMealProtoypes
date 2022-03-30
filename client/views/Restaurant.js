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
      <h1>{restaurant.name}</h1>

      <h2>Create Menu</h2>
      <FloatingLabel label="Name" className="d-flex mb-3">
        <Form.Control
          type="text"
          name="name"
          value={menuData.name}
          onChange={({ target: { value } }) =>
            setMenuData({ ...menuData, name: value })
          }
        />
      </FloatingLabel>
      {allergies.map((allergy) => (
        <Form.Check
          inline
          type="checkbox"
          label={allergy.name}
          name={allergy.name}
          id={allergy.id}
          checked={menuData.allergyIds[allergy.id] === true}
          onChange={({ target: { id, checked } }) =>
            setMenuData({
              ...menuData,
              allergyIds: {
                ...menuData.allergyIds,
                [id]: checked,
              },
            })
          }
        />
      ))}
      <Button onClick={handleCreateMenu}>Create Menu</Button>
      <h2>Menus</h2>
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
