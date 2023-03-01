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
    allergyIds: {},
  });
  const handleChange = ({ target: { name, value } }) => {
    setMenuData({ ...menuData, [name]: value });
  };
  const handleCreateMenu = () => {
    const { name, dedicatedFrom, orderNow, allergyIds } = menuData;
    addMenu({
      data: { name, dedicatedFrom, orderNow, restaurantId },
      allergyIds: Object.keys(allergyIds).reduce((ids, id) => {
        if (allergyIds[id]) ids.push(id);
        return ids;
      }, []),
    });
    setModalShow(false);
  };

  return (
    <>
      <Button
      className="backend-styled-button"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
       + Create New Menu
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
            Create New Menu
          </h3>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label><br></br>
          <Form.Control
            className="text-input"
            type="text"
            name="name"
            value={menuData.name}
            placeholder="Name"
            onChange={handleChange}
          /><br></br>
          <Form.Label>Dedicated from</Form.Label><br></br>
          <Form.Control
            className="text-area"
            type="textarea"
            as="textarea"
            name="dedicatedFrom"
            value={menuData.dedicatedFrom}
            placeholder="Procedure"
            onChange={handleChange}
          /><br></br>
          <Form.Label>Order now (Include https://)</Form.Label><br></br>
          <Form.Control
            className="text-input"
            type="text"
            name="orderNow"
            value={menuData.orderNow}
            placeholder="Link to your online ordering service / website"
            onChange={handleChange}
          /><br></br>
          <Form.Label>Allergies</Form.Label><br></br>
          <Container className="center-flex" style={{flexWrap: "wrap", justifyContent: "flex-start"}}>
            {allergies.map((allergy) => (
              <Form.Check
              className="backend-checkbox"
                key={allergy.id}
                inline
                type="checkbox"
                label={allergy.name}
                name={allergy.name}
                id={allergy.id}
                checked={!!menuData.allergyIds[allergy.id]}
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
        </Modal.Body><br></br>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleCreateMenu}>Create</Button>
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
    addMenu(data) {
      dispatch(createMenu(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewMenu);
