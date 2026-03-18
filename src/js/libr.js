// libr.js

// ----------------------------------------------- //

function getRandomNumber(n, m) {
  // Генерация случайного числа из диапазона
  const numberRange = Math.round(Math.random() * (m - n));
  // Итоговое случайное число из заданных чисел границы
  return n + numberRange;
}

// ---

export async function setPause(count) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, count * 1000);
  });
}

// ----------------------------------------------- //

export const arrNumber = [
  8, 2, 7, 12, 3, 8, 5, 4, 10, 5, 6, 9, 10, 7, 7, 3, 8, 10, 5, 6, 4, 9, 11, 4,
  2, 6, 7, 9, 6, 5, 7, 8, 3, 5, 6, 8, 7, 4, 11, 9, 3, 12,
];

export function setArrCheckForOne(arr) {
  arr.length = 0;
  for (let i = 0; i < 42; i++) {
    arr.push(-1);
  }
}

export function setArrCheckForAll(arr) {
  arr.length = 0;
  for (let i = 0; i < 42; i++) {
    arr.push(false);
  }
}

export function getArrOpenCircleByNum(num, arrNumber, arrAllCheck) {
  return arrNumber
    .map((item, index) => (item === num && !arrAllCheck[index] ? index : -1))
    .filter((index) => index !== -1);
}

export function getArrCubesDrop() {
  const numOne = getRandomNumber(1, 6);
  const numTwo = getRandomNumber(1, 6);

  return [numOne, numTwo];
}

export function getRandomValueOfArr(arr) {
  const indexValue = getRandomNumber(0, arr.length - 1);
  return arr[indexValue];
}
