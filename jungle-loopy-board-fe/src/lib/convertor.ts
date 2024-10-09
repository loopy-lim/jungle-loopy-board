const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;

export const unixtimeConvertorToKorean = (diff: number) => {

  if (diff < MINUTE) {
    return "방금 전";
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)}분 전`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}시간 전`;
  } else if (diff < MONTH) {
    return `${Math.floor(diff / DAY)}일 전`;
  } else if (diff < MONTH * 12) {
    return `${Math.floor(diff / MONTH)}달 전`;
  }

  return `${Math.floor(diff / (MONTH * 12))}년 전`;
}
