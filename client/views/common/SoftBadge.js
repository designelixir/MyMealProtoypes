import React from "react";
import classNames from "classnames";

const SoftBadge = ({ bg = "primary", pill, children, className }) => {
  return (
    <div
      className={classNames(className, `badge badge-soft-${bg}`, {
        "rounded-pill": pill,
      })}
    >
      {children}
    </div>
  );
};

export default SoftBadge;
