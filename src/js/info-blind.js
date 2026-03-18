// info-blind.js

export default async function makeInfoBlind(message) {
  const infoBlind = document.querySelector('.game-box__info-blind');
  const messageText = document.querySelector('.game-box__info-blind-message');
  const btnClose = document.querySelector('.game-box__info-blind-btn');

  messageText.textContent = message;
  infoBlind.classList.add('game-box__info-blind--active');

  await new Promise((resolve) => {
    function endTransitionend(event) {
      if (event.target === infoBlind) {
        infoBlind.removeEventListener('transitionend', endTransitionend);
        resolve();
      }
    }

    btnClose.addEventListener('click', () => {
      infoBlind.addEventListener('transitionend', endTransitionend);

      infoBlind.classList.remove('game-box__info-blind--active');
    });
  });
}
