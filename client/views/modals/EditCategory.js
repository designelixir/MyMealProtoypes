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
      className="backend-styled-edit-button"
        variant="primary"
        style={{ width: "fit-content" }}
        onClick={() => setModalShow(true)}
      >
       &#9998; Edit Category
      </Button>

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
              Edit Category
            </h3>
            <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Name</Form.Label><br></br>
            <Form.Control
              className="text-input"
              type="text"
              name="name"
              value={categoryName}
              placeholder="Name"
              onChange={({ target: { value } }) => setCategoryName(value)}
            /><br></br>
          </Modal.Body>
          <Modal.Footer>
            <Button className="backend-styled-button" onClick={handleEditCategory}>Update</Button>
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
    editCategory(data) {
      dispatch(updateCategory(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EditCategory);
