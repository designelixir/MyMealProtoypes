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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Cross Contact Procedure</Form.Label>
          <Form.Control
            className="mb-3"
            type="textarea"
            as="textarea"
            name="crossContactProcedure"
            value={locationData.crossContactProcedure}
            placeholder="Procedure"
            onChange={handleChange}
          />

          <Form.Label>Street One</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="streetOne"
            value={locationData.streetOne}
            placeholder="Street One"
            onChange={handleChange}
          />
          <Form.Label>Street Two</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="streetTwo"
            value={locationData.streetTwo}
            placeholder="Street Two"
            onChange={handleChange}
          />
          <Row>
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                name="city"
                value={locationData.city}
                placeholder="City"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>State</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                name="state"
                value={locationData.state}
                placeholder="State"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                name="zip"
                value={locationData.zip}
                placeholder="Zip"
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Form.Label>Country</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="country"
            value={locationData.country}
            placeholder="Country"
            onChange={handleChange}
          />
          <Form.Label>Menu</Form.Label>
          <Form.Select
            aria-label="Select Menu"
            onChange={handleSelect}
            style={{ width: "50%" }}
            value={locationMenuId}
          >
            <option>Select menu</option>
            {restaurantMenus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditLocation}>Update</Button>
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
    editLocation(data) {
      dispatch(updateLocation(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditLocation);
