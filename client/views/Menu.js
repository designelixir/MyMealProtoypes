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
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {
  createCategory,
  fetchMenu,
  swapCategoryOrder,
  uploadCSVFile,
} from "../redux/reducers/menu";
import { fetchCorporation } from "../redux/reducers/corporation";
import { fetchRestaurant } from "../redux/reducers/restaurant";
import Divider from "./components/Divider";
import EditMenu from "./modals/EditMenu";
import { fetchAllergies } from "../redux/reducers/allergy";
import CreateNewLocation from "./modals/CreateNewLocation";
import CreateNewCategory from "./modals/CreateNewCategory";

const Menu = ({
  getMenu,
  getAllergies,
  allergies,
  match,
  isLoading,
  menu,

  swapCategories,
}) => {
  const history = useHistory();
  const { restaurantId, corporationId, menuId } = match.params;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllergies();
    getMenu({
      menuId,
      cb(menu) {
        setCategories(menu.categories);
      },
    });
  }, []);

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

      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>{menu.name}</h1>
        <EditMenu menu={menu} allergies={allergies} />
      </Row>

      <Divider />
      <Row className="d-flex justify-content-start align-items-center">
        <h2 style={{ width: "fit-content" }}>Categories</h2>
        <CreateNewCategory
          {...{
            menuId,
            categories,
            setCategories,
          }}
        />
      </Row>

      <ListGroup>
        {categories.map((category, idx) => (
          <ListGroupItem
            key={category.id}
            action
            className="d-flex justify-content-between align-items-center"
          >
            <Container
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(
                  `/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${category.id}`
                )
              }
            >
              {category.name}
            </Container>
            <div className="d-flex">
              {idx !== 0 && (
                <Button
                  variant="link"
                  className="mr-3"
                  onClick={() => {
                    handleReposition(idx, -1);
                  }}
                >
                  up
                </Button>
              )}
              {idx !== categories.length - 1 && (
                <Button
                  variant="link"
                  onClick={() => {
                    handleReposition(idx, 1);
                  }}
                >
                  down
                </Button>
              )}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

const mapState = (state) => {
  const { menu, isLoading } = state.menu;
  const { allergies } = state.allergy;
  return {
    isLoading,
    menu,
    allergies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMenu({ menuId, cb }) {
      dispatch(fetchMenu({ menuId, cb }));
      // dispatch(fetchRestaurant(restaurantId));
      // dispatch(fetchCorporation(corporationId));
    },
    getAllergies() {
      dispatch(fetchAllergies());
    },
    swapCategories(data) {
      dispatch(swapCategoryOrder(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Menu);
