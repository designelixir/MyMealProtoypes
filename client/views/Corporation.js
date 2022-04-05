import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  createRestaurant,
  fetchCorporation,
  uploadFiles,
} from "../redux/reducers/corporation";
import { SketchPicker } from "react-color";
import rgbHex from "rgb-hex";
import { Container, Row, Col, Form, Button, Breadcrumb } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";
export const Corporation = ({
  getCorporation,
  uploadImages,
  match,
  isLoading,
  corporation,
  addRestaurant,
}) => {
  const history = useHistory();
  const { corporationId } = match.params;
  useEffect(() => {
    getCorporation(corporationId);
  }, []);
  const [restaurantData, setRestaurantData] = useState({ name: "", image: "" });
  const [restaurantBG, setRestaurantBG] = useState(undefined);
  const [colorHex, setColorHex] = useState("#ffffff");
  const handleChange = ({ target: { name, value } }) => {
    setRestaurantData({ ...restaurantData, [name]: value });
  };
  const handleNewRestaurant = () => {
    setRestaurantData({ name: "", image: "" });
    addRestaurant({
      body: {
        ...restaurantData,
        primaryColor: colorHex,
        corporationId,
      },
      corporationId,
    });
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const [newBG] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setRestaurantBG(newBG);
    },
  });
  const handleUpload = () => {
    const formData = new FormData();
    if (restaurantBG) {
      formData.append("file", restaurantBG);
    }
    uploadImages(formData);
  };
  
  if (isLoading) {
    return <></>;
  }
  return (
    <Container>
      <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
        <Breadcrumb.Item
          onClick={() => history.push("/")}
          style={{ color: "#4e66f8" }}
        >
          Corporations
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{corporation.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{corporation.name}</h1>

      <h2>Create New Restaurant</h2>
      <Row>
        <Col>
          <Form.Control
            type="text"
            name="name"
            value={restaurantData.name}
            placeholder="Name"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            name="image"
            value={restaurantData.image}
            placeholder="Image"
            onChange={handleChange}
          />
          <div className="mb-4">
            <div {...getRootProps({ className: "dropzone dz-clickable" })}>
              <input {...getInputProps()} />
              <div className="dz-message text-muted">
                <p>Drop file here or click to upload.</p>
              </div>
            </div>
            <Row className="mt-4">
              {restaurantBG && (
                <div className="col-lg-4">
                  <div>
                    <img
                      src={restaurantBG.preview}
                      className="img-fluid rounded shadow mb-4"
                    />
                  </div>
                </div>
              )}
            </Row>
          </div>
          <Button onClick={handleUpload}>Upload</Button>
        </Col>
        <Col>
          <SketchPicker
            color={colorHex}
            onChange={(c) =>
              setColorHex("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))
            }
          />
        </Col>
      </Row>
      <Button onClick={handleNewRestaurant}>Add New</Button>
      <h2>Restaurants</h2>
      {corporation.restaurants &&
        corporation.restaurants.map((restaurant) => (
          <Container>
            <Link
              to={`/corporations/${corporationId}/restaurants/${restaurant.id}`}
            >
              {restaurant.name}
            </Link>
          </Container>
        ))}
    </Container>
  );
};

const mapState = (state) => {
  const { corporation, isLoading } = state.corporation;
  return {
    isLoading,
    corporation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCorporation(corporationId) {
      dispatch(fetchCorporation(corporationId));
    },
    uploadImages(body) {
      dispatch(uploadFiles(body));
    },
    addRestaurant(data) {
      dispatch(createRestaurant(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Corporation);
