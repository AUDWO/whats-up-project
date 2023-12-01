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

const MoreContactCp = ({ contentInfo, reactType: moreType }) => {
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
    console.log("MORE MORE MORE MORE");
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
    return new Promise((resolve) => resolve);
  };

  //처음 아이콘을 클릭하면 nextclick state에 type이 담기고 새로운 아이콘을 클릭하면
  //새로 클릭한 아이콘은 clicked state에 담기게 된다.
  const handleReactFilterType = async (type) => {
    //기존에 클릭했던 반응을 재클릭하면 반응이 삭제됨.
    if (nextClick === type) {
      updateReactionArr(nextClick, "subtract");
      setNextClick("");
      setPrevClick("");
      handleUnReact();

      return;
    }
    console.log(nextClick, "nextClick1");
    console.log(prevClick, "prevClick1");
    if (nextClick !== type && nextClick !== "") {
      console.log(nextClick, "nextClick2");
      console.log(prevClick, "prevClick2");
      const a = await updateReactionArr(nextClick, "subtract");
      setPrevClick(nextClick);
    }
    console.log(nextClick, "nextClick3");
    console.log(prevClick, "prevClick3");
    setNextClick(type);
    const a = await updateReactionArr(type, "add");
    handleReact(type);
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
    try {
      const response = await axios.delete(
        `/delete/${moreType}-react/${contentInfo.id}`
      );

      //story는 반응 수를 알 필요가 없기 때문에 reactCount정보는 오직 diary를 다룰때만 다룸.
      if (moreType === "diary") {
        const response2 = await axios.patch(
          `/update/${moreType}-react-info/${contentInfo.id}`,
          {
            reactCount: onlyDiaryInfo.reactCount - 1,
          }
        );
        setDiaryInfoUpdate(!diaryInfoUpdate);
      }
      setReactUpdate(!reactUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReact = async (type) => {
    //기존에 반응이 있을때만 동작
    if (reactInfo.length >= 1) {
      /*원래는 proClick === reactInfo[0].type 이어여 함
      setState의 비동기 방식으로 nextClick이 바로 반영이 안됨*/
      if (prevClick === reactInfo[0].type) {
        const response = await axios.delete(
          `/delete/${moreType}-react/${contentInfo.id}`
        );

        if (moreType === "diary") setDiaryInfoUpdate(!diaryInfoUpdate);
      }
    }

    try {
      const response = await axios.post(
        `/post/${moreType}-react/${contentInfo.id}`,
        {
          type: type,
        }
      );

      //반응이 없었거나 없을때만 reactCount를 증가시킨다.
      if (moreType === "diary") {
        if (!(reactInfo.length >= 1)) {
          handleSubmitDiaryReactInfo("add");
        }
        setDiaryInfoUpdate(!diaryInfoUpdate);
      }
      //setReactUpdate(!reactUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  //api 폴더로 이동 예정
  /*
  const handleSubmitReact = async (reactType, contentInfo, type) => {
    try {
      await axios.post(`/post/${reactType}-react/${contentInfo.id}`, {
        type: type,
      });
    } catch (error) {
      console.error(error);
    }
  };*/

  //api 폴더로 이동 예정
  /*const handleSubmitUnReact = async (reactType, contentInfo) => {
    try {
      const response = await axios.delete(
        `/delete/${reactType}-react/${contentInfo.id}`
      );
    } catch (error) {
      console.error(error);
    }
  };*/

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
