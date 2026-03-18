// creat-elements.js

import { arrNumber } from './libr.js';

export default function creatElements() {
  // container
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);

  // game-box
  const gameBox = document.createElement('div');
  gameBox.classList.add('game-box', 'game-box--set');
  container.append(gameBox);

  // gameBoxInfoBlind
  const gameBoxInfoBlind = document.createElement('div');
  gameBoxInfoBlind.classList.add('game-box__info-blind');
  gameBox.append(gameBoxInfoBlind);

  const infoBlindWrap = document.createElement('div');
  infoBlindWrap.classList.add('game-box__info-blind-wrap');
  gameBoxInfoBlind.append(infoBlindWrap);

  const infoBlindMessage = document.createElement('span');
  infoBlindMessage.classList.add('game-box__info-blind-message');
  infoBlindMessage.textContent = 'Текст сообщения';
  infoBlindWrap.append(infoBlindMessage);

  const infoBlindBtn = document.createElement('button');
  infoBlindBtn.classList.add('game-box__info-blind-btn', 'game-btn');
  infoBlindBtn.textContent = 'Ok';
  infoBlindWrap.append(infoBlindBtn);

  // gameBoxTitle
  const gameBoxTitle = document.createElement('h1');
  gameBoxTitle.classList.add('.game-box__title');
  gameBoxTitle.textContent = 'Игра 4 в ряд';
  gameBox.append(gameBoxTitle);

  // ----- //
  // gameBoxWrapper
  const gameBoxWrapper = document.createElement('div');
  gameBoxWrapper.classList.add('game-box__wrapper');
  gameBox.append(gameBoxWrapper);

  // -----
  // gameBoxFieldWrapper
  const gameBoxFieldWrapper = document.createElement('div');
  gameBoxFieldWrapper.classList.add('game-box__field-wrapper');
  gameBoxWrapper.append(gameBoxFieldWrapper);

  const gameBoxFieldBlind = document.createElement('div');
  gameBoxFieldBlind.classList.add(
    'game-box__field-blind',
    'game-box__field-blind--active',
  );
  gameBoxFieldWrapper.append(gameBoxFieldBlind);

  const gameBoxField = document.createElement('div');
  gameBoxField.classList.add('game-box__field');
  gameBoxFieldWrapper.append(gameBoxField);

  for (let i = 0; i < 42; i++) {
    const fieldCircle = document.createElement('div');
    fieldCircle.classList.add('game-box__field-circle');
    fieldCircle.dataset.number = String(arrNumber[i]);

    const numberSpan = document.createElement('span');
    numberSpan.classList.add('game-box__field-number');
    numberSpan.textContent = String(arrNumber[i]);

    fieldCircle.append(numberSpan);
    gameBoxField.append(fieldCircle);
  }

  // -----
  // gameBoxMessageBlock
  const gameBoxMessageBlock = document.createElement('div');
  gameBoxMessageBlock.classList.add('game-box__message-block');
  gameBoxWrapper.append(gameBoxMessageBlock);

  const gameBoxMessageSpan = document.createElement('span');
  gameBoxMessageSpan.classList.add('game-box__message-span');
  gameBoxMessageSpan.textContent = 'Начать игру!';
  gameBoxMessageBlock.append(gameBoxMessageSpan);

  // -----
  // gameBoxWrapBlock
  const gameBoxWrapBlock = document.createElement('div');
  gameBoxWrapBlock.classList.add('game-box__wrap-block');
  gameBoxWrapper.append(gameBoxWrapBlock);

  // ---
  // gameBoxCubesBlock
  const gameBoxCubesBlock = document.createElement('div');
  gameBoxCubesBlock.classList.add('game-box__cubes-block');
  gameBoxWrapBlock.append(gameBoxCubesBlock);

  const arrNameCubes = ['one', 'two'];
  for (let i = 0; i < arrNameCubes.length; i++) {
    const gameBoxCubeWrap = document.createElement('div');
    gameBoxCubeWrap.classList.add('game-box__cube-wrap');
    gameBoxCubesBlock.append(gameBoxCubeWrap);

    const gameBoxCubeNumber = document.createElement('span');
    gameBoxCubeNumber.classList.add('game-box__cube-number');
    gameBoxCubeNumber.setAttribute('id', `id-cube-number-${arrNameCubes[i]}`);
    gameBoxCubeNumber.textContent = '6';
    gameBoxCubeWrap.append(gameBoxCubeNumber);
  }

  // ---
  // gameBoxBtnBlock
  const gameBoxBtnBlock = document.createElement('div');
  gameBoxBtnBlock.classList.add('game-box__btn-block');
  gameBoxWrapBlock.append(gameBoxBtnBlock);

  const gameBoxBtnDrop = document.createElement('button');
  gameBoxBtnDrop.classList.add('game-box__btn', 'game-btn');
  gameBoxBtnDrop.setAttribute('id', 'id-btn-drop');
  gameBoxBtnDrop.setAttribute('disabled', '');
  gameBoxBtnDrop.textContent = 'Бросить кубики';
  gameBoxBtnBlock.append(gameBoxBtnDrop);

  const gameBoxBtnStart = document.createElement('button');
  gameBoxBtnStart.classList.add('game-box__btn', 'game-btn');
  gameBoxBtnStart.setAttribute('id', 'id-btn-start');
  gameBoxBtnStart.textContent = 'Начать игру';
  gameBoxBtnBlock.append(gameBoxBtnStart);

  // Старт приложения

  resizeWindow();

  window.onresize = () => {
    resizeWindow();
  };
}

function resizeWindow() {
  const heightPlayWindow = document.documentElement.clientHeight;
  const maxWidth = Math.round(heightPlayWindow * 0.808);

  const gameBoxWrapper = document.querySelector('.game-box__wrapper');
  gameBoxWrapper.style.maxWidth = `${maxWidth}px`;

  // ---
  // const arrFieldCircles = document.querySelectorAll('.game-box__field-circle');
  // const widthFieldCircle = arrFieldCircles[0].clientWidth;

  const fieldCircle = document.querySelector('.game-box__field-circle');
  const widthFieldCircle = fieldCircle.clientWidth;

  const fontSizeFieldNumber = Math.floor(widthFieldCircle * 0.5);

  const arrNumberSpan = document.querySelectorAll('.game-box__field-number');
  for (let i = 0; i < arrNumberSpan.length; i++) {
    arrNumberSpan[i].style.fontSize = `${fontSizeFieldNumber}px`;
  }
}
