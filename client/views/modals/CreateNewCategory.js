import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Container, Form, Row } from "react-bootstrap";
import { createMenu } from "../../redux/reducers/restaurant";
import { createCategory, uploadCSVFile } from "../../redux/reducers/menu";

const CreateNewCategory = ({
  addCategory,
  addCSVFile,
  categories,
  setCategories,
  menuId,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [createSingle, setCreateSingle] = useState(true);
  const [csvFile, setCsvFile] = useState(undefined);
  const [categoryName, setCategoryName] = useState("");

  const handleNewCategory = () => {
    setCategoryName("");
    if (createSingle) {
      addCategory({
        menuId,
        body: { name: categoryName, position: categories.length, menuId },
        cb(menu) {
          setCategories(menu.categories);
        },
      });
    } else {
      const formData = new FormData();
      formData.append("file", csvFile);
      addCSVFile({
        menuId,
        startingPosition: categories.length,
        body: formData,
        cb(menu) {
          setCategories(menu.categories);
        },
      });
    }

    setModalShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
        className="backend-styled-button"
        onClick={() => setModalShow(true)}
      >
        &#65291; Create New Category
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
          <h3 id="contained-modal-title-vcenter">Create New Category</h3>
          <Button className="backend-styled-button" onClick={() => setModalShow(false)}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Check
              inline
              label={createSingle ? "Create Multiple (CSV)" : "Single"}
              type="switch"
              checked={!createSingle}
              onChange={({ target: { checked } }) => setCreateSingle(!checked)}
            />
          </Row>
          {createSingle ? (
            <>
              <Form.Label>Name</Form.Label><br></br>
              <Form.Control
                type="text"
                className="text-input"
                value={categoryName}
                placeholder="Name"
                onChange={({ target: { value } }) => setCategoryName(value)}
              /><br></br>
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
            </>
          )}
        </Modal.Body><br></br>
        <Modal.Footer>
          <Button className="backend-styled-button" onClick={handleNewCategory}>Create</Button>
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
    addCategory(data) {
      dispatch(createCategory(data));
    },
    addCSVFile(data) {
      dispatch(uploadCSVFile(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewCategory);
