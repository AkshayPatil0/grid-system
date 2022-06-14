import produce from "immer";

export const makeGrid = (elements, col) => {
  console.log("haha");
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

export const getResponsiveColCount = (col, breakpoint) => {
  if (typeof col === "object") {
    if (!breakpoint) return col.default;
    return col[breakpoint] || col.default;
  }

  if (typeof col === "number") return col;
};
