import React from "react";
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
import Divider from "../components/Divider";

const MenuItemForm = ({
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
  menuitemAllergies,
}) => {
  return (
    <>
      <Form.Label>Name</Form.Label>
      <Form.Control
        className="mb-3"
        type="text"
        name="name"
        placeholder="Name"
        value={menuItem.name}
        onChange={handleChangeMenuItem}
      />
      <Form.Label>Image</Form.Label>
      <Form.Control
        className="mb-3"
        type="text"
        name="image"
        placeholder="Image"
        value={menuItem.image}
        onChange={handleChangeMenuItem}
      />
      <Form.Label>Description</Form.Label>

      <Form.Control
        className="mb-3"
        type="textarea"
        as="textarea"
        name="description"
        placeholder="Description"
        value={menuItem.description}
        onChange={handleChangeMenuItem}
      />

      <Row className="mb-3">
        <Col>
          <Form.Label className="me-3">Price</Form.Label>
          <Form.Check
            inline
            label={priceType}
            type="switch"
            checked={priceType === "Variation"}
            onChange={({ target: { checked } }) =>
              setPriceType(checked ? "Variation" : "Single")
            }
          />
        </Col>
        <Container>
          {priceType === "Single" ? (
            <Form.Control
              type="number"
              name="price"
              placeholder="price"
              value={menuItem.price}
              onChange={handleChangeMenuItem}
            />
          ) : (
            (() => {
              const pts = Object.values(priceTypes);
              return pts.map((pt, idx) => (
                <div key={idx}>
                  <Row className="mb-2">
                    <Col>
                      <Form.Control
                        type="text"
                        name="type"
                        placeholder="Type"
                        value={pt.type}
                        onChange={({ target: { name, value } }) =>
                          handleChangePriceTypes({ name, value, idx })
                        }
                      />
                    </Col>
                    <Col className="d-flex">
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={pt.price}
                        onChange={({ target: { name, value } }) =>
                          handleChangePriceTypes({ name, value, idx })
                        }
                      />
                      {idx !== 0 && (
                        <Button
                          className="ms-2"
                          onClick={() => handleRemovePriceTypes(idx)}
                        >
                          -
                        </Button>
                      )}
                    </Col>
                  </Row>

                  {idx === pts.length - 1 && (
                    <Row>
                      <Col className="d-flex justify-content-end">
                        <Button onClick={() => handleAddPriceTypes(pts.length)}>
                          +
                        </Button>
                      </Col>
                    </Row>
                  )}
                </div>
              ));
            })()
          )}
        </Container>
      </Row>

      <h3>Allergy types</h3>
      <ListGroup className="mb-3">
        {menuitemAllergies.map((allergy) => (
          <ListGroupItem key={allergy.id} action>
            <Row style={{ minHeight: 40 }}>
              <Col lg={2} className="d-flex align-items-center">
                <h6 style={{ margin: 0 }}>{allergy.name}</h6>
              </Col>
              <Col className="d-flex align-items-center">
                {["Safe", "Modifiable", "Unsafe"].map((type) => (
                  <Form.Check
                    inline
                    label={type}
                    name={allergy.name}
                    type="radio"
                    value={type}
                    checked={allergyTypes[allergy.id].type === type}
                    onChange={() =>
                      handleChangeAllergyTypes(allergy.id, "type", type)
                    }
                  />
                ))}
              </Col>
              <Col lg={2} className="d-flex align-items-center">
                <Form.Check
                  inline
                  label="Cross Contact"
                  disabled={allergyTypes[allergy.id].type === "Unsafe"}
                  name={allergy.name}
                  type="checkbox"
                  checked={allergyTypes[allergy.id].cross}
                  onChange={({ target: { checked } }) =>
                    handleChangeAllergyTypes(allergy.id, "cross", checked)
                  }
                />
              </Col>
              <Col lg={3} className="d-flex align-items-center">
                <Form.Check
                  inline
                  label="Cross Contact Modifiable"
                  disabled={!allergyTypes[allergy.id].cross}
                  name={allergy.name}
                  type="checkbox"
                  checked={allergyTypes[allergy.id].crossMod}
                  onChange={({ target: { checked } }) =>
                    handleChangeAllergyTypes(allergy.id, "crossMod", checked)
                  }
                />
              </Col>
            </Row>
            {(allergyTypes[allergy.id].type === "Modifiable" ||
              allergyTypes[allergy.id].cross ||
              allergyTypes[allergy.id].crossMod) && <Divider />}
            <Row>
              {allergyTypes[allergy.id].type === "Modifiable" && (
                <Col>
                  <Form.Label>Modification</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="modDescription"
                    placeholder="Description"
                    rows={3}
                    value={allergyTypes[allergy.id].modDescription}
                    onChange={({ target: { value, name } }) =>
                      handleChangeAllergyTypes(allergy.id, name, value)
                    }
                  />
                </Col>
              )}
            </Row>
            <Row>
              {allergyTypes[allergy.id].cross && (
                <Col>
                  <Form.Label className="mt-2">Cross Contact</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="crossDescription"
                    placeholder="Procedure"
                    rows={3}
                    value={allergyTypes[allergy.id].crossDescription}
                    onChange={({ target: { value, name } }) =>
                      handleChangeAllergyTypes(allergy.id, name, value)
                    }
                  />
                </Col>
              )}
            </Row>
            <Row>
              {allergyTypes[allergy.id].crossMod && (
                <Col className="mb-2">
                  <Form.Label className="mt-2">
                    Cross Contact Modification
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="crossModDescription"
                    placeholder="Procedure"
                    rows={3}
                    value={allergyTypes[allergy.id].crossModDescription}
                    onChange={({ target: { value, name } }) =>
                      handleChangeAllergyTypes(allergy.id, name, value)
                    }
                  />
                </Col>
              )}
            </Row>
            {(allergyTypes[allergy.id].type === "Modifiable" ||
              allergyTypes[allergy.id].cross ||
              allergyTypes[allergy.id].crossMod) && (
              <div style={{ height: "0.5rem" }} />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemForm);
