import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./App.css";
import { Suspense, lazy } from "react";

// Styled-Components
import GlobalStyles from "./StyledComponents/GlobalStyles";

//Components
import Login from "./pages/Login";
//import Home from "./pages/Home";
//import SignUp from "./pages/SignUp";
//import Diary from "./pages/Diary";
//import MoreDiary from "./pages/MoreDiary";
//import MoreStory from "./pages/MoreStory";
//import MakeDiary from "./pages/MakeDiary";
//import Profile from "./pages/Profile";

import Error from "./pages/Error";

//Atom
import ModalOpenAtom from "./store/ModalOpenAtom";

import PageWrapper from "./PageWrapper";
import DashboardWrapper from "./DashboardWrapper";
import { UserInfoProvider } from "./contextApi/UserInfoProvider";

//Modal Components
//import MakeStoryModalCp from "./Components/MakeStory/MakeStoryModalCp";
//import MakePostModalCp from "./Components/MakePost/MakePostModalCp";
//import ProfileContentConfigModalCp from "./Components/Profile/ProfileContentConfigModalCp";
//import ProfileConfigModal from "./Components/Profile/ProfileConfigModal";

const ProfileConfigModal = lazy(() =>
  import("./Components/Profile/ProfileConfigModal")
);
const ProfileContentConfigModalCp = lazy(() =>
  import("./Components/Profile/ProfileContentConfigModalCp")
);
const MakePostModalCp = lazy(() =>
  import("./Components/MakePost/MakePostModalCp")
);
const MakeStoryModalCp = lazy(() =>
  import("./Components/MakeStory/MakeStoryModalCp")
);

const Home = lazy(() => import("./pages/Home"));
const Diary = lazy(() => import("./pages/Diary"));
const SignUp = lazy(() => import("./pages/SignUp"));
const MoreDiary = lazy(() => import("./pages/MoreDiary"));
const MoreStory = lazy(() => import("./pages/MoreStory"));
const MakeDiary = lazy(() => import("./pages/MakeDiary"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const StoryModalOpen = useRecoilValue(ModalOpenAtom("makeStoryModal"));
  const PostModalOpen = useRecoilValue(ModalOpenAtom("makePostModal"));
  const ProfileConfigModalOpen = useRecoilValue(
    ModalOpenAtom("profileConfigModal")
  );
  const ContentConfigModalOpen = useRecoilValue(
    ModalOpenAtom("profileContentConfigModal")
  );

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserInfoProvider>
        <Suspense fallback={<div>Loading...</div>}>
          {PostModalOpen && <MakePostModalCp />}
          {StoryModalOpen && <MakeStoryModalCp />}
          {ProfileConfigModalOpen && <ProfileConfigModal />}
          {ContentConfigModalOpen && <ProfileContentConfigModalCp />}
        </Suspense>
      </UserInfoProvider>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Login />} />
          <Route path="join" element={<SignUp />} />
          <Route path="more-diary/:diaryId" element={<MoreDiary />} />
          <Route path="more-story/:storyId" element={<MoreStory />} />
          <Route path="home" element={<Home />} />
          <Route path="error" element={<Error />} />
          <Route path="/dashboard" element={<DashboardWrapper />}>
            <Route path="diary" element={<Diary />} />
            <Route path="make-diary" element={<MakeDiary />} />
            <Route path="make-post" element={<MakePostModalCp />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="profile/:userNickname/:otherUserId"
              element={<Profile />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
