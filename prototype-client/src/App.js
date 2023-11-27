import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./App.css";

import { QueryClientProvider, QueryClient } from "react-query";

// Styled-Components
import GlobalStyles from "./StyledComponents/GlobalStyles";

//Components
import Login from "./Views/Login";
import Home from "./Views/Home";
import SignUp from "./Views/SignUp";
import Diary from "./Views/Diary";
import MoreDiary from "./Views/MoreDiary";
import MakeDiary from "./Views/MakeDiary";
import Profile from "./Views/Profile";
import MoreStory from "./Views/MoreStory";

//Modal Components
import MakeStoryModalCp from "./Components/MakeStory/MakeStoryModalCp";
import MakePostModalCp from "./Components/MakePost/MakePostModalCp";
import ProfileContentConfigModalCp from "./Components/Profile/ProfileContentConfigModalCp";
import ProfileConfigModal from "./Components/Profile/ProfileConfigModal";

//Atom
import ModalOpenAtom from "./store/ModalOpenAtom";

import PageWrapper from "./PageWrapper";
import DashboardWrapper from "./DashboardWrapper";

const queryClient = new QueryClient();

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
    //<QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalStyles />
      {PostModalOpen && <MakePostModalCp />}
      {StoryModalOpen && <MakeStoryModalCp />}
      {ProfileConfigModalOpen && <ProfileConfigModal />}
      {ContentConfigModalOpen && <ProfileContentConfigModalCp />}
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Login />} />
          <Route path="join" element={<SignUp />} />
          <Route path="more-diary/:diaryId" element={<MoreDiary />} />
          <Route path="more-story/:storyId" element={<MoreStory />} />
          <Route path="home" element={<Home />} />
          <Route path="/dashboard" element={<DashboardWrapper />}>
            <Route path="diary" element={<Diary />} />
            <Route path="make-diary" element={<MakeDiary />} />
            <Route path="profile" element={<Profile />} />
            <Route path="make-post" element={<MakePostModalCp />} />
            <Route
              path="profile/:userNickname/:otherUserId"
              element={<Profile />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    //</QueryClientProvider>
  );
}

export default App;
