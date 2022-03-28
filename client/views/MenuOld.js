import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { fetchMenu } from "../redux/reducers/menu";

const Menu = ({ getMenu, match, menu }) => {
  const { menuId } = match.params;
  useEffect(() => {
    getMenu(menuId);
  }, []);

  const [categories, setCategories] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const handleNewCategory = () => {
    setCategories({ ...categories, [newCategory]: [] });
    setNewCategory("");
  };
  const menuItemInit = {
    name: "",
    image: "",
    description: "",
    price: 0,
  };
  const [allergyTypes, setAllergyTypes] = useState({});
  const handleAddMenuItem = (categoryName, menuAllergies) => {
    const menuItems = categories[categoryName];
    menuItems.push(menuItemInit);
    const thing = {};
    for (const { name } of menuAllergies) {
      thing[name] = {
        type: "Safe",
        cross: false,
        modDescription: "",
        crossDescription: "",
      };
    }
    setAllergyTypes({
      ...allergyTypes,
      [`${categoryName}-${menuItems.length - 1}`]: thing,
    });
  };
  const handleChangeAllergyTypes = (key, allergyName, name, value) => {
    let newValues = {};
    if (name === "type" && value === "Unsafe") {
      newValues = {
        ...allergyTypes[key][allergyName],
        [name]: value,
        cross: false,
      };
    } else {
      newValues = {
        ...allergyTypes[key][allergyName],
        [name]: value,
      };
    }
    setAllergyTypes({
      ...allergyTypes,
      [key]: {
        ...allergyTypes[key],
        [allergyName]: newValues,
      },
    });
  };
  if (!menu.allergies) {
    return <></>;
  }
  return (
    <Container>
      <h1>{menu.name}</h1>
      <Row>
        {menu.allergies.map((allergy) => (
          <Col>{allergy.name}</Col>
        ))}
      </Row>
      <Row className="d-flex justify-content-start">
        <Col>
          <h2>Categories</h2>
        </Col>
        <Col>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={newCategory}
                placeholder="Name"
                onChange={({ target: { value } }) => setNewCategory(value)}
              />
            </Col>
            <Col>
              <Button onClick={handleNewCategory}>Add New</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Container>
        {Object.keys(categories).map((categoryName) => (
          <Container>
            <Row>
              <Col>
                <h3>{categoryName}</h3>
              </Col>
              <Col>
                <Button
                  onClick={() =>
                    handleAddMenuItem(categoryName, menu.allergies)
                  }
                >
                  Add Menu Item
                </Button>
              </Col>
            </Row>
            <Container>
              {categories[categoryName].map((menuItem, idx) => (
                <Container className="d-flex flex-column">
                  <Row>
                    <Col>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="name"
                        value={categories[categoryName][idx].name}
                        onChange={({ target: { value } }) => {
                          categories[categoryName][idx].name = value;
                          setCategories({ ...categories });
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        name="image"
                        placeholder="image"
                        value={categories[categoryName][idx].image}
                        onChange={({ target: { value } }) => {
                          categories[categoryName][idx].image = value;
                          setCategories({ ...categories });
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        name="description"
                        placeholder="description"
                        value={categories[categoryName][idx].description}
                        onChange={({ target: { value } }) => {
                          categories[categoryName][idx].description = value;
                          setCategories({ ...categories });
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="price"
                        value={categories[categoryName][idx].price}
                        onChange={({ target: { value } }) => {
                          categories[categoryName][idx].price = value;
                          setCategories({ ...categories });
                        }}
                      />
                    </Col>
                  </Row>
                  <Container className="d-flex flex-column">
                    {menu.allergies.map((allergy) => (
                      <Container>
                        <Row>
                          <Col>{allergy.name}</Col>
                          <Col>
                            {["Safe", "Modifiable", "Unsafe"].map((type) => (
                              <Form.Check
                                inline
                                label={type}
                                id={type}
                                name={`${categoryName}-${idx}-${allergy.name}`}
                                type="radio"
                                checked={
                                  allergyTypes[`${categoryName}-${idx}`][
                                    allergy.name
                                  ].type === type
                                }
                                onChange={() =>
                                  handleChangeAllergyTypes(
                                    `${categoryName}-${idx}`,
                                    allergy.name,
                                    "type",
                                    type
                                  )
                                }
                              />
                            ))}
                          </Col>
                          <Col>
                            <Form.Check
                              inline
                              label="Cross Contaminated"
                              id="Cross Contaminated"
                              disabled={
                                allergyTypes[`${categoryName}-${idx}`][
                                  allergy.name
                                ].type === "Unsafe"
                              }
                              name={`${categoryName}-${idx}-${allergy.name}`}
                              type="checkbox"
                              checked={
                                allergyTypes[`${categoryName}-${idx}`][
                                  allergy.name
                                ].cross
                              }
                              onChange={({ target: { checked } }) =>
                                handleChangeAllergyTypes(
                                  `${categoryName}-${idx}`,
                                  allergy.name,
                                  "cross",
                                  checked
                                )
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          {allergyTypes[`${categoryName}-${idx}`][allergy.name]
                            .type === "Modifiable" && (
                            <Col>
                              <Form.Control
                                as="textarea"
                                name="modDescription"
                                placeholder="Modification Description"
                                rows={3}
                                value={
                                  allergyTypes[allergy.id] &&
                                  allergyTypes[allergy.id].description
                                }
                                onChange={({ target: { value, name } }) =>
                                  handleChangeAllergyTypes(
                                    `${categoryName}-${idx}`,
                                    allergy.name,
                                    name,
                                    value
                                  )
                                }
                              />
                            </Col>
                          )}
                          {allergyTypes[`${categoryName}-${idx}`][allergy.name]
                            .cross && (
                            <Col>
                              <Form.Control
                                as="textarea"
                                name="crossDescription"
                                placeholder="Cross Contamination Procedure"
                                rows={3}
                                value={
                                  allergyTypes[`${categoryName}-${idx}`][
                                    allergy.name
                                  ].crossDescription
                                }
                                onChange={({ target: { value, name } }) =>
                                  handleChangeAllergyTypes(
                                    `${categoryName}-${idx}`,
                                    allergy.name,
                                    name,
                                    value
                                  )
                                }
                              />
                            </Col>
                          )}
                        </Row>
                      </Container>
                    ))}
                  </Container>
                </Container>
              ))}
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

const mapState = (state) => {
  const { menu } = state.menu;
  return {
    menu,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMenu(menuId) {
      dispatch(fetchMenu(menuId));
    },
  };
};

export default connect(mapState, mapDispatch)(Menu);
