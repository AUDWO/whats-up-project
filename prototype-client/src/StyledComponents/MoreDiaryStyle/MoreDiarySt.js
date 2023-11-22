import styled from "styled-components";
import SectionContainer from "../HomeStyle/SectionContainer";

export const DiaryNav = styled.div`
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px 20px 5px 20px;
`;

export const DiaryDate = styled.div`
  font-size: 25px;
  font-weight: 300;
`;

export const DiaryContent = styled.div`
  width: 100%;
  height: auto;
  border: none;
  &:focus {
    outline: none;
  }
  font-size: 17px;
  font-weight: 400;
  line-height: 2;
  margin-bottom: 20px;
`;

export const DiaryContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const DiaryImg = styled.img`
  min-width: 500px;
  max-width: 600px;
  height: auto;
`;

export const DiaryWrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex: 1;
  width: 700px;
  flex-direction: column;
  height: auto;
  border-left: 1px solid #dddee3;
`;
export const NoDiaryImg = styled.div`
  width: 600px;
  height: 500px;
  color: black;
  background-color: #f7dd07;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150px;
  font-weight: 700;
`;

export const Section33 = styled.div`
  width: 340px;
`;

export const SectionContainer2 = styled(SectionContainer)`
  align-items: center;
  flex: ${(props) => props.flex};
  padding: 60px 20px 60px 20px;
  border: 1px solid red;
  height: auto;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export const HomeWrapper2 = styled.div`
  width: 100%;
  height: auto;
  display: flex;
`;

export const MoreDiaryTitle = styled.span`
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 50px;
`;

export const MoreProfileWrapper = styled.div`
  display: flex;
`;

export const MoreProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
`;

export const MoreProfileName = styled.div`
  font-size: 15px;
  margin-left: 10px;
`;

export const DiaryImgWrapper = styled.div`
  width: 100%;
  height: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
