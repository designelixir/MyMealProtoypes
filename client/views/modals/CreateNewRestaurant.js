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

    formData.append("restaurantLogo", restaurantLogo);
    formData.append("restaurantBg", restaurantBG);
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
        className="backend-styled-button"
        variant="primary"
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
        + Create New Restaurant
      </Button>

      <Modal
        className="noscroll modal-window"
        show={modalShow}
        onHide={() => setModalShow(false)}
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      ><Container className="modal-container">
        <Modal.Header className="space-between-flex">
          <h3 id="contained-modal-title-vcenter">
            Create New Restaurant
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
          <Form.Label>Cross Contact Procedure</Form.Label><br></br>
          <Form.Control
            className="text-area"
            type="textarea"
            as="textarea"
            rows={3}
            value={restaurantCCP}
            placeholder="Cross Contact Procedure"
            onChange={({ target: { value } }) => setRestaurantCCP(value)}
          /><br></br>
          <Container style={{display: "flex", alignItems: "flex-start", justifyContent: "flex-start"}}>
            <Container className="backend-upload-container">
            <Form.Label>Logo</Form.Label><br></br>
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
          
            </Container>

            <Container className="backend-upload-container">
              <Form.Label>Background Image</Form.Label><br></br>
          <Form.Control
            type="file"
            accept="image/*"
            name="restaurantBG"
            placeholder="Logo"
            onChange={handleChangeBG}
          />
          
            {restaurantBG && (
                <div className="backend-image-preview">
                  <img
                    src={restaurantBG.preview}
                    className="backend-photo-preview"
                  />
                </div>
            )}
          </Container>
          </Container><br></br>
          
          
          <Form.Label>Primary Color</Form.Label><br></br>
          <SketchPicker
            color={colorHex}
            onChange={(c) =>
              setColorHex("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))
            }
          />
        </Modal.Body>
        <br></br>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleNewRestaurant}>Create</Button>
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
    addRestaurant(data) {
      dispatch(createRestaurant(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewRestaurant);
