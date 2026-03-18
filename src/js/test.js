// test.js

function testRows(arrCheck) {
  // Проверить индексы row / row = 6
  // [0, 1, 2, 3, 4, 5, 6]
  // --
  // [35, 36, 37, 38, 39, 40, 41]

  for (let i = 0; i < 6; i++) {
    const arrRowIndex = [];

    for (let j = 0; j < 7; j++) {
      arrRowIndex.push(j + i * 7);
    }
    // console.log('arrRowIndex: ', arrRowIndex);

    const arrRow = arrRowIndex
      .map((i) => arrCheck[i])
      .filter((item) => item !== -1);
    // console.log('arrRow: ', arrRow);

    const arr = hasArrFourInRow(arrRow);

    if (arr.length === 4) {
      return arr;
    }
  }

  return [];
}

// ---

function hasArrFourInRow(arr) {
  if (arr.length < 4) return [];

  for (let i = 0; i <= arr.length - 4; i++) {
    if (
      arr[i + 1] === arr[i] + 1 &&
      arr[i + 2] === arr[i] + 2 &&
      arr[i + 3] === arr[i] + 3
    ) {
      return [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]]; // Нашли 4 подряд
    }
  }

  return [];
}

// ----------------------------------------------- //

function testСolumns(arrCheck) {
  // Проверить индексы columns / columns = 7
  // [0, 7, 14, 21, 28, 35]
  // --
  // [6, 13, 20, 27, 34, 41]

  for (let i = 0; i < 7; i++) {
    const arrСolumnIndex = [];

    for (let j = 0; j < 6; j++) {
      arrСolumnIndex.push(j * 7 + i);
    }
    // console.log('arrСolumnIndex: ', arrСolumnIndex);

    const arrСolumn = arrСolumnIndex
      .map((i) => arrCheck[i])
      .filter((item) => item !== -1);
    // console.log('arrСolumn: ', arrСolumn);

    const arr = hasArrFourInСolumn(arrСolumn);
    if (arr.length) {
      return arr;
    }
  }

  return [];
}

// ---

function hasArrFourInСolumn(arr) {
  if (arr.length < 4) return [];

  for (let i = 0; i <= arr.length - 4; i++) {
    if (
      arr[i + 1] === arr[i] + 7 &&
      arr[i + 2] === arr[i] + 14 &&
      arr[i + 3] === arr[i] + 21
    ) {
      return [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]]; // Нашли 4 подряд
    }
  }

  return [];
}

// ----------------------------------------------- //

function getArrLeftDiagonalsIndex() {
  return [
    [14, 22, 30, 38],
    [7, 15, 23, 31, 39],
    [0, 8, 16, 24, 32, 40],
    [1, 9, 17, 25, 33, 41],
    [2, 10, 18, 26, 34],
    [3, 11, 19, 27],
  ];
}

function testLeftDiagonals(arrCheck) {
  const arrDiagonalsIndex = getArrLeftDiagonalsIndex();

  for (let i = 0; i < arrDiagonalsIndex.length; i++) {
    // console.log(`arrDiagonalsIndex${i}: `,  arrDiagonalsIndex[i]);

    const arrDiagonal = arrDiagonalsIndex[i]
      .map((i) => arrCheck[i])
      .filter((item) => item !== -1);
    // console.log('arrLeftDiagonal: ', arrDiagonal);

    const arr = hasArrFourLeftDiagonal(arrDiagonal);
    if (arr.length) {
      return arr;
    }
  }

  return [];
}

// ---

function hasArrFourLeftDiagonal(arr) {
  if (arr.length < 4) return [];

  for (let i = 0; i <= arr.length - 4; i++) {
    if (
      arr[i + 1] === arr[i] + 8 &&
      arr[i + 2] === arr[i] + 16 &&
      arr[i + 3] === arr[i] + 24
    ) {
      return [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]]; // Нашли 4 подряд
    }
  }

  return [];
}

// ----------------------------------------------- //

function getArrRightDiagonalsIndex() {
  return [
    [3, 9, 15, 21],
    [4, 10, 16, 22, 28],
    [5, 11, 17, 23, 29, 35],
    [6, 12, 18, 24, 30, 36],
    [13, 19, 25, 31, 37],
    [20, 26, 32, 38],
  ];
}

function testRightDiagonals(arrCheck) {
  const arrDiagonalsIndex = getArrRightDiagonalsIndex();

  for (let i = 0; i < arrDiagonalsIndex.length; i++) {
    // console.log(`arrDiagonalsIndex${i}: `,  arrDiagonalsIndex[i]);

    const arrDiagonal = arrDiagonalsIndex[i]
      .map((i) => arrCheck[i])
      .filter((item) => item !== -1);
    // console.log('arrLeftDiagonal: ', arrDiagonal);

    const arr = hasArrFourRightDiagonal(arrDiagonal);
    if (arr.length) {
      return arr;
    }
  }

  return [];
}

// ---

function hasArrFourRightDiagonal(arr) {
  if (arr.length < 4) return [];

  for (let i = 0; i <= arr.length - 4; i++) {
    if (
      arr[i + 1] === arr[i] + 6 &&
      arr[i + 2] === arr[i] + 12 &&
      arr[i + 3] === arr[i] + 18
    ) {
      return [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]]; // Нашли 4 подряд
    }
  }

  return [];
}

// ----------------------------------------------- //

export function testArrCheck(arrCheck) {
  let testArr;

  testArr = testRows(arrCheck);
  if (testArr.length) {
    return testArr;
  }

  testArr = testСolumns(arrCheck);
  if (testArr.length) {
    return testArr;
  }

  testArr = testLeftDiagonals(arrCheck);
  if (testArr.length) {
    return testArr;
  }

  testArr = testRightDiagonals(arrCheck);
  if (testArr.length) {
    return testArr;
  }

  return [];
}

// ----------------------------------------------- //

export function testFullArrCheckAll(arrCheck) {
  for (let i = 0; i < arrCheck.length; i++) {
    // Хотя бы одна не занята
    if (!arrCheck[i]) {
      return false;
    }
  }

  return true;
}
