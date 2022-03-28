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
import { createMenuItem, fetchCategory } from "../redux/reducers/category";
import { fetchCorporation } from "../redux/reducers/corporation";
import { fetchRestaurant } from "../redux/reducers/restaurant";

const Category = ({
  getData,
  match,
  category,
  menu,
  restaurant,
  corporation,
  addMenuItem,
}) => {
  const history = useHistory();
  const { categoryId, restaurantId, corporationId, menuId } = match.params;
  useEffect(() => {
    getData({ categoryId, menuId, restaurantId, corporationId });
  }, []);
  const [creating, setCreating] = useState(false);
  const [allergyTypes, setAllergyTypes] = useState({});
  const handleAddMenuItem = (menuAllergies) => {
    const thing = {};
    for (const { id } of menuAllergies) {
      thing[id] = {
        type: "Safe",
        cross: false,
        modDescription: "",
        crossDescription: "",
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
    addMenuItem({ categoryId, body: { menuItem, allergyTypes } });
  };
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
          {corporation.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {restaurant.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {menu.name}
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{category.name}</h1>

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
        <Container className="d-flex flex-column">
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={menuItem.name}
                onChange={handleChangeMenuItem}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="image"
                placeholder="image"
                value={menuItem.image}
                onChange={handleChangeMenuItem}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="description"
                placeholder="description"
                value={menuItem.description}
                onChange={handleChangeMenuItem}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                name="price"
                placeholder="price"
                value={menuItem.price}
                onChange={handleChangeMenuItem}
              />
            </Col>
          </Row>
          <Container className="d-flex flex-column">
            {category.menu &&
              category.menu.allergies.map((allergy) => (
                <Container>
                  <Row>
                    <Col>{allergy.name}</Col>
                    <Col>
                      {["Safe", "Modifiable", "Unsafe"].map((type) => (
                        <Form.Check
                          inline
                          label={type}
                          name={allergy.name}
                          type="radio"
                          value={type}
                          checked={allergyTypes[allergy.id].type === type}
                          onChange={() =>
                            handleChangeAllergyTypes(allergy.id, "type", type)
                          }
                        />
                      ))}
                    </Col>
                    <Col>
                      <Form.Check
                        inline
                        label="Cross Contaminated"
                        disabled={allergyTypes[allergy.id].type === "Unsafe"}
                        name={allergy.name}
                        type="checkbox"
                        checked={allergyTypes[allergy.id].cross}
                        onChange={({ target: { checked } }) =>
                          handleChangeAllergyTypes(allergy.id, "cross", checked)
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    {allergyTypes[allergy.id].type === "Modifiable" && (
                      <Col>
                        <Form.Control
                          as="textarea"
                          name="modDescription"
                          placeholder="Modification Description"
                          rows={3}
                          value={allergyTypes[allergy.id].modDescription}
                          onChange={({ target: { value, name } }) =>
                            handleChangeAllergyTypes(allergy.id, name, value)
                          }
                        />
                      </Col>
                    )}
                    {allergyTypes[allergy.id].cross && (
                      <Col>
                        <Form.Control
                          as="textarea"
                          name="crossDescription"
                          placeholder="Cross Contamination Procedure"
                          rows={3}
                          value={allergyTypes[allergy.id].crossDescription}
                          onChange={({ target: { value, name } }) =>
                            handleChangeAllergyTypes(allergy.id, name, value)
                          }
                        />
                      </Col>
                    )}
                  </Row>
                </Container>
              ))}
          </Container>
          <Row>
            <Col>
              <Button
                disabled={
                  menuItem.description === "" ||
                  menuItem.image === "" ||
                  menuItem.name === "" ||
                  menuItem.price === 0
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
        </Container>
      )}
      {category.menuitems &&
        category.menuitems.map((menuitem) => (
          <Container>
            <Link to={`/menuitems/${menuitem.id}`}>{menuitem.name}</Link>
          </Container>
        ))}
    </Container>
  );
};

const mapState = (state) => {
  const { category } = state.category;
  const { menu } = state.menu;
  const { restaurant } = state.restaurant;
  const { corporation } = state.corporation;
  return {
    category,
    menu,
    restaurant,
    corporation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData({ categoryId, menuId, restaurantId, corporationId }) {
      dispatch(fetchCategory(categoryId));
      dispatch(fetchCorporation(corporationId));
      dispatch(fetchRestaurant(restaurantId));
      dispatch(fetchMenu(menuId));
    },
    addMenuItem(data) {
      dispatch(createMenuItem(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Category);
