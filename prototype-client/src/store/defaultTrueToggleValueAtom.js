import { atomFamily } from "recoil";

const defaultTrueToggleValueAtom = atomFamily({
  key: "toggleValue",
  default: true,
});

export default defaultTrueToggleValueAtom;
