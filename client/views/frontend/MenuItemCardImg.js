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
          height: imageLoaded ? 200 : 0,
          objectFit: "cover",
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
