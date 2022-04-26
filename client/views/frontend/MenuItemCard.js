import React from "react";
import { connect } from "react-redux";
import { Container, Image, Row, Col, Card } from "react-bootstrap";
import priceFormat from "../../utils/priceFormat";
import Icon from "./iconcomponents/Icon";
import classNames from "classnames";

//Green #189622 Red FF0000
const MenuItemCard = ({ menuitem, selectedAllergies }) => {
  const safeColor = "#189622";
  const modColor = "#ED9A00";

  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col
              className={classNames({
                "col-8": menuitem.image,
                "col-auto": !menuitem.image,
              })}
            >
              <Card.Title>{menuitem.name}</Card.Title>

              <Card.Text style={{ fontSize: 12, marginBottom: "0.5rem" }}>
                {menuitem.description}
              </Card.Text>
              <Container className="price-type p-0">
                {menuitem.pricetypes.length === 0 ? (
                  priceFormat(menuitem.price)
                ) : (
                  <Row className="d-flex justify-content-start align-items-start">
                    {menuitem.pricetypes.map((pt) => (
                      <Col key={pt.id} className="price-type">
                        {pt.type} - {priceFormat(pt.price)}
                      </Col>
                    ))}
                  </Row>
                )}
              </Container>
              <Container className="d-flex p-0 align-items-center flex-wrap">
                {menuitem.allergytypes
                  .filter(
                    (allergytype) =>
                      allergytype.allergyId in selectedAllergies &&
                      selectedAllergies[allergytype.allergyId].selected
                  )
                  .map((allergytype) => {
                    const isSafe = allergytype.type === "Safe";
                    const isMod = allergytype.type === "Modifiable";
                    const isCross = allergytype.cross;
                    const isCrossMod = allergytype.crossMod;

                    return (
                      <>
                        {" "}
                        <p
                          key={allergytype.id}
                          className="allergy-pill"
                          style={{
                            width: "fit-content",
                            color: "white",
                            backgroundColor: isSafe
                              ? safeColor
                              : isMod && modColor,
                          }}
                        >
                          {allergytype.allergy.name}
                          {isCross && (
                            <span style={{ color: "#FF0000" }}>*</span>
                          )}
                        </p>
                        {/* <Icon
                          fill={isSafe ? safeColor : modColor}
                          icon="grain"
                          cross={isCross}
                        /> */}
                      </>
                    );
                  })}
              </Container>
            </Col>
            <Col style={{ padding: 0 }} className="d-flex justify-content-end ">
              {menuitem.image && (
                <Image className="menuitem-card-img" src={menuitem.image.url} />
              )}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemCard);

{
  /* <Container className="menuitem-card d-flex justify-content-between align-items-start">
      <Container className="d-flex flex-column justify-content-start align-items-start">
        <h3>{menuitem.name}</h3>
        <p>{menuitem.description}</p>
        {menuitem.pricetypes.length === 0 ? (
          priceFormat(menuitem.price)
        ) : (
          <Row className="d-flex justify-content-start align-items-start">
            {menuitem.pricetypes.map((pt) => (
              <Col className="price-type">
                {pt.type} - {priceFormat(pt.price)}
              </Col>
            ))}
          </Row>
        )}
        {menuitem.allergytypes
          .filter(
            (allergytype) =>
              allergytype.allergyId in selectedAllergies &&
              selectedAllergies[allergytype.allergyId].selected
          )
          .map((allergytype) => {
            const isSafe = allergytype.type === "Safe";
            const isMod = allergytype.type === "Modifiable";
            const isCross = allergytype.cross;
            const isCrossMod = allergytype.crossMod;

            return (
              <p
                style={{
                  width: "fit-content",
                  color: isSafe ? "green" : isMod && "orange",
                }}
              >
                {allergytype.allergy.name}
                {isCross && <span style={{ color: "red" }}>*</span>}
              </p>
            );
          })}
      </Container>
      {menuitem.image && (
        <Image className="menuitem-card-img" src={menuitem.image.url} />
      )}
    </Container> */
}
