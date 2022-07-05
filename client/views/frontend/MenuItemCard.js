import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Image, Row, Col, Card } from "react-bootstrap";
import priceFormat from "../../utils/priceFormat";
import Icon from "./iconcomponents/Icon";
import classNames from "classnames";
import Exclamation from "./iconcomponents/Exclamation";
import MenuItemDescription from "./modals/MenuItemDescription.js";
import MenuItemCardImg from "./MenuItemCardImg";
import { capitalize } from "../../utils/common";
import mixpanel from 'mixpanel-browser';

//Green #189622 Red FF0000
const MenuItemCard = ({ menuitem, type, selectedAllergies, primaryColor }) => {
  const safeColor = "#007B2A";
  const modColor = "#FF7800";
  // const initDescriptions = {
  //   id: undefined,
  //   modDescription: "",
  //   crossDescription: "",
  //   crossModDescription: "",
  // };
  // const [descriptions, setDescriptions] = useState(initDescriptions);
  const [modalShow, setModalShow] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Card
      className="mb-3 menuitem-card"
      onClick={function() {
        !modalShow && setModalShow(true)
        mixpanel.track('Clicked Menu Item', {
          'Menu Item Name': menuitem.name
        })
      }}
      style={{
        border: `3px solid ${type === "Safe" ? safeColor : modColor}`,
      }}
    >
      {menuitem.image && <MenuItemCardImg url={menuitem.image.url} />}

      <Card.Body>

        <Container>

          <Card.Title style={{ fontSize: "1.5rem" }}>
            {menuitem.name}
          </Card.Title>

          <Card.Text style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>
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
                  <p
                    key={allergytype.id}
                    className={classNames("allergy-pill", {
                      "allergy-padding": !isCross && !isMod,
                      "allergy-padding-cross": isCross || isMod,
                    })}
                    style={{
                      // width: "fit-content",
                      color: "white",
                      backgroundColor: isSafe ? safeColor : isMod && modColor,
                      display: "flex",
                      flexShrink: 0,
                    }}
                  >
                    {(() => {
                      const details = isMod ? "Free Option" : "Free";
                      const carrot = isMod || isCross ? " >" : "";
                      return `${capitalize(
                        allergytype.allergy.name
                      )} ${details}${carrot}`;
                    })()}

                    {isCross ? (
                      <Exclamation fill={"#FF0000"} />
                    ) : (
                      isMod && <Exclamation fill={modColor} />
                    )}
                  </p>
                );
              })}
          </Container>

          <MenuItemDescription
            {...{
              modalShow,
              setModalShow,
              menuitem,
              primaryColor,
              selectedAllergies,
              safeColor,
              modColor,
            }}
          />

          {/* <Row>
            <Col
              className={classNames({
                "col-8": menuitem.image,
                "col-auto": !menuitem.image,
              })}
            >

            </Col> */}
          {/* <Col style={{ padding: 0 }} className="d-flex justify-content-end ">
              {menuitem.image && (
                <div
                  className="menuitem-card-img"
                  style={{
                    backgroundImage: `url(${menuitem.image.url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              )}
            </Col> */}
          {/* </Row> */}
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
