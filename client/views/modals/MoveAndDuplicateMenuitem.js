import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";
import { updateCorporation } from "../../redux/reducers/corporation";
import { moveAndDuplicateMenuitem } from "../../redux/reducers/category";

const MoveAndDuplicateMenuitem = ({
  menuitemId,
  menuCategories,
  moveMenuitem,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [moveToCategory, setMoveToCategory] = useState("");
  // const handleChange = ({ target: { name, value } }) => {
  //   setCorporationData({ ...corporationData, [name]: value });
  // };
  const handleMoveMenuitem = () => {
    // editCorporation({ corporationId: corporation.id, body: corporationData });
    moveMenuitem({ menuitemId, categoryId: moveToCategory });
    setModalShow(false);
  };
  return (
    <>
      <Button
        variant="primary"
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
        Move to
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
            Duplicate Menuitem
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Select Menu"
            onChange={({ target: { value } }) => setMoveToCategory(value)}
            style={{ width: "50%" }}
            value={moveToCategory}
          >
            <option>Select category</option>
            {menuCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleMoveMenuitem}>Duplicate</Button>
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
    moveMenuitem(data) {
      dispatch(moveAndDuplicateMenuitem(data));
    },
  };
};

export default connect(mapState, mapDispatch)(MoveAndDuplicateMenuitem);
