import { useEffect } from "react";

const useModalOutClickEffect = (modalRef, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (!modalRef.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useModalOutClickEffect;
