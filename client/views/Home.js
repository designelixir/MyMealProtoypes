import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { fetchAllergies } from "../redux/reducers/allergy";
import { createMenu, createMenuItem, fetchMenus } from "../redux/reducers/menu";

const Home = ({
  getAllergies,
  getMenus,
  menus,
  allergies,
  saveMenu,
  createItem,
  menuItems,
}) => {
  useEffect(() => {
    getAllergies();
    getMenus();
  }, []);
  const [menuData, setMenuData] = useState({
    name: "",
    allergyIds: {},
  });

  const [menuItemData, setMenuItemData] = useState({
    name: "",
    image: "",
    description: "",
    price: 0,
  });
  const handleCreateMenu = () => {
    const { name, allergyIds } = menuData;
    const ids = Object.keys(allergyIds).reduce((ids, id) => {
      if (allergyIds[id]) {
        ids.push(id);
      }
      return ids;
    }, []);
    saveMenu({ data: { name }, allergyIds: ids });
  };
  const handleChangeMenuItem = ({ target }) => {
    const { name, value } = target;
    setMenuItemData({
      ...menuItemData,
      [name]: value,
    });
  };
  const [allergyTypes, setAllergyTypes] = useState({});
  const handleChangeAllergyTypes = ({ target }) => {
    const { name, id, value } = target;
    setAllergyTypes({
      ...allergyTypes,
      [id]: {
        ...allergyTypes[id],
        [name]: value,
      },
    });
  };
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const handleSelect = (allergy) => {
    setSelectedAllergies([...selectedAllergies, allergy]);
  };
  const handleCreate = () => {
    createItem({ menuItemData, allergyTypes });
  };

  return (
    <Container>
      <h1 className="wtf">Create Menu</h1>
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
      <h1>Menus</h1>
      {menus.map((menu) => (
        <Link to={`/menus/${menu.id}`}>{menu.name}</Link>
      ))}
      {/* {menuItems.map((menuItem) => {
        const { allergytypes, name, priceFormatted, description } = menuItem;
        return (
          <Container>
            <Row>
              <Col>{name}</Col>
              <Col>{priceFormatted}</Col>
              <Col>{description}</Col>
            </Row>
            {allergytypes.map((allergytype) => {
              const { allergy, type, modDescription, crossDescription } =
                allergytype;
              const description = modDescription || crossDescription || "";
              return (
                <Row>
                  <Col>{allergy.name}</Col>
                  <Col>{type}</Col>
                  <Col>{description}</Col>
                </Row>
              );
            })}
          </Container>
        );
      })} */}
      <h1>Menu Item</h1>
      <FloatingLabel label="Name" className="d-flex mb-3">
        <Form.Control
          type="text"
          name="name"
          value={menuItemData.name}
          onChange={handleChangeMenuItem}
        />
      </FloatingLabel>
      <FloatingLabel label="Image" className="d-flex mb-3">
        <Form.Control
          type="text"
          name="image"
          value={menuItemData.image}
          onChange={handleChangeMenuItem}
        />
      </FloatingLabel>
      <FloatingLabel label="Description" className="d-flex mb-3">
        <Form.Control
          type="text"
          name="description"
          value={menuItemData.description}
          onChange={handleChangeMenuItem}
        />
      </FloatingLabel>
      <FloatingLabel label="Price" className="d-flex mb-3">
        <Form.Control
          type="number"
          name="price"
          value={menuItemData.price}
          onChange={handleChangeMenuItem}
        />
      </FloatingLabel>
      <h1>Allergies</h1>
      {allergies.map((allergy) => (
        <Button
          onClick={() => handleSelect(allergy)}
          disabled={selectedAllergies.find(({ id }) => id === allergy.id)}
        >
          {allergy.name}
        </Button>
      ))}
      <h1>Selected Allergies</h1>
      {selectedAllergies.map((allergy) => (
        <Row className="d-flex justify-content-between align-items-start">
          <Col>
            <p>{allergy.name}</p>
          </Col>
          <Col>
            <Form.Select
              name="type"
              id={allergy.id}
              value={allergyTypes[allergy.id] && allergyTypes[allergy.id].type}
              className="d-flex mb-3"
              onChange={handleChangeAllergyTypes}
            >
              {["Unsafe", "Modifiable", "Cross Contaminated"].map(
                (option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                )
              )}
            </Form.Select>
          </Col>
          <Col>
            {allergyTypes[allergy.id] &&
              allergyTypes[allergy.id].type !== "Unsafe" && (
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  id={allergy.id}
                  value={
                    allergyTypes[allergy.id] &&
                    allergyTypes[allergy.id].description
                  }
                  onChange={handleChangeAllergyTypes}
                />
              )}
          </Col>
        </Row>
      ))}
      <Button onClick={handleCreate}>Create</Button>
    </Container>
  );
};

const mapState = (state) => {
  const { allergies } = state.allergy;
  const { menus, menuItems } = state.menu;
  return {
    allergies,
    menus,
    menuItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllergies() {
      dispatch(fetchAllergies());
    },
    getMenus() {
      dispatch(fetchMenus());
    },
    saveMenu(body) {
      dispatch(createMenu(body));
    },
    createItem(body) {
      dispatch(createMenuItem(body));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
