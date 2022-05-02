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
            Edit Menu
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
          <Form.Label>Order now (Include https://)</Form.Label>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditMenu}>Update</Button>
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
    editMenu(data) {
      dispatch(updateMenu(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditMenu);
