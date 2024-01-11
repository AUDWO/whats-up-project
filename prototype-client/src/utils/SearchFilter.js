const searchFilter = (arr, input, myNickname) => {
  console.log(arr, "arr");
  console.log(input, "input");
  console.log(myNickname, "myNickname");
  const filteredArray = arr.filter(
    (user) => user.nickname.includes(input) && user.nickname !== myNickname
  );

  // "h"의 인덱스가 가장 낮은 순으로 정렬
  const sortedArray = filteredArray.sort((fst, snd) => {
    const indexOfA = fst.nickname.indexOf(input);
    const indexOfB = snd.nickname.indexOf(input);
    return indexOfA - indexOfB;
  });

  return sortedArray;
};

export default searchFilter;
