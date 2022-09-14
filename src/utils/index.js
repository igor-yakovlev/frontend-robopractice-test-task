export function getMinutes(time) {
  const timeArr = time.split('-');
  const minutes = timeArr[0] * 60 + +timeArr[1];
  return minutes;
}
