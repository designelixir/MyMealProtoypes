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
import priceFormat from "../../utils/priceFormat";

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
  handleChangeImage,
  menuitemImage,
  deleted,
  handleDeleteImage,
}) => {
  return (
    <>
    
    
      <Form.Label>Name</Form.Label>
      <br></br>
      <Form.Control
        className="small-text-input"
        type="text"
        name="name"
        placeholder="Name"
        value={menuItem.name}
        onChange={handleChangeMenuItem}
      />
      <br></br>
      <Form.Label>Description</Form.Label>
      <br></br>
      <Form.Control
        className="text-area"
        type="textarea"
        as="textarea"
        name="description"
        placeholder="Description"
        value={menuItem.description}
        onChange={handleChangeMenuItem}
      />
      <br></br>
      <div
        className="center-flex-start"
        style={{
          flexWrap: "wrap",
          alignItems: "flex-start!important",
          width: "100%",
        }}
      >
        <div style={{width: "50%"}}>
          <Form.Label>Ingredients</Form.Label>
          <br></br>
          <Form.Control
            className="text-area"
            type="textarea"
            as="textarea"
            name="ingredients"
            placeholder="Ingredients"
            value={menuItem.ingredients}
            onChange={handleChangeMenuItem}
          />
        </div>
        <div style={{width: "50%"}}>
          <Form.Label>Nutrition Facts</Form.Label>
          <br></br>
          <Form.Control
            className="text-area"
            type="textarea"
            as="textarea"
            name="nutritionFacts"
            placeholder="Nutrition Facts"
            value={menuItem.nutritionFacts}
            onChange={handleChangeMenuItem}
          />
        </div>
      </div>
      <div className="center-flex-start" style={{alignItems: "flex-start!important"}}>
        <Container>
          <div className="half-col">
            <Form.Label>Photo</Form.Label>
            <br></br>
            {!deleted ? (
              <Row>
                <Button onClick={() => handleDeleteImage()}>Delete</Button>
                <div className="backend-image-preview">
                  <img
                    src={menuitemImage.preview}
                    className="backend-photo-preview"
                  />
                </div>
              </Row>
            ) : (
              <>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="restaurantLogo"
                  placeholder="Logo"
                  onChange={handleChangeImage}
                />
                <br></br>
                <Row>
                  {menuitemImage && (
                    <div className="backend-image-preview">
                      <img
                        src={menuitemImage.preview}
                        className="backend-photo-preview"
                      />
                    </div>
                  )}
                </Row>
              </>
            )}
          </div>
        </Container><br></br>
        <div className="half-col">
          <div className="space-between-flex">
            <Form.Label style={{width: "calc(100% - 100px)"}}>Price</Form.Label>
            <Form.Check
            
              inline
              label={priceType}
              type="switch"
              checked={priceType === "Variation"}
              onChange={({ target: { checked } }) =>
                setPriceType(checked ? "Variation" : "Single")
              }
            />
          </div>
          
          <Container>
            {priceType === "Single" ? (
              <Form.Control
              className="text-input"
                type="text"
                name="price"
                placeholder="price"
                value={priceFormat(menuItem.price)}
                onChange={handleChangeMenuItem}
              />
            ) : (
              (() => {
                const pts = Object.values(priceTypes);
                return pts.map((pt, idx) => (
                  <div key={idx} className="center-flex-start">
                    <Col>
                      <Form.Control
                      className="text-input"
                      style={{minWidth: "200px"}}
                        type="text"
                        name="type"
                        placeholder="Type"
                        value={pt.type}
                        onChange={({ target: { name, value } }) =>
                          handleChangePriceTypes({ name, value, idx })
                        }
                      />
                    </Col>
                    <Col className="center-flex-start">
                      <Form.Control
                      style={{width: "100px"}}
                        className="text-input"
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={priceFormat(pt.price)}
                        onChange={({ target: { name, value } }) =>
                          handleChangePriceTypes({
                            name,
                            value: value.replace(/[^\d]/g, ""),
                            idx,
                          })
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

                    {idx === pts.length - 1 && (
                      <Col className="d-flex justify-content-end">
                        <Button onClick={() => handleAddPriceTypes(pts.length)}>
                          +
                        </Button>
                      </Col>
                    )}
                  </div>
                ));
              })()
            )}
          </Container>
        </div>
      </div>

      <br></br>

      <h3>Allergy Types</h3>
      <section>
        {menuitemAllergies.map((allergy) => (
          <Container key={allergy.id} action>
            <div
              className="allergen-type-container"
              
              style={{border: `3px solid ${allergyTypes[allergy.id].type === "Safe" ? "green" : "orange" }`}}
            >
              <div className="backend-allergen-card center-flex">
                <div style={{ textAlign: "center", height: "100%" }}>
                  <div
                    className="backend-allergy-image"
                    style={{
                      backgroundImage: `url('/icons/allergens/${allergy.name}.png')`,
                    }}
                  ></div>
                  <p style={{ lineHeight: "18px", fontSize: "16px", height: "100%" }}>{allergy.name}</p>
                </div>
              </div>

              <div className="safety-container-wrapper">
                <div className="safety-container" 
                >
                  <div >
                    <div style={{paddingRight:"15px"}}>
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
                  ))}</div>
                    <div >{allergyTypes[allergy.id].type === "Modifiable" && (
                  <Col>
                    <Form.Control
                    className="text-area"
                      as="textarea"
                      name="modDescription"
                      placeholder="What are the modifications for this allergen?"
                      value={allergyTypes[allergy.id].modDescription}
                      onChange={({ target: { value, name } }) =>
                        handleChangeAllergyTypes(allergy.id, name, value)
                      }
                    />
                  </Col>
                )}</div>
                  </div>
                
                  
                </div>
                <div className="safety-container">
                <div>
                  <div style={{paddingRight:"15px"}}><Form.Check
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
                  /></div>
                  <div>
                  {allergyTypes[allergy.id].cross && (
                  <Col>
                    
                    <Form.Control
                    className="text-area"
                      as="textarea"
                      name="crossDescription"
                      placeholder="What is the cross contact procedure for this allergen?"
                      value={allergyTypes[allergy.id].crossDescription}
                      onChange={({ target: { value, name } }) =>
                        handleChangeAllergyTypes(allergy.id, name, value)
                      }
                    />
                  </Col>
                )}
                {allergyTypes[allergy.id].crossMod && (
                    <Form.Control
                    className="text-area"
                      as="textarea"
                      name="crossModDescription"
                      placeholder="What is the cross contact procedure modification for this allergen?"
                      value={allergyTypes[allergy.id].crossModDescription}
                      onChange={({ target: { value, name } }) =>
                        handleChangeAllergyTypes(allergy.id, name, value)
                      }
                    />
                  
                )}
                  </div>
                </div>
                
                  
                </div>
              </div>    
            </div>

            
            {(allergyTypes[allergy.id].type === "Modifiable" ||
              allergyTypes[allergy.id].cross ||
              allergyTypes[allergy.id].crossMod )}
            
            {(allergyTypes[allergy.id].type === "Modifiable" ||
              allergyTypes[allergy.id].cross ||
              allergyTypes[allergy.id].crossMod) }
          </Container>
        ))}
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemForm);
