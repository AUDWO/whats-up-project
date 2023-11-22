import { atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const postImgAtom = atomFamily({
  key: "postImg",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default postImgAtom;
