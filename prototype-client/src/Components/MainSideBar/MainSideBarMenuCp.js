import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//Styled-Components
import {
  SidebarMenuWrapper,
  SidebarMenu,
  MoreTitleWrapper,
  MoreTitle,
} from "../../StyledComponents/MainSideBar/MainSideBarMenuCpSt";

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
import { useRecoilState } from "recoil";
import toggleValueAtom from "../../store/ToggleValueAtom";
import ModalOpenAtom from "../../store/ModalOpenAtom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MainSideBarMenuCp = () => {
  const navigate = useNavigate();

  const moreModalRef = useRef(null);
  const moreModalIconRef = useRef(null);

  const [contentsChange, setContentsChange] = useRecoilState(
    toggleValueAtom("contentsChange")
  );

  const [moreModalOpen, setMoreModalOpen] = useRecoilState(
    ModalOpenAtom("moreModal")
  );

  const [postModalOpen, setPostModalOpen] = useRecoilState(
    ModalOpenAtom("makePostModal")
  );

  useEffect(() => {
    if (moreModalOpen) {
      const handleClick = (e) => {
        if (
          !moreModalRef.current.contains(e.target) &&
          !moreModalIconRef.current.contains(e.target)
        ) {
          setMoreModalOpen(!moreModalOpen);
        }
        e.stopPropagation();
      };
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [moreModalOpen]);

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
      <SidebarMenu>
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
