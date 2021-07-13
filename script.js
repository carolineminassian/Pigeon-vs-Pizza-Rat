const canvasElement = document.querySelector('canvas');

const screenStartElement = document.getElementById('screen-start');
const screenPlayingElement = document.getElementById('screen-playing');
const screenGameOverElement = document.getElementById('screen-game-over');

const screenElements = {
  start: screenStartElement,
  playing: screenPlayingElement,
  gameOver: screenGameOverElement,
};

const game = new Game(canvasElement, screenElements);

const startButton = screenStartElement.querySelector('button');
const tryAgainButton = screenGameOverElement.querySelector('button');

startButton.addEventListener('click', () => {
  game.start();
});

tryAgainButton.addEventListener('click', () => {
  game.start();
});