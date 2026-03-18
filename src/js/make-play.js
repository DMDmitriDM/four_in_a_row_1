// main.js

import {
  setPause,
  arrNumber,
  setArrCheckForOne,
  setArrCheckForAll,
  getArrOpenCircleByNum,
  getArrCubesDrop,
  getRandomValueOfArr,
} from './libr.js';

import { testArrCheck, testFullArrCheckAll } from './test.js';

import makeInfoBlind from './info-blind.js';

export default function makePlay() {
  // create variables

  let sumNumCubesPlayer = 0;

  const arrPlayerCheck = [];
  setArrCheckForOne(arrPlayerCheck);

  const arrComputerCheck = [];
  setArrCheckForOne(arrComputerCheck);

  const arrAllCheck = [];
  setArrCheckForAll(arrAllCheck);

  let startPlay = true;

  // elements

  const fieldBlind = document.querySelector('.game-box__field-blind');
  const arrFieldCircles = document.querySelectorAll('.game-box__field-circle');
  const messageSpan = document.querySelector('.game-box__message-span');
  const btnDrop = document.getElementById('id-btn-drop');
  const btnStart = document.getElementById('id-btn-start');
  const cubeOneNumText = document.getElementById('id-cube-number-one');
  const cubeTwoNumText = document.getElementById('id-cube-number-two');
  const cubesWrap = document.querySelectorAll('.game-box__cube-wrap');

  // -------------------------------------- //
  // --- clearForStartPlay

  function clearForStartPlay() {
    startPlay = true;
    setArrCheckForOne(arrPlayerCheck);
    setArrCheckForOne(arrComputerCheck);
    setArrCheckForAll(arrAllCheck);

    for (let i = 0; i < arrFieldCircles.length; i++) {
      arrFieldCircles[i].classList.remove('circle--set-done');
      arrFieldCircles[i].classList.remove('circle--set-player');
      arrFieldCircles[i].classList.remove('circle--set-computer');
    }

    cubeOneNumText.textContent = '6';
    cubeTwoNumText.textContent = '6';
  }

  // -------------------------------------- //
  // --- drop all

  function startRotateCubes() {
    cubesWrap[0].classList.add('game-box__cube-wrap--rotate');
    cubesWrap[1].classList.add('game-box__cube-wrap--rotate');

    cubeOneNumText.classList.add('game-box__cube-number-rotate');
    cubeTwoNumText.classList.add('game-box__cube-number-rotate');
  }

  function stopRotateCubes() {
    cubesWrap[0].classList.remove('game-box__cube-wrap--rotate');
    cubesWrap[1].classList.remove('game-box__cube-wrap--rotate');

    cubeOneNumText.classList.remove('game-box__cube-number-rotate');
    cubeTwoNumText.classList.remove('game-box__cube-number-rotate');
  }

  async function showDropCubes(arrCubesDrop) {
    // Запуск крутилки кубиков
    startRotateCubes();

    // Вычисление броска
    const [numOne, numTwo] = arrCubesDrop;
    cubeOneNumText.textContent = String(numOne);
    cubeTwoNumText.textContent = String(numTwo);

    await setPause(2.5);

    // Отмена крутилки кубиков
    stopRotateCubes();
  }

  async function dropComputerCubes() {
    let arrOpenCircle;

    messageSpan.textContent = 'Бросаю кубики!';

    const arrCubesDrop = getArrCubesDrop();
    await showDropCubes(arrCubesDrop);
    const sumNumCubes = arrCubesDrop[0] + arrCubesDrop[1];

    // Есть ли ход
    arrOpenCircle = getArrOpenCircleByNum(sumNumCubes, arrNumber, arrAllCheck);
    // console.log('Есть ли ход для компьютера: ', arrOpenCircle, ' sumNumCubes: ', sumNumCubes);

    while (arrOpenCircle.length === 0) {
      messageSpan.textContent =
        'Все такие цифры заняты! Бросаю кубики ещё раз!';
      await setPause(1.5);

      const arrCubesDrop = getArrCubesDrop();
      await showDropCubes(arrCubesDrop);
      const sumNumCubes = arrCubesDrop[0] + arrCubesDrop[1];

      // Есть ли ход
      arrOpenCircle = getArrOpenCircleByNum(
        sumNumCubes,
        arrNumber,
        arrAllCheck,
      );
      // console.log('Есть ли ход для компьютера: ', arrOpenCircle, ' sumNumCubes: ', sumNumCubes);
    }

    return arrOpenCircle;
  }

  // -------------------------------------- //
  // --- stepComputer

  async function stepComputer() {
    // Получим arrOpenCircle
    const arrOpenCircle = await dropComputerCubes();
    // console.log('Окончательно: ', arrOpenCircle);

    const i = getRandomValueOfArr(arrOpenCircle);
    // console.log(i);

    messageSpan.classList.add('game-box__message-span--scale');
    messageSpan.textContent = 'Выбираю цифру!';
    await setPause(2.5);
    messageSpan.classList.remove('game-box__message-span--scale');

    arrFieldCircles[i].classList.add('circle--set-computer');
    arrComputerCheck[i] = i;
    arrAllCheck[i] = true;

    // Проверка на 4 в ряд
    const checkArr = testArrCheck(arrComputerCheck);
    if (checkArr.length) {
      for (let i = 0; i < checkArr.length; i++) {
        arrFieldCircles[checkArr[i]].classList.add('circle--set-done');
      }

      // Можно нажать кнопку "Начать игру"
      btnStart.removeAttribute('disabled');
      messageSpan.textContent = '4 подряд! Победа компьютером!';
      return;
    }

    // Проверка все поля с цифрами заняты - ничья
    if (testFullArrCheckAll(arrAllCheck)) {
      // Можно нажать кнопку "Начать игру"
      btnStart.removeAttribute('disabled');
      messageSpan.textContent = 'Ничья!';
      return;
    }

    // Игрок продолжает
    btnDrop.removeAttribute('disabled');
    // messageSpan.textContent = 'Бросить кубики!';
    messageSpan.textContent = 'Ваш ход!';
  }

  // -------------------------------------- //
  // --- click circle

  for (let i = 0; i < arrFieldCircles.length; i++) {
    arrFieldCircles[i].addEventListener('click', () => {
      // По занятой
      if (arrAllCheck[i]) {
        return;
      }

      const dataNumber = Number(arrFieldCircles[i].dataset.number);
      // Не та цифра
      if (dataNumber !== sumNumCubesPlayer) {
        return;
      }

      fieldBlind.classList.add('game-box__field-blind--active');
      arrFieldCircles[i].classList.add('circle--set-player');
      arrPlayerCheck[i] = i;
      arrAllCheck[i] = true;

      // Проверка на 4 в ряд
      const checkArr = testArrCheck(arrPlayerCheck);
      if (checkArr.length) {
        for (let i = 0; i < checkArr.length; i++) {
          arrFieldCircles[checkArr[i]].classList.add('circle--set-done');
        }

        // Можно нажать кнопку "Начать игру"
        btnStart.removeAttribute('disabled');
        messageSpan.textContent = '4 подряд! Победа за игроком!';
        return;
      }

      // Проверка все поля с цифрами заняты - ничья
      if (testFullArrCheckAll(arrAllCheck)) {
        // Можно нажать кнопку "Начать игру"
        btnStart.removeAttribute('disabled');
        messageSpan.textContent = 'Ничья!';
        return;
      }

      // Ход за компьютером
      stepComputer();
    });
  }

  // -------------------------------------- //
  // --- doneStartPlayDrop

  async function makeStartPlayDrop() {
    btnDrop.setAttribute('disabled', '');

    const arrCubesDrop = getArrCubesDrop();
    await showDropCubes(arrCubesDrop);
    const [numOne, numTwo] = arrCubesDrop;

    if (numOne - numTwo < 0) {
      // Первый кубик меньше - ход за компьютером
      startPlay = false;
      messageSpan.textContent = 'Бросаю кубики!';

      await makeInfoBlind(
        `Игрок - ${numOne} Компьютер - ${numTwo} Первый ход за компьютером!`,
      );
      stepComputer();
    } else if (numOne - numTwo === 0) {
      // Равны - переброс
      messageSpan.textContent = 'Бросить кубики ещё раз!';
      btnDrop.removeAttribute('disabled');
      startPlay = true;

      await makeInfoBlind(
        `Игрок - ${numOne} Компьютер - ${numTwo} Бросить кубики ещё раз!`,
      );
    } else {
      // Первый кубик больше - ход за игроком
      // messageSpan.textContent = 'Бросить кубики!';
      messageSpan.textContent = 'Ваш ход!';
      btnDrop.removeAttribute('disabled');
      startPlay = false;

      await makeInfoBlind(
        `Игрок - ${numOne} Компьютер - ${numTwo} Первый ход за игроком!`,
      );
    }
  }

  // -------------------------------------- //
  // --- click btnDrop

  btnDrop.addEventListener('click', async () => {
    if (startPlay) {
      makeStartPlayDrop();
      return;
    }

    btnDrop.setAttribute('disabled', '');
    messageSpan.textContent = 'Кубики брошены!';

    const arrCubesDrop = getArrCubesDrop();
    await showDropCubes(arrCubesDrop);
    sumNumCubesPlayer = arrCubesDrop[0] + arrCubesDrop[1];

    // Есть ли ход
    const arrOpenCircle = getArrOpenCircleByNum(
      sumNumCubesPlayer,
      arrNumber,
      arrAllCheck,
    );

    // console.log('Есть ли ход для игрока: ', arrOpenCircle);
    if (arrOpenCircle.length === 0) {
      btnDrop.removeAttribute('disabled');
      messageSpan.textContent =
        'Все такие цифры заняты! Бросить кубики ещё раз!';
      return;
    }

    // Можно выбрать цифру на поле
    fieldBlind.classList.remove('game-box__field-blind--active');
    messageSpan.textContent = 'Выберите цифру на поле!';
  });

  // -------------------------------------- //
  // --- click btnStart

  btnStart.addEventListener('click', () => {
    if (!startPlay) {
      clearForStartPlay();
    }

    btnStart.setAttribute('disabled', '');
    btnDrop.removeAttribute('disabled');
    messageSpan.textContent = 'Бросьте кубики на право первого хода!';
  });
}
