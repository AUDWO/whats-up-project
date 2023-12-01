import styled from "styled-components";

import ProfileWrapper from "../HomeStyle/ProfileStyle/ProfileWrapper";

//import ProfileImg from "../HomeStyle/ProfileStyle/ProfileImg";

export const PostInfoWrapper = styled.div`
  z-index: 2;
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  & ${ProfileWrapper} {
    flex-direction: column;
    margin-top: 30px;
    align-items: center;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  width: 90px;
  margin-top: 30px;
`;

export const CountNumber = styled.div`
  margin-left: 10px;
  width: 40px;
`;

/*
& ${ProfileImg} {
  margin-bottom: 20px;
}*/
