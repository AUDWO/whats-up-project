import React, { useEffect, useState } from "react";
import axios from "axios";

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

import { useUserInfoValue } from "../../../../contextApi/UserInfoProvider";
import { useQuery } from "@tanstack/react-query";
import CustomUseMutation from "../../../../customHooks/CustomUseMutation";

const MoreContactCp = ({ contentInfo, moreType }) => {
  const [likeReactionCount, setLikeReactionCount] = useState(0);
  const [heartReactionCount, setHeartReactionCount] = useState(0);
  const [smileReactionCount, setSmileReactionCount] = useState(0);
  const [sadReactionCount, setSadReactionCount] = useState(0);

  const [reactionCounts, setReactionCounts] = useState({
    like: 0,
    sad: 0,
    smile: 0,
    heart: 0,
  });

  const [prevClick, setPrevClick] = useState("");
  const [nextClick, setNextClick] = useState("");

  //reactInfo:content에 대하여 자신의 react 정보가 담겨 있는 객체
  //reactInfo를 통해 content에 자신이 반응을 했는지 알 수 있다.
  const [myReactInfo, setMyReactInfo] = useState({});

  const userInfo = useUserInfoValue();

  //react의 업데이트 된 정보를 참조하기 때문에

  useEffect(() => {
    const fetchStoryReacts = async () => {
      try {
        const reactsResponse = await axios.get(
          `/page/render-${moreType}-react/${contentInfo.id}`
        );

        const myResponse = reactsResponse.data.filter(
          (react) => react.reacter === userInfo.id
        );

        setMyReactInfo([...myResponse]);

        const sadReact = reactsResponse.data.filter(
          (react) => react.type === "sad"
        );
        setSadReactionCount([...sadReact].length);

        const smileReact = reactsResponse.data.filter(
          (react) => react.type === "smile"
        );
        setSmileReactionCount([...smileReact].length);

        const heartReact = reactsResponse.data.filter(
          (react) => react.type === "heart"
        );
        setHeartReactionCount([...heartReact].length);

        const likeReact = reactsResponse.data.filter(
          (react) => react.type === "like"
        );
        setLikeReactionCount([...likeReact].length);

        if (myResponse.length > 0 && myResponse[0].type) {
          setNextClick(myResponse[0].type);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStoryReacts();
  }, []);

  /*
  useEffect(() => {
    const fetchStoryReacts = async () => {
      try {
        const reactsResponse = await axios.get(
          `/page/render-${moreType}-react/${contentInfo.id}`
        );
        if (reactsResponse.data.length >= 1) {
          reactsResponse.data.forEach((diaryInfo) => {
            const type = diaryInfo.type;
            const updateValue = reactionCounts[type] + 1;
            setReactionCounts((prev) => ({ ...prev, [type]: updateValue }));
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStoryReacts();
  }, []);*/

  const updateReactionArr = (type, actType) => {
    const reactionArr = {
      smile: setSmileReactionCount,
      like: setLikeReactionCount,
      heart: setHeartReactionCount,
      sad: setSadReactionCount,
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

  // Diary -------------------------------
  //다이어리는 배열필터 때문에 반응수가 필요함 => 다이어리 반응 수는 정보를 실시간으로 전달해주는 함수
  //(api폴더로 이동 예정)

  const fetchOnlyDiaryInfoData = async () => {
    try {
      return await axios.get(`/page/render-only-diaryinfo/${contentInfo.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const { data: diaryInfo } = useQuery({
    queryKey: [`diaryInfo-${contentInfo.id}`],
    queryFn: fetchOnlyDiaryInfoData,
    enabled: moreType === "diary",
  });

  const updateDiaryReactInfo = async (type) => {
    try {
      if (type === "add")
        await axios.patch(`/update/${moreType}-react-info/${contentInfo.id}`, {
          reactCount: diaryInfo?.data[0].reactCount + 1,
        });
      if (type === "subtract")
        await axios.patch(`/update/${moreType}-react-info/${contentInfo.id}`, {
          reactCount: diaryInfo?.data[0].reactCount - 1,
        });
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: diaryReactInfoMutation } = CustomUseMutation(
    (param) => updateDiaryReactInfo(param.type),
    [`diaryInfo-${contentInfo.id}`]
  );
  // Diary -------------------------------

  const handleUnReact = async () => {
    handleSubmitUnReact();
    //story는 반응 수를 알 필요가 없기 때문에 reactCount정보는 오직 diary를 다룰때만 다룸.
    if (moreType === "diary") {
      diaryReactInfoMutation({ type: "subtract" });
    }
  };

  const handleReact = async (type) => {
    handleSubmitReact(type);
    //반응이 없었거나 없을때만 reactCount를 증가시킨다.
    if (moreType === "diary") {
      if (!(myReactInfo.length >= 1)) {
        diaryReactInfoMutation({ type: "add" });
      }
    }
  };

  //api 폴더로 이동 예정
  const handleSubmitReact = async (type) => {
    try {
      await axios.post(`/post/${moreType}-react/${contentInfo.id}`, {
        type: type,
      });
    } catch (error) {
      console.error(error, "Submit UnReact - Error");
    }
  };

  //api 폴더로 이동 예정
  const handleSubmitUnReact = async () => {
    try {
      await axios.delete(`/delete/${moreType}-react/${contentInfo.id}`);
    } catch (error) {
      console.error(error, "Submit UnReact - Error");
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
          {likeReactionCount}
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
          {heartReactionCount}
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
          {smileReactionCount}
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
          {sadReactionCount}
        </ContactIconCountNumber>
      </ContactIconWrapper>
    </MoreContact>
  );
};

export default MoreContactCp;
