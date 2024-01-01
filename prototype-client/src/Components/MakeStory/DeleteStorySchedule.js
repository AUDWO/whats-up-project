import { useEffect, useState } from "react";
import styled from "styled-components";

//utils
import getFormattedTime from "../../utils/getFormattedTime";
import getPredictedTime from "../../utils/getPredictedTime";
import checkDay from "../../utils/checkDay";

const DeleteStoryScheduled = () => {
  const [inputHour, setInputHour] = useState(0);
  const [inputMinute, setInputMinute] = useState(0);
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const [predictedTime, setPredictedTime] = useState(getPredictedTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
      setPredictedTime(
        getPredictedTime(Number(inputHour), Number(inputMinute))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [inputHour, inputMinute]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>자동 삭제 예약 설정</Title>
        <CurrentTimeTitle>현재 시각</CurrentTimeTitle>
        <CurrentTime>{currentTime}</CurrentTime>
      </TitleWrapper>

      <TimeInputWrapper>
        <InputWrapper>
          <HourInput
            value={inputHour}
            onChange={(e) => {
              if (e.target.value > 23) {
                alert("23시간 59분 내로 설정해주세요!");
                return;
              }
              setInputHour(e.target.value);
            }}
          />
          <TimeUit>시</TimeUit>
        </InputWrapper>
        <InputWrapper>
          <MinuteInput
            value={inputMinute}
            onChange={(e) => {
              if (e.target.value > 59) {
                alert("23시간 59분 내로 설정해주세요!");
                return;
              }
              setInputMinute(e.target.value);
            }}
          />
          <TimeUit>분</TimeUit>
        </InputWrapper>
        <ConsiderationTimeSentence>
          최대 유지 시간 23시 59분
        </ConsiderationTimeSentence>
      </TimeInputWrapper>
      <GuideSentence>
        설정을 한 시간 경과후에 자동으로 스토리는 삭제 됩니다.
      </GuideSentence>
      <GuideSentence>
        만일 시간 설정을 하지 않는다면 23시간 59분 뒤에 자동 삭제됩니다.
      </GuideSentence>
      <PredictedTimeWrapper>
        <PredictedTimeTitle>삭제 예상 시각</PredictedTimeTitle>
        <PredictedTime>
          {checkDay(Number(inputHour), Number(inputMinute), predictedTime)
            ? "내일"
            : "오늘"}
        </PredictedTime>
        <PredictedTime>{predictedTime}</PredictedTime>
      </PredictedTimeWrapper>
    </Wrapper>
  );
};

export default DeleteStoryScheduled;

const Wrapper = styled.div`
  width: 380px;
  height: 180px;
  border-top: 1px solid gray;
  padding-top: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const Title = styled.div`
  font-weight: 700;
`;

const CurrentTimeTitle = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
const CurrentTime = styled.div``;

const InputWrapper = styled.div`
  margin-left: 25px;
`;

const TimeUit = styled.span`
  margin-left: 5px;
`;

const HourInput = styled.input`
  width: 50px;
  height: 25px;
  font-size: 15px;
`;

const MinuteInput = styled.input`
  width: 50px;
  height: 25px;
  font-size: 15px;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ConsiderationTimeSentence = styled.div`
  font-size: 15px;
  color: gray;
  margin-left: 10px;
`;

const GuideSentence = styled.div`
  padding: 5px 5px 0px 12px;
  font-size: 15px;
`;

const PredictedTimeWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
const PredictedTimeTitle = styled.div`
  margin-right: 5px;
`;

const PredictedTime = styled.div`
  margin-left: 5px;
`;
