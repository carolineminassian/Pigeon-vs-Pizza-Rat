const canvasElement = document.querySelector('canvas');

const screenStartElement = document.getElementById('screen-start');
const screenPlayingElement = document.getElementById('screen-playing');
const screenPigeonLostElement = document.getElementById('screen-pigeon-lost');
const screenPizzaRatLostElement = document.getElementById(
  'screen-pizzaRat-lost'
);
const screenPigeonLevelUpElement = document.getElementById(
  'screen-pigeon-level-up'
);
const screenPizzaRatLevelUpElement = document.getElementById(
  'screen-pizzaRat-level-up'
);

const screenElements = {
  start: screenStartElement,
  playing: screenPlayingElement,
  pigeonLost: screenPigeonLostElement,
  pizzaRatLost: screenPizzaRatLostElement,
  pigeonLevelUp: screenPigeonLevelUpElement,
  pizzaRatLevelUp: screenPizzaRatLevelUpElement
};

const game = new Game(canvasElement, screenElements);

const startButton = screenStartElement.querySelector('button');
const tryAgainButtonP = screenPigeonLostElement.querySelector('button');
const tryAgainButtonR = screenPizzaRatLostElement.querySelector('button');
const nextLevelButtonP = screenPigeonLevelUpElement.querySelector('button');
const nextLevelButtonR = screenPizzaRatLevelUpElement.querySelector('button');

let startingLevel = 1;

startButton.addEventListener('click', () => {
  game.start(startingLevel);
});

tryAgainButtonP.addEventListener('click', () => {
  game.start(startingLevel);
});
tryAgainButtonR.addEventListener('click', () => {
  game.start(startingLevel);
});

nextLevelButtonP.addEventListener('click', () => {
  startingLevel++;
  game.start(startingLevel);
});
nextLevelButtonR.addEventListener('click', () => {
  startingLevel++;
  game.start(startingLevel);
});
