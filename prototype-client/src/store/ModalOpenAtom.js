import { atomFamily } from "recoil";

const ModalOpenAtom = atomFamily({
  key: "modalOpen",
  default: false,
});

export default ModalOpenAtom;
