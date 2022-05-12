import React, { useState } from "react";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { Card } from "react-bootstrap";

const MenuItemCardImg = ({ url }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <Card.Img
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: imageLoaded ? "auto" : 0,
        }}
        variant="top"
        src={url}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <Skeleton style={{ height: 200, lineHeight: "unset" }} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemCardImg);
