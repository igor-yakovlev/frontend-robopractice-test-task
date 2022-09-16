export function getMinutes(time) {
  const timeArr = time.split('-');
  const minutes = timeArr[0] * 60 + +timeArr[1];
  return minutes;
}

export  function setTimeFormat (time) {
  return `${Math.floor((time) / 60)}:${(time) % 60 < 10 ? `0${(time) % 60}` : (time) % 60}`
}
