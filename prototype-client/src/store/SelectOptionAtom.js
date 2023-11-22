import { atomFamily } from "recoil";

const selectOptionAtom = atomFamily({
  key: "selectOption",
  default: false,
});

export default selectOptionAtom;
