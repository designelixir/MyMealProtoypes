import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form } from "react-bootstrap";
import { updateCorporation } from "../../redux/reducers/corporation";
import { updateCategory } from "../../redux/reducers/category";

const EditCategory = ({ category, editCategory }) => {
  const [modalShow, setModalShow] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);

  const handleEditCategory = () => {
    editCategory({ categoryId: category.id, body: { name: categoryName } });
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
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="name"
            value={categoryName}
            placeholder="Name"
            onChange={({ target: { value } }) => setCategoryName(value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditCategory}>Update</Button>
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
    editCategory(data) {
      dispatch(updateCategory(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditCategory);
