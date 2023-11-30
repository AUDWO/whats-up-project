import { useEffect, useRef } from "react";

const useOnlyByDepsEffect = (callback, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount) callback();
    if (!didMount) didMount.current = true;
  }, deps);
};

export default useOnlyByDepsEffect;
