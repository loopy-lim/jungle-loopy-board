const PAGINATION_BOUND = 5;

export const generatePaginationIndexs = (
  currentIdx: number,
  lastIdx: number,
) => {
  const spliter = Math.floor(PAGINATION_BOUND / 2);
  return Array.from({ length: PAGINATION_BOUND * 2 }, (_, i) => i)
    .map(
      (idx) =>
        idx +
        currentIdx -
        spliter -
        (lastIdx - currentIdx > spliter ? 0 : spliter - (lastIdx - currentIdx)), // 마지막일때 좌측이 얼마나 있는지 계산하기 위함
    )
    .filter((idx) => idx > 0 && idx <= lastIdx)
    .splice(0, PAGINATION_BOUND);
};
