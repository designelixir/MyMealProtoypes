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
                placeholder="Image"
                value={menuItem.image}
                onChange={handleChangeMenuItem}
              />
            </Col>
            <Container>
              <Form.Control
                type="textarea"
                as="textarea"
                name="description"
                placeholder="Description"
                value={menuItem.description}
                onChange={handleChangeMenuItem}
              />
            </Container>
          </Row>
          <Row>
            <Col>
              {["Single", "Variation"].map((type) => (
                <Form.Check
                  inline
                  label={type}
                  type="radio"
                  value={type}
                  checked={priceType === type}
                  onChange={({ target: { value } }) => setPriceType(value)}
                />
              ))}
            </Col>
            <Container>
              {priceType === "Single" ? (
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="price"
                  value={menuItem.price}
                  onChange={handleChangeMenuItem}
                />
              ) : (
                (() => {
                  const pts = Object.values(priceTypes);
                  return pts.map((pt, idx) => (
                    <>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            name="type"
                            placeholder="Type"
                            value={pt.type}
                            onChange={({ target: { name, value } }) =>
                              handleChangePriceTypes({ name, value, idx })
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={pt.price}
                            onChange={({ target: { name, value } }) =>
                              handleChangePriceTypes({ name, value, idx })
                            }
                          />
                        </Col>
                        {idx !== 0 && (
                          <Col lg={1}>
                            <Button onClick={() => handleRemovePriceTypes(idx)}>
                              -
                            </Button>
                          </Col>
                        )}
                      </Row>
                      {idx === pts.length - 1 && (
                        <Button onClick={() => handleAddPriceTypes(pts.length)}>
                          +
                        </Button>
                      )}
                    </>
                  ));
                })()
              )}
            </Container>
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
        </Container>
      )}
      {category.menuitems &&
        category.menuitems.map((menuitem) => (
          <Container>
            <Link
              to={`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${categoryId}/menuitems/${menuitem.id}`}
            >
              {menuitem.name}
            </Link>
          </Container>
        ))}
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
