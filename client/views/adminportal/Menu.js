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
  updateCategoryArchived,
  uploadCSVFile,
} from "../../redux/reducers/menu";
import { fetchCorporation } from "../../redux/reducers/corporation";
import { fetchRestaurant } from "../../redux/reducers/restaurant";
import Divider from "../components/Divider";
import EditMenu from "../modals/EditMenu";
import { fetchAllergies } from "../../redux/reducers/allergy";
import CreateNewLocation from "../modals/CreateNewLocation";
import CreateNewCategory from "../modals/CreateNewCategory";

const Menu = ({
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
    <Container id="menuComponent">
     
      

      <Row className="space-between-flex">
        <div>
        <div className="center-flex-start page-path-container">
        <div onClick={() => history.push("/")}>Dashboard</div> <p>&nbsp;/&nbsp;</p>
        <div onClick={() => history.push(`/corporations/${corporationId}`)}>{menu.restaurant?.corporation.name}</div> <p>&nbsp;/&nbsp;</p>
        <div onClick={() =>history.push(`/corporations/${corporationId}/restaurants/${restaurantId}`)}>{menu.restaurant?.name}</div><p>&nbsp;/&nbsp;</p>
        <div className="active-breadcrumb" >{menu.name}</div>
      </div>
        <h1>Categories</h1>
        </div>
        
        <div style={{marginBottom: "10px"}}>
        <EditMenu menu={menu} allergies={allergies} />
        <CreateNewCategory
          {...{
            menuId,
            categories,
            setCategories,
          }}
        />
        </div>
         
      </Row>

      <ListGroup >
        {categories.map((category, idx) => (
          <Container
            className="backend-category"
            
            key={category.id}
            action
            style={{opacity: `${category.archived ? "0.25" : "1" }`, boxShadow: `${category.archived ? "4px 4px gray" : "4px 4px green" }`}}
          >
            <div style={{display: "flex", maxWidth: "25px", flexWrap: "wrap", margin: "0 10px"}}>
              {idx !== 0 && (
                <button
                  variant="link"
                  className="reposition-arrow"
                  onClick={() => {
                    handleReposition(idx, -1);
                  }}
                >
                  &#9650; 
                </button>
              )}
              {idx !== categories.length - 1 && (
                <button
                className="reposition-arrow"
                  variant="link"
                  onClick={() => {
                    handleReposition(idx, 1);
                  }}
                >
                  &#9660; 
                </button>
              )}
            </div>
            <Container
              className="backend-category-contents space-between-flex"
              
              >
              <p className="p2-text hover-text" onClick={() => history.push(`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${category.id}`)}>
                &nbsp; {category.name}
              </p>
              <div >
                <div className="center-flex">
                  <Form.Check
                className="backend-styled-edit-button"

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
              <Button className="backend-styled-edit-button" onClick={() => history.push(`/corporations/${corporationId}/restaurants/${restaurantId}/menus/${menuId}/categories/${category.id}`)}>
              &#9998;  Edit
              </Button>
                </div>
              
              
            </div>
            </Container>            
          </Container>
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

export default connect(mapState, mapDispatch)(Menu);
