const checkDay = (inputHour, inputMinute, predictedTime) => {
  const now = new Date();
  let nowHour = now.getHours();
  let nowMinute = now.getMinutes();
  if (nowMinute + inputMinute > 59) {
    nowHour = nowHour + 1;
  }

  if (
    nowHour + inputHour > 23 ||
    (!inputHour && !inputMinute) ||
    predictedTime === "00:00"
  ) {
    return true;
  }
  return false;
};

export default checkDay;
