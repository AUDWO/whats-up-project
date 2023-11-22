import { atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const commentCountAtom = atomFamily({
  key: "commentCount",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export default commentCountAtom;
