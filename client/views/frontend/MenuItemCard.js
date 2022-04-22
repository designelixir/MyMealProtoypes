import React from "react";
import { connect } from "react-redux";
import { Container, Image, Row, Col } from "react-bootstrap";
import priceFormat from "../../utils/priceFormat";

const MenuItemCard = ({ menuitem }) => {
  return (
    <Container className="menuitem-card d-flex justify-content-between align-items-start">
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
      </Container>
      <Image
        className="menuitem-card-img"
        src={menuitem.image && menuitem.image.url}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemCard);
