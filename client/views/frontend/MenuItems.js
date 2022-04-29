import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import menuitemFilter from "../../utils/menuitemFilter";
import MenuItemCard from "./MenuItemCard";

const MenuItems = ({ primaryColor, category, selectedAllergies }) => {
  const { safeMenuitems, modMenuitems } = menuitemFilter(
    category.menuitems,
    selectedAllergies
  );
  const [showSafe, setShowSafe] = useState(true);
  useEffect(() => {
    setShowSafe(safeMenuitems.length > 0);
  }, [category]);
  return (
    <div>
      <Container
        style={{ border: `1px solid ${primaryColor}` }}
        className="mod-toggle d-flex justify-content-center align-items-center"
      >
        <p
          style={
            showSafe
              ? {
                  backgroundColor: primaryColor,
                  borderRadius: "2rem",
                  color: "white",
                }
              : {}
          }
          onClick={() => setShowSafe(true)}
        >
          Meets Restrictions
        </p>
        <p
          style={
            !showSafe
              ? {
                  backgroundColor: primaryColor,
                  borderRadius: "2rem",
                  color: "white",
                }
              : {}
          }
          onClick={() => setShowSafe(false)}
        >
          Needs Modification
        </p>
      </Container>
      <Container className="menuitem-container">
        {showSafe ? (
          safeMenuitems.length ? (
            safeMenuitems.map((menuitem) => (
              <MenuItemCard
                key={menuitem.id}
                menuitem={menuitem}
                primaryColor={primaryColor}
                selectedAllergies={selectedAllergies}
              />
            ))
          ) : (
            <p>No Items</p>
          )
        ) : modMenuitems.length ? (
          modMenuitems.map((menuitem) => (
            <MenuItemCard
              key={menuitem.id}
              primaryColor={primaryColor}
              menuitem={menuitem}
              selectedAllergies={selectedAllergies}
            />
          ))
        ) : (
          <p>No Items</p>
        )}
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
