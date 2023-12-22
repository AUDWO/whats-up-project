import React, { forwardRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

//Styled-Components
import {
  MoreModalWrapper,
  MoreOptionWrapper,
  MoreOption,
} from "../../StyledComponents/MainSideBar/MoreModalCpSt";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";
//import { ActionUserInfo } from "../../contextApi/UserInfoProvider";

const MoreModalCp = forwardRef((props, ref) => {
  const navigate = useNavigate();

  //const setUserInfo = ActionUserInfo();

  const handleLogOut = async () => {
    const response = await axios.get("/auth/logout");
    //setUserInfo((prev) => {});
    setMoreModalOpen(false);
    navigate("/");
  };

  const setMoreModalOpen = useSetRecoilState(ModalOpenAtom("moreModal"));
  return (
    <MoreModalWrapper ref={ref}>
      <MoreOptionWrapper>
        <MoreOption>문제신고</MoreOption>
      </MoreOptionWrapper>
      <MoreOptionWrapper>
        <MoreOption>커뮤니티</MoreOption>
      </MoreOptionWrapper>
      <MoreOptionWrapper
        onClick={() => {
          handleLogOut();
        }}
      >
        <MoreOption>로그아웃</MoreOption>
      </MoreOptionWrapper>
    </MoreModalWrapper>
  );
});

export default MoreModalCp;
