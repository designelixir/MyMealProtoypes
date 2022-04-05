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
import {
  createCategory,
  fetchMenu,
  swapCategoryOrder,
} from "../redux/reducers/menu";
import { fetchCorporation } from "../redux/reducers/corporation";
import { fetchRestaurant } from "../redux/reducers/restaurant";

const Menu = ({
  getMenu,
  match,
  isLoading,
  menu,
  addCategory,
  swapCategories,
}) => {
  const history = useHistory();
  const { restaurantId, corporationId, menuId } = match.params;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getMenu({
      menuId,
      cb(menu) {
        setCategories(menu.categories);
      },
    });
  }, []);

  const [categoryName, setCategoryName] = useState("");
  const handleNewCategory = () => {
    setCategoryName("");
    addCategory({
      menuId,
      body: { name: categoryName, position: categories.length, menuId },
      cb(menu) {
        setCategories(menu.categories);
      },
    });
  };
  const handleReposition = (idx, moveTo) => {
    swapCategories({
      menuId,
      body: {
        categoryOne: { id: categories[idx].id, position: idx + moveTo },
        categoryTwo: { id: categories[idx + moveTo].id, position: idx },
      },
    });
    const newCats = [...categories];
    [newCats[idx], newCats[idx + moveTo]] = [
      newCats[idx + moveTo],
      newCats[idx],
    ];
    setCategories(newCats);
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
      {categories.map((category, idx) => (
        <Container key={category.id}>
          <Link
            to={`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${category.id}`}
          >
            {category.name}
          </Link>
          {idx !== 0 && (
            <Button
              variant="Link"
              onClick={() => {
                handleReposition(idx, -1);
              }}
            >
              up
            </Button>
          )}
          {idx !== categories.length - 1 && (
            <Button
              variant="Link"
              onClick={() => {
                handleReposition(idx, 1);
              }}
            >
              down
            </Button>
          )}
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
    getMenu({ menuId, cb }) {
      dispatch(fetchMenu({ menuId, cb }));
      // dispatch(fetchRestaurant(restaurantId));
      // dispatch(fetchCorporation(corporationId));
    },
    swapCategories(data) {
      dispatch(swapCategoryOrder(data));
    },
    addCategory(data) {
      dispatch(createCategory(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Menu);
