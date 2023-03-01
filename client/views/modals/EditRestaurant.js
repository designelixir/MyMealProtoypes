import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row, Col } from "react-bootstrap";
import { SketchPicker } from "react-color";
import rgbHex from "rgb-hex";
import { createRestaurant } from "../../redux/reducers/corporation";
import { editRestaurant, removeImage } from "../../redux/reducers/restaurant";

const EditRestaurant = ({ restaurant, updateRestaurant, deleteImage }) => {
  const [modalShow, setModalShow] = useState(false);
  const [deleted, setDeleted] = useState({
    Logo: !!!restaurant.logo,
    Bg: !!!restaurant.bg,
  });
  const [restaurantName, setRestaurantName] = useState(restaurant.name);
  const [restaurantCCP, setRestaurantCCP] = useState(
    restaurant.crossContactProcedure
  );
  const [restaurantLogo, setRestaurantLogo] = useState(undefined);
  const [restaurantBG, setRestaurantBG] = useState(undefined);
  const [colorHex, setColorHex] = useState(restaurant.primaryColor);

  const handleChangeLogo = ({ target: { files } }) => {
    setRestaurantLogo(
      Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
      })
    );
  };
  const handleChangeBG = ({ target: { files } }) => {
    setRestaurantBG(
      Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
      })
    );
  };
  const handleEditRestaurant = () => {
    const formData = new FormData();

    if (restaurantLogo) {
      formData.append("restaurantLogo", restaurantLogo);
    }
    if (restaurantBG) {
      formData.append("restaurantBg", restaurantBG);
    }
    formData.append(
      "restaurantData",
      JSON.stringify({
        name: restaurantName,
        crossContactProcedure: restaurantCCP,
        primaryColor: colorHex,
      })
    );
    // formData.append("deleted", JSON.stringify(deleted));
    updateRestaurant({
      body: formData,
      restaurantId: restaurant.id,
    });
    setModalShow(false);
  };
  const handleDeleteImage = (type) => {
    setDeleted({ ...deleted, [type]: true });
    deleteImage({ restaurantId: restaurant.id, body: { type } });
  };
  return (
    <>
      <Button
      className="backend-styled-edit-button"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        &#9998; Edit Restaurant
      </Button>

      <Modal
        className="noscroll modal-window"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      ><Container className="modal-container">
        <Modal.Header className="space-between-flex">
          <h3 id="contained-modal-title-vcenter">
            Edit Restaurant - {restaurant.name}
          </h3>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label><br></br>
          <Form.Control
            className="text-input"
            type="text"
            value={restaurantName}
            placeholder="Name"
            onChange={({ target: { value } }) => setRestaurantName(value)}
          /><br></br>
          <Form.Label>Cross Contact Procedure</Form.Label>
          <Form.Control
            className="text-area"
            type="textarea"
            as="textarea"
            rows={3}
            value={restaurantCCP}
            placeholder="Name"
            onChange={({ target: { value } }) => setRestaurantCCP(value)}
          /><br></br>
          <Container style={{display: "flex", alignItems: "flex-start", justifyContent: "flex-start"}}>
            <Container className="backend-upload-container">
            <Form.Label>Logo</Form.Label><br></br>
            {!deleted.Logo ? (
            <Row>
              <Button className="backend-styled-button" onClick={() => handleDeleteImage("Logo")}>Delete</Button>
              
                <div className="backend-image-preview">
                  <img
                    src={restaurant.logo.url}
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
                onChange={handleChangeLogo}
              />
              
                {restaurantLogo && (
                  
                    <div className="backend-image-preview">
                      <img
                        src={restaurantLogo.preview}
                        className="backend-photo-preview"
                      />
                    </div>
                  
                )}
            </>
          )}
            </Container>
            <Container>

            <Form.Label>Background Image</Form.Label><br></br>
          {!deleted.Bg ? (
            <Row >
              <Button onClick={() => handleDeleteImage("Bg")}>Delete</Button>
              
                <div className="backend-image-preview">
                  <img
                    src={restaurant.bg.url}
                    className="backend-photo-preview"
                  />
                </div>
              
            </Row>
          ) : (
            <>
              <Form.Control
                type="file"
                accept="image/*"
                name="restaurantBG"
                placeholder="Logo"
                onChange={handleChangeBG}
              />
              <Row >
                {restaurantBG && (
                  
                    <div className="backend-image-preview">
                      <img
                        src={restaurantBG.preview}
                        className="backend-photo-preview"
                      />
                    </div>
                  
                )}
              </Row>
            </>
          )}
            </Container>
          </Container>
          
          <br></br>
          <Form.Label>Primary Color</Form.Label><br></br>
          <SketchPicker
            color={colorHex}
            onChange={(c) =>
              setColorHex("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))
            }
          />
        </Modal.Body><br></br>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleEditRestaurant}>Update</Button>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Container>
        
      </Modal>
    </>
  );
};

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => {
  return {
    updateRestaurant(data) {
      dispatch(editRestaurant(data));
    },
    deleteImage(data) {
      dispatch(removeImage(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditRestaurant);
