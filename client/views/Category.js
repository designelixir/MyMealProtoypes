import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Breadcrumb,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createMenuItem, fetchCategory } from "../redux/reducers/category";
import MenuItemForm from "./formComponents/MenuItemForm";
import Divider from "./components/Divider";

const Category = ({ getData, match, isLoading, category, addMenuItem }) => {
  const history = useHistory();
  const { categoryId, restaurantId, corporationId, menuId } = match.params;
  useEffect(() => {
    getData({ categoryId, menuId, restaurantId, corporationId });
  }, []);
  const [creating, setCreating] = useState(false);
  const [allergyTypes, setAllergyTypes] = useState({});
  const [priceType, setPriceType] = useState("Single");
  const [priceTypes, setPriceTypes] = useState({ 0: { type: "", price: 0 } });
  const handleChangePriceTypes = ({ name, value, idx }) => {
    setPriceTypes({
      ...priceTypes,
      [idx]: {
        ...priceTypes[idx],
        [name]: value,
      },
    });
  };
  const handleAddPriceTypes = (nextIdx) => {
    setPriceTypes({ ...priceTypes, [nextIdx]: { type: "", price: 0 } });
  };
  const handleRemovePriceTypes = (idx) => {
    delete priceTypes[idx];
    const reKeyed = {};
    Object.values(priceTypes).forEach((pt, i) => {
      reKeyed[i] = pt;
    });
    setPriceTypes(reKeyed);
  };
  const handleAddMenuItem = (menuAllergies) => {
    const thing = {};
    for (const { id } of menuAllergies) {
      thing[id] = {
        type: "Safe",
        cross: false,
        crossMod: false,
        modDescription: "",
        crossDescription: "",
        crossModDescription: "",
      };
    }
    setAllergyTypes(thing);
    setCreating(true);
  };
  const handleChangeAllergyTypes = (allergyId, name, value) => {
    let newValues = {};
    if (name === "type" && value === "Unsafe") {
      newValues = {
        ...allergyTypes[allergyId],
        [name]: value,
        cross: false,
        crossMod: false,
      };
    } else if (name === "cross" && value === false) {
      newValues = {
        ...allergyTypes[allergyId],
        [name]: value,
        crossMod: false,
      };
    } else {
      newValues = {
        ...allergyTypes[allergyId],
        [name]: value,
      };
    }
    setAllergyTypes({
      ...allergyTypes,
      [allergyId]: newValues,
    });
  };
  const menuItemInit = {
    name: "",
    image: "",
    description: "",
    price: 0,
  };
  const [menuItem, setMenuItem] = useState(menuItemInit);
  const resetMenuItem = () => {
    setCreating(false);
    setMenuItem(menuItemInit);
  };

  const handleChangeMenuItem = ({ target: { name, value } }) => {
    setMenuItem({ ...menuItem, [name]: value });
  };
  const handleNewMenuItem = () => {
    resetMenuItem();
    addMenuItem({
      categoryId,
      body: { menuItem, priceType, priceTypes, allergyTypes },
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
          Corporations
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => history.push(`/corporations/${corporationId}`)}
          style={{ color: "#4e66f8" }}
        >
          {category.menu && category.menu.restaurant.corporation.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {category.menu && category.menu.restaurant.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {category.menu && category.menu.name}
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{category.name}</h1>
      <Divider />
      <Row>
        <Col>
          <h2>Menu Items</h2>
        </Col>
        <Col>
          <Button
            onClick={() => handleAddMenuItem(category.menu.allergies)}
            disabled={!!!category.menu}
          >
            Add Menu Item
          </Button>
        </Col>
      </Row>
      {creating && (
        <>
          <MenuItemForm
            {...{
              menuItem,
              handleChangeMenuItem,
              priceType,
              setPriceType,
              priceTypes,
              handleChangePriceTypes,
              handleAddPriceTypes,
              handleRemovePriceTypes,
              allergyTypes,
              handleChangeAllergyTypes,
            }}
            menuitemAllergies={category.menu ? category.menu.allergies : []}
          />
          <Row>
            <Col>
              <Button
                disabled={
                  menuItem.description === "" ||
                  menuItem.image === "" ||
                  menuItem.name === ""
                }
                onClick={handleNewMenuItem}
              >
                Create
              </Button>
            </Col>
            <Col>
              <Button onClick={resetMenuItem}>Cancel</Button>
            </Col>
          </Row>
        </>
      )}

      <ListGroup>
        {category.menuitems &&
          category.menuitems.map((menuitem) => (
            <ListGroupItem
              key={menuitem.id}
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(
                  `/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${categoryId}/menuitems/${menuitem.id}`
                )
              }
            >
              {menuitem.name}
            </ListGroupItem>
          ))}
      </ListGroup>
    </Container>
  );
};

const mapState = (state) => {
  const { category, isLoading } = state.category;
  return {
    isLoading,
    category,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData({ categoryId, menuId, restaurantId, corporationId }) {
      dispatch(fetchCategory(categoryId));
      // dispatch(fetchMenu(menuId));
      // dispatch(fetchRestaurant(restaurantId));
      // dispatch(fetchCorporation(corporationId));
    },
    addMenuItem(data) {
      dispatch(createMenuItem(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Category);
