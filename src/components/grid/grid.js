import React from "react";
import PropTypes from "prop-types";

function Grid(props) {
  return <div>{props.children}</div>;
}

Grid.propTypes = {
  children: PropTypes.any,
};

export default Grid;
