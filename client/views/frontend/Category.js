import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { fetchFrontendCategoryMenuitems } from "../../redux/reducers/frontend";
import menuitemFilter from "../../utils/menuitemFilter";
import MenuItemCard from "./MenuItemCard";

export const Category = ({
  category,
  getMenuitems,
  selectedAllergies,
  primaryColor,
  categoryRef,
}) => {
  const [filteredMenuitems, setFilteredMenuitems] = useState([]);
  const [unfilteredMenuitems, setUnfilteredMenuitems] = useState([]);
  useEffect(() => {
    getMenuitems({
      categoryId: category.id,
      cb(menuitems) {
        setUnfilteredMenuitems(menuitems);
        setFilteredMenuitems(menuitemFilter(menuitems, selectedAllergies));
      },
    });
  }, []);
  useEffect(() => {
    if (!unfilteredMenuitems.length) return;
    setFilteredMenuitems(
      menuitemFilter(unfilteredMenuitems, selectedAllergies)
    );
  }, [selectedAllergies]);
  return (
    <Container className="p-0">
      {
        <Container className="d-flex flex-column p-0">
          <h3 className="mt-3" id={category.name} ref={categoryRef}>
            {category.name}
          </h3>
          <Container className="menuitem-container p-0">
            {filteredMenuitems.length > 0 ? (
              filteredMenuitems.map(({ type, menuitem }) => (
                <MenuItemCard
                  key={menuitem.id}
                  type={type}
                  menuitem={menuitem}
                  primaryColor={primaryColor}
                  selectedAllergies={selectedAllergies}
                />
              ))
            ) : (
              <p style={{ width: "100%", textAlign: "center" }}>No Items</p>
            )}
          </Container>
        </Container>
      }
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { selectedAllergies } = state.frontend;
  return {
    selectedAllergies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenuitems(data) {
      dispatch(fetchFrontendCategoryMenuitems(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
