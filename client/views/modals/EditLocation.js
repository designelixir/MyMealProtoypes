import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row, Col } from "react-bootstrap";
import { updateLocation } from "../../redux/reducers/location";

const EditLocation = ({
  restaurantLocation,
  restaurantMenus,
  editLocation,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [locationData, setLocationData] = useState({
    crossContactProcedure: restaurantLocation.crossContactProcedure,
    streetOne: restaurantLocation.streetOne,
    streetTwo: restaurantLocation.streetTwo,
    city: restaurantLocation.city,
    state: restaurantLocation.state,
    zip: restaurantLocation.zip,
    country: restaurantLocation.country,
  });
  const [locationMenuId, setLocationMenuId] = useState(
    String(restaurantLocation.menu.id)
  );
  const handleChange = ({ target: { name, value } }) => {
    setLocationData({ ...locationData, [name]: value });
  };

  const handleSelect = ({ target: { value } }) => {
    setLocationMenuId(value);
  };
  const handleEditLocation = () => {
    editLocation({
      locationId: restaurantLocation.id,
      body: {
        locationData,
        locationMenuId,
      },
    });
    setModalShow(false);
  };

  return (
    <>
      <Button
        className = "backend-styled-edit-button"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
      &#9998;  Edit Location
      </Button>

      <Modal
        className="noscroll modal-window"
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container className="modal-container">
<Modal.Header className="space-between-flex">
          <h3 id="contained-modal-title-vcenter">
            Edit Location
          </h3>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Cross Contact Procedure</Form.Label><br></br>
          <Form.Control
            className="text-area"
            type="textarea"
            as="textarea"
            name="crossContactProcedure"
            value={locationData.crossContactProcedure}
            placeholder="Procedure"
            onChange={handleChange}
          /><br></br><br></br>
          
            <div>
              <Form.Label>Street One</Form.Label><br></br>
              <Form.Control
                className="text-input"
                type="text"
                name="streetOne"
                value={locationData.streetOne}
                placeholder="Street One"
                onChange={handleChange}
              />
            </div>
            <div>
              <Form.Label>Street Two</Form.Label><br></br>
              <Form.Control
                className="text-input"
                type="text"
                name="streetTwo"
                value={locationData.streetTwo}
                placeholder="Street Two"
                onChange={handleChange}
              />
            </div>
          

          <div className="center-flex-start" style={{flexWrap: "wrap"}}>
              <div>
            <Form.Label>City</Form.Label><br></br>
              <Form.Control
                className="small-text-input"
                style={{width: "200px!important"}}
                type="text"
                name="city"
                value={locationData.city}
                placeholder="City"
                onChange={handleChange}
              /></div>
              <div>
                <Form.Label>State</Form.Label><br></br>
              <Form.Control
                className="small-text-input"
                style={{width: "100px"}}
                type="text"
                name="state"
                value={locationData.state}
                placeholder="State"
                onChange={handleChange}
              /></div>
              <div>
                <Form.Label>Zip Code</Form.Label><br></br>
              <Form.Control
                className="small-text-input"
                type="text"
                name="zip"
                value={locationData.zip}
                placeholder="Zip"
                onChange={handleChange}
              />
              </div>
              <div>
              <Form.Label>Country</Form.Label><br></br>
          <Form.Control
            className="small-text-input"
            type="text"
            name="country"
            value={locationData.country}
            placeholder="United States of America"
            onChange={handleChange}
          />
              </div>
          </div>
          <br></br>
          <Form.Label>Select Menu</Form.Label><br></br>
          <Form.Select
            aria-label="Select Menu"
            onChange={handleSelect}
            style={{ width: "50%" }}
            value={locationMenuId}
          ><br></br>
            <option className="backend-drop-down">Select Menu</option>
            {restaurantMenus.map((menu) => (
              <option className="backend-drop-down" key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </Form.Select>
          <div className="backend-spacer"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleEditLocation}>Update</Button>
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
    editLocation(data) {
      dispatch(updateLocation(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditLocation);
