import { useNavigate } from "react-router-dom";

//Styled-Components
import {
  SidebarMenuWrapper,
  SidebarMenu,
  MoreTitleWrapper,
  MoreTitle,
} from "../../StyledComponents/MainSideBar/MainSideBarMenuCpSt";
import { useRecoilState, useSetRecoilState } from "recoil";

//Icons
import {
  HomeIcon,
  DiaryIcon,
  SearchIcon,
  NewPostIcon,
  MoreIcon,
  KeepDiaryIcon,
  UserIcon,
} from "../../StyledComponents/MainSideBar/MainSideBarMenuIconCpSt";

//Component
import MoreModalCp from "./MoreModalCp";
import SearchModalCp from "./SearchModalCp";

//Atoms
import ModalOpenAtom from "../../store/ModalOpenAtom";

//Customhook
import UserInfoQuery from "../../customHooks/userInfoQuery";

const MainSideBarMenuCp = () => {
  const userInfo = UserInfoQuery();
  const navigate = useNavigate();

  const [moreModalOpen, setMoreModalOpen] = useRecoilState(
    ModalOpenAtom("moreModal")
  );
  const [searchModalOpen, setSearchModalOpen] = useRecoilState(
    ModalOpenAtom("searchModal")
  );

  const setPostModalOpen = useSetRecoilState(ModalOpenAtom("makePostModal"));

  const setLoginRequestMdOpen = useSetRecoilState(
    ModalOpenAtom("loginRequestMd")
  );

  return (
    <SidebarMenuWrapper>
      <SidebarMenu
        onClick={() => {
          navigate("/home");
        }}
      >
        <HomeIcon marginR={"10"} />
        <div>홈</div>
      </SidebarMenu>
      {searchModalOpen && <SearchModalCp />}
      <SidebarMenu
        onClick={(e) => {
          e.stopPropagation();
          if (!searchModalOpen) {
            setSearchModalOpen(true);
          }
        }}
      >
        <SearchIcon marginR={"10"} />
        <div>검색</div>
      </SidebarMenu>
      <SidebarMenu
        onClick={() => {
          navigate("/dashboard/diary");
        }}
      >
        <DiaryIcon marginR={"10"} />
        <div>일기</div>
      </SidebarMenu>
      <SidebarMenu
        onClick={() => {
          if (userInfo.loginCheck) {
            setPostModalOpen(true);
          } else {
            setLoginRequestMdOpen(true);
          }
        }}
      >
        <NewPostIcon marginR={"10"} />
        <div>만들기</div>
      </SidebarMenu>
      <SidebarMenu
        onClick={() => {
          if (userInfo.loginCheck) {
            navigate("/dashboard/make-diary");
          } else {
            setLoginRequestMdOpen(true);
          }
        }}
      >
        <KeepDiaryIcon marginR={"5"} />
        <div>새 일기쓰기</div>
      </SidebarMenu>
      <SidebarMenu
        onClick={() => {
          if (userInfo.loginCheck) {
            navigate("/dashboard/profile");
          } else {
            setLoginRequestMdOpen(true);
          }
        }}
      >
        <UserIcon marginR={"10"} />
        <div>프로필</div>
      </SidebarMenu>
      {moreModalOpen && <MoreModalCp />}
      <SidebarMenu
        onClick={(e) => {
          e.stopPropagation();

          if (!moreModalOpen) {
            setMoreModalOpen(true);
          }
        }}
      >
        <MoreIcon marginR={"10"} />
        <MoreTitleWrapper>
          <MoreTitle>더보기</MoreTitle>
        </MoreTitleWrapper>
      </SidebarMenu>
    </SidebarMenuWrapper>
  );
};

export default MainSideBarMenuCp;
