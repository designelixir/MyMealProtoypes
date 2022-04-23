import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import menuitemFilter from "../../utils/menuitemFilter";
import MenuItemCard from "./MenuItemCard";

const MenuItems = ({ category, selectedAllergies }) => {
  const { safeMenuitems, modMenuitems } = menuitemFilter(
    category.menuitems,
    selectedAllergies
  );
  return (
    <div>
      <p>Safe</p>
      <Container className="menuitem-container">
        {safeMenuitems.map((menuitem) => (
          <MenuItemCard
            menuitem={menuitem}
            selectedAllergies={selectedAllergies}
          />
        ))}
      </Container>
      <p>Mod</p>
      <Container className="menuitem-container">
        {modMenuitems.map((menuitem) => (
          <MenuItemCard
            menuitem={menuitem}
            selectedAllergies={selectedAllergies}
          />
        ))}
      </Container>
    </div>
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
