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
            Create New Category
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                placeholder="Name"
                onChange={({ target: { value } }) => setCategoryName(value)}
              />
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleNewCategory}>Create</Button>
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
    addCategory(data) {
      dispatch(createCategory(data));
    },
    addCSVFile(data) {
      dispatch(uploadCSVFile(data));
    },
  };
};

export default connect(mapState, mapDispatch)(CreateNewCategory);
