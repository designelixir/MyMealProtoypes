import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row, Col } from "react-bootstrap";
import {
  createLocation,
  uploadCSVLocations,
} from "../../redux/reducers/restaurant";

const CreateNewLocation = ({
  addLocation,
  addCSVFile,
  restaurantMenus,
  restaurantCCP,
  restaurantId,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [createSingle, setCreateSingle] = useState(true);
  const [csvFile, setCsvFile] = useState(undefined);
  const [locationData, setLocationData] = useState({
    crossContactProcedure: restaurantCCP,
    streetOne: "",
    streetTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [locationMenuId, setLocationMenuId] = useState("");
  const handleChange = ({ target: { name, value } }) => {
    setLocationData({ ...locationData, [name]: value });
  };
  const handleSelect = ({ target: { value } }) => {
    setLocationMenuId(value);
  };
  const handleCreateLocation = () => {
    if (createSingle) {
      addLocation({
        body: { ...locationData, menuId: locationMenuId, restaurantId },
        restaurantId,
      });
    } else {
      const formData = new FormData();
      formData.append("file", csvFile);
      addCSVFile({
        menuId: locationMenuId,
        restaurantId,
        body: formData,
      });
    }
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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Check
              inline
              label={createSingle ? "Single" : "Multiple"}
              type="switch"
              checked={!createSingle}
              onChange={({ target: { checked } }) => setCreateSingle(!checked)}
            />
          </Row>
          {createSingle ? (
            <>
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
            </>
          ) : (
            <>
              <Form.Label>CSV</Form.Label>
              <Form.Control
                className="mb-3"
                type="file"
                accept=".csv"
                name="csvFile"
                placeholder="CSV"
                onChange={({ target: { files } }) => setCsvFile(files[0])}
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            // disabled={
            //   locationData.crossContactProcedure === "" ||
            //   locationData.streetOne === "" ||
            //   locationData.streetOne === "" ||
            //   locationData.streetTwo === "" ||
            //   locationData.city === "" ||
            //   locationData.state === "" ||
            //   locationData.zip === "" ||
            //   locationData.country === "" ||
            //   locationMenuId === ""
            // }
            onClick={handleCreateLocation}
          >
            Create
          </Button>
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
    addLocation(data) {
      dispatch(createLocation(data));
    },
    addCSVFile(data) {
      dispatch(uploadCSVLocations(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewLocation);
