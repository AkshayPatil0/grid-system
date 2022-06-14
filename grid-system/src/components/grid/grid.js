import React from "react";
import PropTypes from "prop-types";

import classes from "./grid.scss";
import useBreakpoint from "../../hooks/useBreakpoint";
import { BREAKPOINTS_MAP } from "../../utils/constants";
import { getResponsiveColCount, makeGrid } from "../../utils/grid";

function ResponsiveGrid(props) {
  const { children, col } = props;
  const breakpoint = useBreakpoint();

  console.log(props, breakpoint);
  // const currentCol = props[`col${breakpoint.toUpperCase()}`] || col;
  const currentCol = getResponsiveColCount(col, breakpoint);

  if (!currentCol) {
    throw new Error("col prop is not properly set !");
  }

  const gridContent = makeGrid(React.Children.toArray(children), currentCol);

  const columnClass =
    classes.grid__column + " " + classes[`grid__column__${currentCol}`];

  return (
    <div className={classes.grid}>
      {gridContent.map((column, i) => (
        <div className={columnClass} key={i}>
          {column.map((el) => (
            <div key={el.key}>{el.node}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

ResponsiveGrid.defaultProps = {
  col: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
    default: 1,
  },
};

ResponsiveGrid.propTypes = {
  col: PropTypes.oneOfType([
    PropTypes.exact({
      ...Object.keys(BREAKPOINTS_MAP).reduce(
        (mappedObj, bp) => ({ ...mappedObj, [bp]: PropTypes.number }),
        {}
      ),
      default: PropTypes.number.isRequired,
    }),
    PropTypes.number,
  ]),

  // colXS: PropTypes.number,
  // colSM: PropTypes.number,
  // colMD: PropTypes.number,
  // colLG: PropTypes.number,
  // colXL: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ResponsiveGrid;
