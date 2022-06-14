export const BREAKPOINTS_MAP = {
  xs: [320, 480],
  sm: [481, 768],
  md: [769, 1024],
  lg: [1025, 1440],
  xl: [1441],
};

export const meadiaQuerysMap = Object.fromEntries(
  Object.entries(BREAKPOINTS_MAP).map(([bp, values]) => [
    bp,
    `(min-width: ${values[0]}px)${
      values[1] ? ` and (max-width: ${values[1]}px )` : ""
    }`,
  ])
);
