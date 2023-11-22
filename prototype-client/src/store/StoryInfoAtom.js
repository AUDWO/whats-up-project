import { atomFamily } from "recoil";

const storyInfoAtom = atomFamily({
  key: "storyInfo",
  default: [],
});

export default storyInfoAtom;
