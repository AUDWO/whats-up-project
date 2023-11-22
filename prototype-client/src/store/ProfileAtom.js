import { atom } from "recoil";
import Profile from "../Components/Profile";

const ProfileAtom = atom({
  key: "profile",
  default: null,
});

export default Profile;
