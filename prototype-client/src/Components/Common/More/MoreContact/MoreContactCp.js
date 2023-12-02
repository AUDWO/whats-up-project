import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";

//Styled-Component
import {
  MoreContact,
  ContactIconCountNumber,
  ContactIconWrapper,
  GoodIcon,
  SmileIcon,
  HearIcon,
  SadIcon,
} from "../../../../StyledComponents/CommonCpStyle/More/MoreContactCpSt";

//Atom
import userInfoAtom from "../../../../store/userState/userAtom";

const MoreContactCp = ({ contentInfo, moreType }) => {
  const [likeReactionArr, setLikeReactionArr] = useState([]);
  const [heartReactionArr, setHeartReactionArr] = useState([]);
  const [smileReactionArr, setSmileReactionArr] = useState([]);
  const [sadReactionArr, setSadReactionArr] = useState([]);

  const [onlyDiaryInfo, setOnlyDiaryInfo] = useState({});

  const [prevClick, setPrevClick] = useState("");
  const [nextClick, setNextClick] = useState("");

  //reactInfo:content에 대하여 자신의 react 정보가 담겨 있는 객체
  //reactInfo를 통해 content에 자신이 반응을 했는지 알 수 있다.
  const [reactInfo, setReactInfo] = useState({});
  const userInfo = useRecoilValue(userInfoAtom);

  const [reactUpdate, setReactUpdate] = useState(false);
  const [diaryInfoUpdate, setDiaryInfoUpdate] = useState(false);

  //react의 업데이트 된 정보를 참조하기 때문에

  useEffect(() => {
    console.log("diaryInfoUpdate!!!!");
    const fetchOnlyDiaryInfoData = async () => {
      try {
        const response = await axios.get(
          `/page/render-only-diaryinfo/${contentInfo.id}`
        );
        setOnlyDiaryInfo({ ...response.data[0] });
      } catch (error) {
        console.error(error);
      }
    };

    fetchOnlyDiaryInfoData();
  }, [diaryInfoUpdate]);

  useEffect(() => {
    const fetchStoryReacts = async () => {
      try {
        const reactsResponse = await axios.get(
          `/page/render-${moreType}-react/${contentInfo.id}`
        );

        const myResponse = reactsResponse.data.filter(
          (react) => react.reacter === userInfo.id
        );

        setReactInfo([...myResponse]);

        const sadReact = reactsResponse.data.filter(
          (react) => react.type === "sad"
        );
        setSadReactionArr([...sadReact].length);

        const smileReact = reactsResponse.data.filter(
          (react) => react.type === "smile"
        );
        setSmileReactionArr([...smileReact].length);

        const heartReact = reactsResponse.data.filter(
          (react) => react.type === "heart"
        );
        setHeartReactionArr([...heartReact].length);

        const likeReact = reactsResponse.data.filter(
          (react) => react.type === "like"
        );
        setLikeReactionArr([...likeReact].length);

        if (myResponse.length > 0 && myResponse[0].type) {
          setNextClick(myResponse[0].type);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStoryReacts();
  }, []);

  const updateReactionArr = (type, actType) => {
    const reactionArr = {
      smile: setSmileReactionArr,
      like: setLikeReactionArr,
      heart: setHeartReactionArr,
      sad: setSadReactionArr,
    }[type];

    if (reactionArr) {
      if (actType === "add") reactionArr((prev) => prev + 1);
      if (actType === "subtract") reactionArr((prev) => prev - 1);
    }
  };

  const handleReactFilterType = async (type) => {
    //기존에 클릭했던 반응을 재클릭할 때
    if (nextClick === type) {
      updateReactionArr(nextClick, "subtract");
      setNextClick("");
      setPrevClick("");
      handleUnReact();
      return;
    }
    //기존에 이미 선택된 반응이 있고 다른 반응을 선택할 때
    if (nextClick !== type && nextClick !== "") {
      handleUnReact();
      updateReactionArr(nextClick, "subtract");
      setPrevClick(nextClick);
    }
    //기존에 반응이 없고 새로운 반응을 추가할 때
    handleReact(type);
    setNextClick(type);
    updateReactionArr(type, "add");
  };

  //다이어리는 배열필터 때문에 반응수가 필요함 => 다이어리 반응 수는 정보를 실시간으로 전달해주는 함수
  //(api폴더로 이동 예정)
  const handleSubmitDiaryReactInfo = async (type) => {
    try {
      if (type === "add")
        await axios.patch(`/update/${moreType}-react-info/${contentInfo.id}`, {
          reactCount: onlyDiaryInfo.reactCount + 1,
        });
      if (type === "subtract")
        await axios.patch(`/update/${moreType}-react-info/${contentInfo.id}`, {
          reactCount: onlyDiaryInfo.reactCount - 1,
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnReact = async () => {
    handleSubmitUnReact();
    //story는 반응 수를 알 필요가 없기 때문에 reactCount정보는 오직 diary를 다룰때만 다룸.
    if (moreType === "diary") {
      handleSubmitDiaryReactInfo("subtract");
      setDiaryInfoUpdate(!diaryInfoUpdate);
    }
  };

  const handleReact = async (type) => {
    handleSubmitReact(type);
    //반응이 없었거나 없을때만 reactCount를 증가시킨다.
    if (moreType === "diary") {
      if (!(reactInfo.length >= 1)) {
        handleSubmitDiaryReactInfo("add");
        setDiaryInfoUpdate(!diaryInfoUpdate);
      }
    }
  };

  //api 폴더로 이동 예정

  const handleSubmitReact = async (type) => {
    console.log(moreType, "moreType");
    console.log(contentInfo, "contentInfo");
    try {
      const reponse = await axios.post(
        `/post/${moreType}-react/${contentInfo.id}`,
        {
          type: type,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  //api 폴더로 이동 예정
  const handleSubmitUnReact = async () => {
    try {
      const response = await axios.delete(
        `/delete/${moreType}-react/${contentInfo.id}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MoreContact>
      <ContactIconWrapper
        onClick={() => {
          handleReactFilterType("like");
        }}
        nextClick={nextClick}
        backC={"#3182f6"}
      >
        <GoodIcon />
        <ContactIconCountNumber nextClick={nextClick} backC={"#a64eff"}>
          {likeReactionArr}
        </ContactIconCountNumber>
      </ContactIconWrapper>
      <ContactIconWrapper
        onClick={() => {
          handleReactFilterType("heart");
        }}
        nextClick={nextClick}
        backC={"#ed203d"}
      >
        <HearIcon />
        <ContactIconCountNumber nextClick={nextClick} backC={"#a64eff"}>
          {heartReactionArr}
        </ContactIconCountNumber>
      </ContactIconWrapper>
      <ContactIconWrapper
        onClick={() => {
          handleReactFilterType("smile");
        }}
        nextClick={nextClick}
        backC={"#f7dd07"}
      >
        <SmileIcon />
        <ContactIconCountNumber nextClick={nextClick} backC={"#a64eff"}>
          {smileReactionArr}
        </ContactIconCountNumber>
      </ContactIconWrapper>
      <ContactIconWrapper
        onClick={() => {
          handleReactFilterType("sad");
        }}
        nextClick={nextClick}
        backC={"#a64eff"}
      >
        <SadIcon />
        <ContactIconCountNumber nextClick={nextClick} backC={"#a64eff"}>
          {sadReactionArr}
        </ContactIconCountNumber>
      </ContactIconWrapper>
    </MoreContact>
  );
};

export default MoreContactCp;
