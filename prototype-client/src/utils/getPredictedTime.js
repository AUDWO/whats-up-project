const getPredictedTime = (inputHour, inputMinute) => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (inputHour || inputMinute) {
    hours = hours + Number(inputHour);
    minutes = minutes + Number(inputMinute);
    if (minutes > 59) {
      hours = hours + 1;
      minutes = minutes - 60;
    }
    if (hours > 23) {
      hours = hours - 24;
    }
  } else {
    minutes = minutes - 1;
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

export default getPredictedTime;
