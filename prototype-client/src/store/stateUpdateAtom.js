import { atomFamily } from "recoil";

const stateUpdateAtom = atomFamily({
  key: "stateUpdate",
  default: false,
});

export default stateUpdateAtom;
