const searchFilter = (arr, input) => {
  const filteredArray = arr
    .map((user) => ({
      ...user,
      nickname: user.nickname.replace(/[^a-zA-Z]/g, "").toLowerCase(),
    }))
    .filter((item) => item.includes(input));

  // "h"의 인덱스가 가장 낮은 순으로 정렬
  const sortedArray = filteredArray.sort((a, b) => {
    const indexOfA = a.indexOf(input);
    const indexOfB = b.indexOf(input);
    return indexOfA - indexOfB;
  });

  return sortedArray;
};

export default searchFilter;
