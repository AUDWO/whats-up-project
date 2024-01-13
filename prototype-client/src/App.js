import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./App.css";
import { Suspense, lazy } from "react";

// Styled-Components
import GlobalStyles from "./StyledComponents/GlobalStyles";

//Components
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

//Atom
import ModalOpenAtom from "./store/ModalOpenAtom";

import PageWrapper from "./PageWrapper";
import DashboardWrapper from "./DashboardWrapper";
import ProtectedRoute from "./routes/ProtectedRoute";

const ProfileConfigMd = lazy(() =>
  import("./Components/Profile/ProfileConfigModal")
);
const ProfileContentConfigMd = lazy(() =>
  import("./Components/Profile/ProfileContentConfigModalCp")
);
const MakePostMd = lazy(() => import("./Components/MakePost/MakePostModalCp"));
const MakeStoryMd = lazy(() =>
  import("./Components/MakeStory/MakeStoryModalCp")
);
const LoginRequestMd = lazy(() => import("./modals/LoginRequestMd"));

const Home = lazy(() => import("./pages/Home"));
const Diary = lazy(() => import("./pages/Diary"));
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

  const LoginRequestMdOpen = useRecoilValue(ModalOpenAtom("loginRequestMd"));

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Suspense fallback={<div></div>}>
        {PostModalOpen && <MakePostMd />}
        {StoryModalOpen && <MakeStoryMd />}
        {ProfileConfigModalOpen && <ProfileConfigMd />}
        {ContentConfigModalOpen && <ProfileContentConfigMd />}
        {LoginRequestMdOpen && <LoginRequestMd />}
      </Suspense>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<SignUp />} />
          <Route path="more-diary/:diaryId" element={<MoreDiary />} />
          <Route path="more-story/:storyId" element={<MoreStory />} />
          <Route path="/dashboard" element={<DashboardWrapper />}>
            <Route path="diary" element={<Diary />} />
            <Route
              path="profile/:userNickname/:otherUserId"
              element={<Profile />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="make-diary" element={<MakeDiary />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// {LoginRequestMdOpen && <LoginRequestMd />}
