import { atomFamily } from "recoil";

const imgUrlAtom = atomFamily({
  key: "imgUrl",
  default: false,
});

export default imgUrlAtom;
