import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row } from "react-bootstrap";
import { createMenu } from "../../redux/reducers/restaurant";
import { updateMenu } from "../../redux/reducers/menu";

const EditMenu = ({ menu, editMenu, allergies }) => {
  const [modalShow, setModalShow] = useState(false);
  const [menuData, setMenuData] = useState({
    name: menu.name,
    dedicatedFrom: menu.dedicatedFrom,
    orderNow: menu.orderNow,
    allergyIds: menu.allergies.reduce((obj, { id }) => {
      obj[id] = true;
      return obj;
    }, {}),
  });
  const handleChange = ({ target: { name, value } }) => {
    setMenuData({ ...menuData, [name]: value });
  };
  const handleEditMenu = () => {
    const { name, dedicatedFrom, orderNow, allergyIds } = menuData;
    editMenu({
      menuId: menu.id,
      body: {
        menuData: { name, dedicatedFrom, orderNow },
        allergyIds: Object.keys(allergyIds).reduce((ids, id) => {
          if (allergyIds[id]) ids.push(id);
          return ids;
        }, []),
      },
    });
    setModalShow(false);
  };

  return (
    <>
      <Button
      className="backend-styled-edit-button"
        variant="primary"
        onClick={() => setModalShow(true)}
      >&#9998; Edit Menu</Button>

      <Modal
        className="noscroll modal-window"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container className="modal-container">
          <Modal.Header className="space-between-flex">
          <h3 id="contained-modal-title-vcenter">
            Edit Menu - {menu.name}
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
          <Form.Label>Dedicated Free from</Form.Label><br></br>
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
            placeholder="Order now"
            onChange={handleChange}
          /><br></br>
          <Form.Label>Allergies</Form.Label><br></br>
          <Container className="backend-allergy-grid">
            {allergies.map((allergy) => (
              <Form.Check
                key={allergy.id}
                inline
                className="backend-checkbox"
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
          </Container><br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleEditMenu}>Update</Button>
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
    editMenu(data) {
      dispatch(updateMenu(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditMenu);
