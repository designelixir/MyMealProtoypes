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
import { Link, useHistory } from "react-router-dom";
import {
  fetchMenuItem,
  removeMenuitemImage,
  updateMenuItem,
} from "../redux/reducers/menuitem";
import Divider from "./components/Divider";
import MenuItemForm from "./formComponents/MenuItemForm";
const MenuItem = ({
  getMenuItem,
  match,
  isLoading,
  menuitem,
  changeMenuItem,
  deleteImage,
}) => {
  const history = useHistory();
  const { menuitemId, categoryId, restaurantId, corporationId, menuId } =
    match.params;
  const [allergyTypes, setAllergyTypes] = useState(undefined);
  const [priceType, setPriceType] = useState("Single");
  const [priceTypes, setPriceTypes] = useState({ 0: { type: "", price: 0 } });
  const [menuitemImage, setMenuitemImage] = useState(undefined);
  const [deleted, setDeleted] = useState(true);
  const [menuItem, setMenuItem] = useState({
    name: "",
    price: 0,
    description: "",
    ingredients: "",
    nutritionFacts: "",
  });

  useEffect(() => {
    getMenuItem({
      menuitemId,
      cb(menuitem) {
        handleAddAllergyTypes(
          menuitem.category.menu.allergies,
          menuitem.allergytypes
        );
        setMenuItem({
          name: menuitem.name,
          price: menuitem.price,
          description: menuitem.description,
          ingredients: menuitem.ingredients,
          nutritionFacts: menuitem.nutritionFacts,
        });
        if (menuitem.image) {
          setMenuitemImage({ preview: menuitem.image.url });
          setDeleted(false);
        }
        setPriceType(menuitem.type);
        if (menuitem.pricetypes.length) {
          setPriceTypes(
            menuitem.pricetypes.reduce((pts, pt, idx) => {
              pts[idx] = { price: pt.price, type: pt.type };
              return pts;
            }, {})
          );
        }
      },
    });
  }, []);

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
  const handleAddAllergyTypes = (menuAllergies, menuitemAllergyTypes) => {
    const allergies = {};
    const allergyTypesObj = {};
    for (const { id } of menuAllergies) {
      allergies[id] = {
        type: "Safe",
        cross: false,
        crossMod: false,
        modDescription: "",
        crossDescription: "",
        crossModDescription: "",
      };
    }
    for (const allergyType of menuitemAllergyTypes) {
      allergyTypesObj[allergyType.allergyId] = {
        type: allergyType.type,
        cross: allergyType.cross,
        crossMod: allergyType.crossMod,
        modDescription: allergyType.modDescription,
        crossDescription: allergyType.crossDescription,
        crossModDescription: allergyType.crossModDescription,
      };
    }
    setAllergyTypes(Object.assign(allergies, allergyTypesObj));
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

  const handleChangeMenuItem = ({ target: { name, value } }) => {
    if (name === "price") {
      value = value.replace(/[^\d]/g, "");
      if (value === "") {
        value = 0;
      }
    }
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleChangeImage = ({ target: { files } }) => {
    setMenuitemImage(
      Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
      })
    );
  };
  const handleDeleteImage = () => {
    setDeleted(true);
    setMenuitemImage(undefined);
    deleteImage(menuitemId);
  };
  const handleUpdateMenuItem = () => {
    const formData = new FormData();

    if (menuitemImage) {
      formData.append("file", menuitemImage);
    }
    formData.append(
      "data",
      JSON.stringify({ menuItem, priceType, priceTypes, allergyTypes })
    );

    // addMenuItem({
    //   categoryId,
    //   body: formData,
    // });
    changeMenuItem({
      menuitemId,
      body: formData,
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
          {menuitem.category &&
            menuitem.category.menu.restaurant.corporation.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {menuitem.category && menuitem.category.menu.restaurant.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {menuitem.category && menuitem.category.menu.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${categoryId}`
            )
          }
          style={{ color: "#4e66f8" }}
        >
          {menuitem.category && menuitem.category.name}
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{menuitem.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{menuitem.name}</h1>
      <Divider />
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
          handleChangeImage,
          menuitemImage,
          deleted,
          handleDeleteImage,
        }}
        menuitemAllergies={
          menuitem.category && allergyTypes
            ? menuitem.category.menu.allergies
            : []
        }
      />
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            disabled={
              menuItem.description === "" ||
              menuItem.image === "" ||
              menuItem.name === ""
            }
            onClick={handleUpdateMenuItem}
          >
            Update
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const mapState = (state) => {
  const { menuitem, isLoading } = state.menuitem;
  return {
    isLoading,
    menuitem,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMenuItem(data) {
      dispatch(fetchMenuItem(data));
    },
    changeMenuItem(data) {
      dispatch(updateMenuItem(data));
    },
    deleteImage(menuitemId) {
      dispatch(removeMenuitemImage(menuitemId));
    },
  };
};

export default connect(mapState, mapDispatch)(MenuItem);
