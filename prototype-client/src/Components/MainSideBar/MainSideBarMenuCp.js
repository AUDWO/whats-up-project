import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

//Styled-Components
import {
  SidebarMenuWrapper,
  SidebarMenu,
  MoreTitleWrapper,
  MoreTitle,
} from "../../StyledComponents/MainSideBar/MainSideBarMenuCpSt";
import { useRecoilState } from "recoil";

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
import toggleValueAtom from "../../store/ToggleValueAtom";
import ModalOpenAtom from "../../store/ModalOpenAtom";

//Custom hook
import useModalOutClickEffect from "../../customHooks/useModalEffect";

const MainSideBarMenuCp = () => {
  const navigate = useNavigate();

  const [contentsChange, setContentsChange] = useRecoilState(
    toggleValueAtom("contentsChange")
  );

  const [moreModalOpen, setMoreModalOpen] = useRecoilState(
    ModalOpenAtom("moreModal")
  );

  const [searchModalOpen, setSearchModalOpen] = useRecoilState(
    ModalOpenAtom("searchModal")
  );

  const [postModalOpen, setPostModalOpen] = useRecoilState(
    ModalOpenAtom("makePostModal")
  );

  const moreModalRef = useRef(null);
  const moreModalIconRef = useRef(null);

  const searchModalRef = useRef(null);
  const searchModalIconRef = useRef(null);

  useModalOutClickEffect([moreModalRef, moreModalIconRef], () => {
    setMoreModalOpen(!moreModalOpen);
  });
  useModalOutClickEffect([searchModalRef, searchModalIconRef], () => {
    setSearchModalOpen(!searchModalOpen);
  });

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
      {searchModalOpen && <SearchModalCp ref={searchModalRef} />}
      <SidebarMenu
        ref={searchModalIconRef}
        onClick={() => {
          if (searchModalOpen) {
            setSearchModalOpen(false);
          }
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
          setPostModalOpen(!postModalOpen);
        }}
      >
        <NewPostIcon marginR={"10"} />
        <div>만들기</div>
      </SidebarMenu>
      <SidebarMenu
        onClick={() => {
          navigate("/dashboard/make-diary");
        }}
      >
        <KeepDiaryIcon marginR={"5"} />
        <div>새 일기쓰기</div>
      </SidebarMenu>
      <SidebarMenu
        onClick={() => {
          navigate("/dashboard/profile");
          setContentsChange(!contentsChange);
        }}
      >
        <UserIcon marginR={"10"} />
        <div>프로필</div>
      </SidebarMenu>
      {moreModalOpen && <MoreModalCp ref={moreModalRef} />}
      <SidebarMenu
        ref={moreModalIconRef}
        onClick={() => {
          if (moreModalOpen) {
            setMoreModalOpen(false);
          }
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
