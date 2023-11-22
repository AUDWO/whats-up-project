import { atomFamily } from "recoil";

const toggleValueAtom = atomFamily({
  key: "toggleValue",
  default: false,
});

export default toggleValueAtom;
