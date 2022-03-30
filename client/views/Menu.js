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
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { createCategory, fetchMenu } from "../redux/reducers/menu";
import { fetchCorporation } from "../redux/reducers/corporation";
import { fetchRestaurant } from "../redux/reducers/restaurant";

const Menu = ({ getData, match, isLoading, menu, addCategory }) => {
  const history = useHistory();
  const { restaurantId, corporationId, menuId } = match.params;
  useEffect(() => {
    getData({ menuId, restaurantId, corporationId });
  }, []);

  const [categoryName, setCategoryName] = useState("");
  const handleNewCategory = () => {
    setCategoryName("");
    addCategory({ menuId, body: { name: categoryName, menuId } });
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
          {menu.restaurant && menu.restaurant.corporation.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {menu.restaurant && menu.restaurant.name}
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{menu.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{menu.name}</h1>

      <Row>
        <Col>
          <h2>Categories</h2>
        </Col>
        <Col>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={categoryName}
                placeholder="Name"
                onChange={({ target: { value } }) => setCategoryName(value)}
              />
            </Col>
            <Col>
              <Button onClick={handleNewCategory}>Add New</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {menu.categories &&
        menu.categories.map((category) => (
          <Container>
            <Link
              to={`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${category.id}`}
            >
              {category.name}
            </Link>
          </Container>
        ))}
    </Container>
  );
};

const mapState = (state) => {
  const { menu, isLoading } = state.menu;
  return {
    isLoading,
    menu,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData({ menuId, restaurantId, corporationId }) {
      dispatch(fetchMenu(menuId));
      // dispatch(fetchRestaurant(restaurantId));
      // dispatch(fetchCorporation(corporationId));
    },
    addCategory(data) {
      dispatch(createCategory(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Menu);
