import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row, Col } from "react-bootstrap";
import { SketchPicker } from "react-color";
import rgbHex from "rgb-hex";
import { createRestaurant } from "../../redux/reducers/corporation";

const CreateNewRestaurant = ({
  corporationId,
  corporationCCP,
  addRestaurant,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantCCP, setRestaurantCCP] = useState(corporationCCP);
  const [restaurantLogo, setRestaurantLogo] = useState(undefined);
  const [restaurantBG, setRestaurantBG] = useState(undefined);
  const [colorHex, setColorHex] = useState("#ffffff");

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
  const handleNewRestaurant = () => {
    const formData = new FormData();

    formData.append("file", restaurantLogo);
    formData.append("file", restaurantBG);
    formData.append(
      "restaurantData",
      JSON.stringify({
        name: restaurantName,
        crossContactProcedure: restaurantCCP,
        primaryColor: colorHex,
        corporationId,
      })
    );

    addRestaurant({
      body: formData,
      corporationId,
    });
    setModalShow(false);
  };
  return (
    <>
      <Button
        variant="primary"
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
        Create
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
            Create New Restaurant
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
          <Form.Label>Background Image</Form.Label>
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
          <Form.Label>Primary Color</Form.Label>
          <SketchPicker
            color={colorHex}
            onChange={(c) =>
              setColorHex("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleNewRestaurant}>Create</Button>
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
    addRestaurant(data) {
      dispatch(createRestaurant(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewRestaurant);
