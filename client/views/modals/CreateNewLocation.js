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
      className="backend-styled-button"
        variant="primary"
        
        onClick={() => setModalShow(true)}
      >
        + Create New Location
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
            Create New Location
          </h3>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
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
              <Form.Label>Cross Contact Procedure</Form.Label><br></br>
              <Form.Control
                className="text-area"
                type="textarea"
                as="textarea"
                name="crossContactProcedure"
                value={locationData.crossContactProcedure}
                placeholder="Procedure"
                onChange={handleChange}
              />
              <div className="backend-spacer"></div>
              <Form.Label>Street One</Form.Label><br></br>
              <Form.Control
                className="text-input"
                type="text"
                name="streetOne"
                value={locationData.streetOne}
                placeholder="Street One"
                onChange={handleChange}
              /><br></br>
              <Form.Label>Street Two</Form.Label><br></br>
              <Form.Control
                className="text-input"
                type="text"
                name="streetTwo"
                value={locationData.streetTwo}
                placeholder="Street Two"
                onChange={handleChange}
              /><br></br>

              <div className="center-flex-start" style={{flexWrap: "wrap"}}>
                <div><Form.Label>City</Form.Label><br></br>
                  <Form.Control
                    className="small-text-input"
                    type="text"
                    name="city"
                    value={locationData.city}
                    placeholder="City"
                    onChange={handleChange}
                  /></div>
                <div><Form.Label>State</Form.Label> <br></br>
                  <Form.Control
                    className="small-text-input"
                    type="text"
                    name="state"
                    value={locationData.state}
                    placeholder="State"
                    onChange={handleChange}
                  /></div>
                <div><Form.Label>Zip</Form.Label><br></br>
                  <Form.Control
                    className="small-text-input"
                    type="text"
                    name="zip"
                    value={locationData.zip}
                    placeholder="Zip"
                    onChange={handleChange}
                  /></div>
              </div>
              
              <Form.Label>Country</Form.Label><br></br>
              <Form.Control
                className="text-input"
                type="text"
                name="country"
                value={locationData.country}
                placeholder="Country"
                onChange={handleChange}
              />
              <div className="backend-spacer"></div>
              <Form.Label>Menu</Form.Label><br></br>
              <Form.Select
                aria-label="Select Menu"
                onChange={handleSelect}
                style={{ width: "50%" }}
                value={locationMenuId}
              >
                <option>Select Menu</option>
                {restaurantMenus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </Form.Select>
            </>
          ) : (
            <>
              <Form.Label>CSV</Form.Label><br></br>
              <Form.Control
                className="mb-3"
                type="file"
                accept=".csv"
                name="csvFile"
                placeholder="CSV"
                onChange={({ target: { files } }) => setCsvFile(files[0])}
              />
              <div className="backend-spacer"></div>
              <Form.Label>Menu</Form.Label><br></br>
              <Form.Select
                aria-label="Select Menu"
                onChange={handleSelect}
                style={{ width: "50%" }}
                value={locationMenuId}
              >
                <option>Select Menu</option>
                {restaurantMenus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </Form.Select>
            </>
          )}
        </Modal.Body><br></br>
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
            className="backend-styled-button"
          >
            Create Location
          </Button>
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
    addLocation(data) {
      dispatch(createLocation(data));
    },
    addCSVFile(data) {
      dispatch(uploadCSVLocations(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewLocation);
