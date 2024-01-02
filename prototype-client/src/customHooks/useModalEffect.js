import { useEffect } from "react";

const useModalOutClickEffect = (refs, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (refs.every((ref) => ref && !ref.current.contains(e.target))) {
        callback();
      }
      e.stopPropagation();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs]);
};

export default useModalOutClickEffect;
