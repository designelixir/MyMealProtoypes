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
    const { safeMenuitems, modMenuitems } = menuitemFilter(
      menuitems,
      selectedAllergies
    );
    return {
      categoryName: name,
      safeMenuitems,
      modMenuitems,
    };
  });
  const [showSafe, setShowSafe] = useState(true);
  useEffect(() => {
    setShowSafe(allItems.some((item) => item.safeMenuitems.length > 0));
  }, []);
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
      <Container className="p-0">
        {showSafe ? (
          allItems.some((item) => item.safeMenuitems.length > 0) ? (
            allItems.map(
              (item) =>
                item.safeMenuitems.length > 0 && (
                  <Container className="d-flex flex-column p-0">
                    <h3 className="mt-3" id={item.categoryName}>
                      {item.categoryName}
                    </h3>
                    <Container className="menuitem-container">
                      {item.safeMenuitems.map((menuitem) => (
                        <MenuItemCard
                          key={menuitem.id}
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
          )
        ) : allItems.some((item) => item.modMenuitems.length > 0) ? (
          allItems.map(
            (item) =>
              item.modMenuitems.length > 0 && (
                <Container className="d-flex flex-column p-0">
                  <h3 className="mt-3" id={item.categoryName}>
                    {item.categoryName}
                  </h3>
                  <Container className="menuitem-container">
                    {item.modMenuitems.map((menuitem) => (
                      <MenuItemCard
                        key={menuitem.id}
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
