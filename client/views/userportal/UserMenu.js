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
import { useHistory } from "react-router-dom";
import {
  fetchMenu,
  swapCategoryOrder,
  updateCategoryArchived,
} from "../../redux/reducers/menu";

import Divider from "../components/Divider";
import EditMenu from "../modals/EditMenu";
import { fetchAllergies } from "../../redux/reducers/allergy";

import CreateNewCategory from "../modals/CreateNewCategory";

const UserMenu = ({
  getMenu,
  getAllergies,
  allergies,
  match,
  isLoading,
  menu,
  changeCategoryArchived,
  swapCategories,
}) => {
  const history = useHistory();
  const { restaurantId, menuId } = match.params;
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
  const handleChangeArchived = ({ checked, categoryId }) => {
    changeCategoryArchived({
      categoryId,
      menuId,
      body: {
        archived: checked,
      },
      cb(menu) {
        setCategories(menu.categories);
      },
    });
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
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => history.push(`/restaurants/${restaurantId}`)}
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
                  `/restaurants/${restaurantId}/menus/${menuId}/categories/${category.id}`
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
            <div className="d-flex">
              <Form.Check
                inline
                label={category.archived ? "Archived" : "Active"}
                type="switch"
                checked={!category.archived}
                onChange={({ target: { checked } }) =>
                  handleChangeArchived({
                    checked: !checked,
                    categoryId: category.id,
                  })
                }
              />
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
    changeCategoryArchived(data) {
      dispatch(updateCategoryArchived(data));
    },
  };
};

export default connect(mapState, mapDispatch)(UserMenu);
