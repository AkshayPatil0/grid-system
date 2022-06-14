import { useState, useEffect } from "react";
import { meadiaQuerysMap } from "../utils/constants";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(String);

  useEffect(() => {
    const mediaListener = (breakpoint) => (media) => {
      if (media.matches) {
        setBreakpoint(breakpoint);
      }
    };

    const mappedMedias = Object.entries(meadiaQuerysMap).map(
      ([breakpoint, query]) => {
        const media = window.matchMedia(query);
        mediaListener(breakpoint)(media);
        const mappedListener = mediaListener(breakpoint);
        media.addEventListener("change", mappedListener);
        return { media, listener: mappedListener };
      }
    );

    return () =>
      mappedMedias.forEach(({ media, listener }) =>
        media.removeEventListener("change", listener)
      );
  }, []);

  return breakpoint;
};

export default useBreakpoint;
