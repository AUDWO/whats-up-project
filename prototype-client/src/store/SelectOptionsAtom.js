import { atomFamily } from "recoil";

const selectOptionsAtom = atomFamily({
  key: "selectOptions",
  default: {},
});

export default selectOptionsAtom;
