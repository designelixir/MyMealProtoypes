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
} from "../../redux/reducers/category";
import MenuItemForm from "../formComponents/MenuItemForm";
import Divider from "../components/Divider";
import MoveAndDuplicateMenuitem from "../modals/MoveAndDuplicateMenuitem";
import EditCategory from "../modals/EditCategory";
const Category = ({
  getCategory,
  match,
  isLoading,
  category,
  addMenuItem,
  swapMenuitems,
  changeMenuitemArchived,
}) => {
  const history = useHistory();
  const { categoryId, restaurantId, corporationId, menuId } = match.params;

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
    <Container id="categoryComponent">
      
    
      <Row className="space-between-flex">
        <div>
        <div className="center-flex-start page-path-container">
        <div onClick={() => history.push("/")}>Dashboard</div> <p>&nbsp;/&nbsp;</p>
        <div onClick={() => history.push(`/corporations/${corporationId}`)}>{category.menu?.restaurant.corporation.name}</div> <p>&nbsp;/&nbsp;</p>
        <div onClick={() => history.push(`/corporations/${corporationId}/restaurants/${restaurantId}`)}>{category.menu?.restaurant.name}</div><p>&nbsp;/&nbsp;</p>
        <div onClick={() => history.push(`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}`)}>{category.menu?.name}</div> <p>&nbsp;/&nbsp;</p>
        <div className="active-breadcrumb">{category.name}</div>
      </div>
          <h1>Menu Items</h1>
        </div>

        <div>
          <EditCategory category={category} />
          <Button
            className="backend-styled-button"
            onClick={() => handleAddMenuItem(category.menu.allergies)}
            disabled={!!!category.menu}
          >
            + Add Menu Item
          </Button>
        </div>
      </Row>
      {creating && (
        <>
          <Container className="new-menu-item" key={menuItem.id}>
          <div className="space-between-flex">
            <h3>Create New Menu Item</h3>
            <Button  className="backend-styled-button" onClick={resetMenuItem}>Cancel - X</Button>
          </div>
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
          <div className="center-flex-start">
              <Button
              className="backend-styled-button"
                disabled={menuItem.description === "" || menuItem.name === ""}
                onClick={handleNewMenuItem}
              >
                Create
              </Button>
            
              <Button  className="backend-styled-button" onClick={resetMenuItem}>Cancel</Button>
            </div>
          </Container>

          
        </>
      )}

      <ListGroup>
        {menuitems.map((menuitem, idx) => (
          <div key={menuitem.id} action className="backend-menu-item space-between-flex" style={{opacity: `${menuitem.archived ? "0.25" : "1" }`, boxShadow: `${menuitem.archived ? "4px 4px gray" : "4px 4px green" }`}}>
              <div className="center-flex">
                <div style={{maxWidth: "20px", marginRight: "10px"}}>
                  {idx !== 0 && (
                    <Button
                      variant="link"
                      className="reposition-arrow"
                      onClick={() => {
                        handleReposition(idx, -1);
                      }}
                    >
                      &#9206;
                    </Button>
                  )}
                  {idx !== menuitems.length - 1 && (
                    <Button
                      className="reposition-arrow"
                      variant="link"
                      onClick={() => {
                        handleReposition(idx, 1);
                      }}
                    >
                      &#9207;
                    </Button>
                  )}
                </div>
                <div className="center-flex " style={{padding: "10px", textAlign: "left"}}>
                  <img
                    style={{ width: "auto", height: 100}}
                    src={
                      menuitem.image ? menuitem.image.url : "/icons/gallery.png"
                    }
                    className="img-fluid rounded shadow"
                  />
                  <p className="backend-item-title hover-text" onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${categoryId}/menuitems/${menuitem.id}`
            )
          }>{menuitem.name}</p>
                </div>
              </div>
              <div className="center-flex" >
            <div className="backend-styled-edit-button">
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
            <Button className="backend-styled-edit-button" onClick={() =>
            history.push(
              `/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${categoryId}/menuitems/${menuitem.id}`
            )
          }> &#9998; Edit

            </Button>
          </div>
          
          </div>
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

export default connect(mapState, mapDispatch)(Category);
