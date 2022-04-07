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
      formData.append("file", restaurantLogo);
    }
    if (restaurantBG) {
      formData.append("file", restaurantBG);
    }
    formData.append(
      "restaurantData",
      JSON.stringify({
        name: restaurantName,
        crossContactProcedure: restaurantCCP,
        primaryColor: colorHex,
      })
    );
    formData.append("deleted", JSON.stringify(deleted));
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
        variant="primary"
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
        Edit
      </Button>

      <Modal
        className="noscroll"
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xl"
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Restaurant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            value={restaurantName}
            placeholder="Name"
            onChange={({ target: { value } }) => setRestaurantName(value)}
          />
          <Form.Label>Cross Contact Procedure</Form.Label>
          <Form.Control
            className="mb-3"
            type="textarea"
            as="textarea"
            rows={3}
            value={restaurantCCP}
            placeholder="Name"
            onChange={({ target: { value } }) => setRestaurantCCP(value)}
          />
          <Form.Label>Logo</Form.Label>
          {!deleted.Logo ? (
            <Row className="mt-4 mb-3">
              <Button onClick={() => handleDeleteImage("Logo")}>Delete</Button>
              <div className="col-lg-4">
                <div>
                  <img
                    src={restaurant.logo.url}
                    className="img-fluid rounded shadow mb-4"
                  />
                </div>
              </div>
            </Row>
          ) : (
            <>
              <Form.Control
                className="mb-3"
                type="file"
                accept="image/*"
                name="restaurantLogo"
                placeholder="Logo"
                onChange={handleChangeLogo}
              />
              <Row className="mt-4 mb-3">
                {restaurantLogo && (
                  <div className="col-lg-4">
                    <div>
                      <img
                        src={restaurantLogo.preview}
                        className="img-fluid rounded shadow mb-4"
                      />
                    </div>
                  </div>
                )}
              </Row>
            </>
          )}
          <Form.Label>Background Image</Form.Label>
          {!deleted.Bg ? (
            <Row className="mt-4 mb-3">
              <Button onClick={() => handleDeleteImage("Bg")}>Delete</Button>
              <div className="col-lg-4">
                <div>
                  <img
                    src={restaurant.bg.url}
                    className="img-fluid rounded shadow mb-4"
                  />
                </div>
              </div>
            </Row>
          ) : (
            <>
              <Form.Control
                className="mb-3"
                type="file"
                accept="image/*"
                name="restaurantBG"
                placeholder="Logo"
                onChange={handleChangeBG}
              />
              <Row className="mt-4 mb-3">
                {restaurantBG && (
                  <div className="col-lg-4">
                    <div>
                      <img
                        src={restaurantBG.preview}
                        className="img-fluid rounded shadow mb-4"
                      />
                    </div>
                  </div>
                )}
              </Row>
            </>
          )}
          <Form.Label>Primary Color</Form.Label>
          <SketchPicker
            color={colorHex}
            onChange={(c) =>
              setColorHex("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditRestaurant}>Update</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
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
