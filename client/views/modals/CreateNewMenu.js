import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row } from "react-bootstrap";
import { createMenu } from "../../redux/reducers/restaurant";

const CreateNewMenu = ({ addMenu, allergies, restaurantId }) => {
  const [modalShow, setModalShow] = useState(false);
  const [menuData, setMenuData] = useState({
    name: "",
    dedicatedFrom: "",
    orderNow: "",
    allergyIds: [],
  });
  const handleChange = ({ target: { name, value } }) => {
    setMenuData({ ...menuData, [name]: value });
  };
  const handleCreateMenu = () => {
    const { name, dedicatedFrom, orderNow, allergyIds } = menuData;
    const ids = Object.keys(allergyIds).reduce((ids, id) => {
      if (allergyIds[id]) {
        ids.push(id);
      }
      return ids;
    }, []);
    addMenu({
      data: { name, dedicatedFrom, orderNow, restaurantId },
      allergyIds: ids,
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
            Create New Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="name"
            value={menuData.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <Form.Label>Dedicated from</Form.Label>
          <Form.Control
            className="mb-3"
            type="textarea"
            as="textarea"
            name="dedicatedFrom"
            value={menuData.dedicatedFrom}
            placeholder="Procedure"
            onChange={handleChange}
          />
          <Form.Label>Order now</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="orderNow"
            value={menuData.orderNow}
            placeholder="Order now"
            onChange={handleChange}
          />
          <Form.Label>Allergies</Form.Label>
          <Container>
            {allergies.map((allergy) => (
              <Form.Check
                inline
                type="checkbox"
                label={allergy.name}
                name={allergy.name}
                id={allergy.id}
                checked={menuData.allergyIds[allergy.id] === true}
                onChange={({ target: { id, checked } }) =>
                  setMenuData({
                    ...menuData,
                    allergyIds: {
                      ...menuData.allergyIds,
                      [id]: checked,
                    },
                  })
                }
              />
            ))}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreateMenu}>Create</Button>
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
    addMenu(data) {
      dispatch(createMenu(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewMenu);
