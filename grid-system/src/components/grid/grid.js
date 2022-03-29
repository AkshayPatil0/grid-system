import React from "react";
import PropTypes from "prop-types";
import produce from "immer";

import classes from "./grid.scss";
import useBreakpoint from "../../hooks/useBreakpoint";

const makeGrid = (elements, col) => {
  return elements.reduce((grid, node, elementIndex) => {
    let rowIndex = elementIndex % col;
    if (grid[rowIndex]) {
      return produce(grid, (draft) => {
        draft[rowIndex].push({ node, key: elementIndex });
      });
    }
    return produce(grid, (draft) => {
      draft[rowIndex] = [{ node, key: elementIndex }];
    });
  }, []);
};
function Grid(props) {
  const { children, col } = props;

  const gridContent = makeGrid(React.Children.toArray(children), col);

  const breakpoint = useBreakpoint();

  const columnClass =
    classes.grid__column + " " + classes[`grid__column__${col}`];

  return (
    <div className={classes.grid}>
      {gridContent.map((column, i) => (
        <div className={columnClass} key={i}>
          {column.map((el) => (
            <div key={el.key}>{el.node}</div>
          ))}{" "}
        </div>
      ))}
    </div>
  );
}

Grid.propTypes = {
  col: PropTypes.number,
  colXs: PropTypes.number,
  colSm: PropTypes.number,
  colMd: PropTypes.number,
  colLg: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default Grid;
