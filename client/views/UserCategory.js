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
import {
  createMenuItem,
  fetchCategory,
  swapMenuitemOrder,
  updateMenuitemArchived,
} from "../redux/reducers/category";
import MenuItemForm from "./formComponents/MenuItemForm";
import Divider from "./components/Divider";
import MoveAndDuplicateMenuitem from "./modals/MoveAndDuplicateMenuitem";
import EditCategory from "./modals/EditCategory";
const UserCategory = ({
  getCategory,
  match,
  isLoading,
  category,
  addMenuItem,
  swapMenuitems,
  changeMenuitemArchived,
}) => {
  const history = useHistory();
  const { categoryId, restaurantId, menuId } = match.params;

  const [menuitems, setMenuitems] = useState([]);
  useEffect(() => {
    getCategory({
      categoryId,
      cb(category) {
        setMenuitems(category.menuitems);
      },
    });
  }, []);
  const [creating, setCreating] = useState(false);
  const [allergyTypes, setAllergyTypes] = useState({});
  const [priceType, setPriceType] = useState("Single");
  const [priceTypes, setPriceTypes] = useState({ 0: { type: "", price: 0 } });
  const [menuitemImage, setMenuitemImage] = useState(undefined);
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
    description: "",
    ingredients: "",
    nutritionFacts: "",
    price: 0,
  };
  const [menuItem, setMenuItem] = useState(menuItemInit);
  const resetMenuItem = () => {
    setCreating(false);
    setMenuItem(menuItemInit);
  };
  const handleChangeMenuItem = ({ target: { name, value } }) => {
    if (name === "price") {
      value = value.replace(/[^\d]/g, "");
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
  const handleNewMenuItem = () => {
    resetMenuItem();
    const formData = new FormData();

    formData.append("file", menuitemImage);
    formData.append(
      "data",
      JSON.stringify({
        menuItem: { ...menuItem, position: menuitems.length },
        priceType,
        priceTypes,
        allergyTypes,
      })
    );

    addMenuItem({
      categoryId,
      body: formData,
      cb(category) {
        setMenuitems(category.menuitems);
      },
    });
  };
  const handleReposition = (idx, moveTo) => {
    swapMenuitems({
      categoryId,
      body: {
        menuitemOne: { id: menuitems[idx].id, position: idx + moveTo },
        menuitemTwo: { id: menuitems[idx + moveTo].id, position: idx },
      },
    });
    const newCats = [...menuitems];
    [newCats[idx], newCats[idx + moveTo]] = [
      newCats[idx + moveTo],
      newCats[idx],
    ];
    setMenuitems(newCats);
  };
  const handleChangeArchived = ({ checked, menuitemId }) => {
    changeMenuitemArchived({
      menuitemId,
      categoryId,
      body: {
        archived: checked,
      },
      cb(category) {
        setMenuitems(category.menuitems);
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
          {category.menu && category.menu.restaurant.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            history.push(`/restaurants/${restaurantId}/menus/${menuId}`)
          }
          style={{ color: "#4e66f8" }}
        >
          {category.menu && category.menu.name}
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="d-flex justify-content-start align-items-center">
        <h1 style={{ width: "fit-content" }}>{category.name}</h1>
        <EditCategory category={category} />
      </Row>
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
              handleChangeImage,
              menuitemImage,
            }}
            menuitemAllergies={category.menu ? category.menu.allergies : []}
            deleted={true}
          />
          <Row>
            <Col>
              <Button
                disabled={menuItem.description === "" || menuItem.name === ""}
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
        {menuitems.map((menuitem, idx) => (
          <ListGroupItem
            key={menuitem.id}
            className="d-flex justify-content-between align-items-center"
            action
            style={{ cursor: "pointer" }}
          >
            <Container
              onClick={() =>
                history.push(
                  `/restaurants/${restaurantId}/menus/${menuId}/categories/${categoryId}/menuitems/${menuitem.id}`
                )
              }
              style={{ cursor: "pointer" }}
            >
              <Row className="d-flex align-items-center">
                <Col
                  lg={3}
                  // style={{ width: 100 }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img
                    style={{ width: "auto", height: 50 }}
                    src={menuitem.image ? menuitem.image.url : ""}
                    className="img-fluid rounded shadow"
                  />
                </Col>
                <Col>{menuitem.name}</Col>
              </Row>
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
              {idx !== menuitems.length - 1 && (
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
                label={menuitem.archived ? "Archived" : "Active"}
                type="switch"
                checked={!menuitem.archived}
                onChange={({ target: { checked } }) =>
                  handleChangeArchived({
                    checked: !checked,
                    menuitemId: menuitem.id,
                  })
                }
              />
            </div>
            <MoveAndDuplicateMenuitem
              menuitemId={menuitem.id}
              menuCategories={category.menu.categories}
            />
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
    getCategory({ categoryId, cb }) {
      dispatch(fetchCategory({ categoryId, cb }));
    },
    addMenuItem(data) {
      dispatch(createMenuItem(data));
    },
    swapMenuitems(data) {
      dispatch(swapMenuitemOrder(data));
    },
    changeMenuitemArchived(data) {
      dispatch(updateMenuitemArchived(data));
    },
  };
};

export default connect(mapState, mapDispatch)(UserCategory);
