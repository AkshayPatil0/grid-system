import { useState, useEffect } from "react";

const BREAKPOINTS = {
  xs: [320, 480],
  sm: [481, 768],
  md: [769, 1024],
  lg: [1025, 1440],
  xl: [1441],
};

const breakpoints = Object.entries(BREAKPOINTS).map(([bp]) => bp);
const querys = Object.entries(BREAKPOINTS).map(
  ([bp, values]) =>
    `(min-width: ${values[0]}px)${
      values[1] ? ` and (max-width: ${values[1]}px )` : ""
    }`
);

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(Boolean);

  const mediaListener = (mediaIndex) => (media) => {
    if (media.matches) {
      setBreakpoint(breakpoints[mediaIndex]);
    }
  };

  const mediaListeners = querys.map((q, i) => mediaListener(i));
  const medias = querys.map((query) => window.matchMedia(query));

  useEffect(() => {
    medias.forEach((media, index) => {
      if (media.matches) {
        setBreakpoint(breakpoints[index]);
      }
      media.addListener(mediaListeners[index]);
    });
    return () =>
      medias.forEach((media, i) => media.removeListener(mediaListeners[i]));
  }, []);

  return breakpoint;
};

export default useBreakpoint;
