import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import menuitemFilter from "../../utils/menuitemFilter";
import MenuItemCard from "./MenuItemCard";

const MenuItems = ({ primaryColor, selectedAllergies, categories }) => {
  // const { safeMenuitems, modMenuitems } = menuitemFilter(
  //   category.menuitems,
  //   selectedAllergies
  // );

  const allItems = categories.map(({ name, menuitems }) => {
    const filteredMenuitems = menuitemFilter(menuitems, selectedAllergies);
    return {
      categoryName: name,
      filteredMenuitems,
    };
  });

  return (
    <Container className="p-0">
      {allItems.some((item) => item.filteredMenuitems.length > 0) ? (
        allItems.map(
          (item) =>
            item.filteredMenuitems.length > 0 && (
              <Container className="d-flex flex-column p-0">
                <h3 className="mt-3" id={item.categoryName}>
                  {item.categoryName}
                </h3>
                <Container className="menuitem-container p-0">
                  {item.filteredMenuitems.map(({ type, menuitem }) => (
                    <MenuItemCard
                      key={menuitem.id}
                      type={type}
                      menuitem={menuitem}
                      primaryColor={primaryColor}
                      selectedAllergies={selectedAllergies}
                    />
                  ))}
                </Container>
              </Container>
            )
        )
      ) : (
        <p style={{ width: "100%", textAlign: "center" }}>No Items</p>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { selectedAllergies } = state.frontend;
  return {
    selectedAllergies,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
