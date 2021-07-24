const subway = new Image();
subway.src = '/images/NYCsubway1.jpg';

const nest = new Image();
nest.src = 'images/pigeonNest.png';

const hole = new Image();
hole.src = 'images/ratHoleEdit.png';

class Game {
  constructor(canvas, screens) {
    this.canvas = canvas;
    this.screens = screens;
    this.context = canvas.getContext('2d');
    this.running = false;
  }

  start(level) {
    this.level = level;
    this.running = true;
    this.canvas.width = window.innerWidth * 0.75;
    this.canvas.height = window.innerHeight * 0.95;
    this.pizzaRat = new PizzaRat(this, this.canvas.height - 64);
    this.pigeon = new Pigeon(this, 0);
    this.pigeonNest = new StockPile(
      this,
      this.canvas.width * 0.9,
      50,
      nest,
      this.canvas.width * 0.1,
      this.canvas.height * 0.1
    );
    this.ratHole = new StockPile(
      this,
      30,
      this.canvas.height * 0.9,
      hole,
      this.canvas.width * 0.1,
      this.canvas.height * 0.1
    );
    this.fps = 120;
    this.frameInterval = 1000 / this.fps;
    this.lastTime = Date.now();
    this.lastPizzaDropTime = Date.now();
    this.pizzaDropInterval = 3000;
    this.pizzas = [];
    this.ratPickedUpPizza = [];
    this.launchedPizza = [];
    this.pigeonPickedUpPizza = [];
    this.pigeonDroppings = [];
    this.pizzaRatHoard = [];
    this.pigeonHoard = [];
    this.pigeonHealth = 500 * level;
    this.pizzaRatHealth = 500 * level;
    this.loop();
    this.displayScreen('playing');
  }

  dropPizza() {
    const pizza = new Pizza(
      this,
      Math.floor(Math.random() * (this.canvas.width - 64)),
      0
    );
    this.pizzas.push(pizza);
  }

  dropDroppings() {
    const droppings = new PigeonDropping(
      this,
      this.pigeon.x + this.pigeon.width / 2,
      this.pigeon.y + this.pigeon.height
    );
    this.pigeonDroppings.push(droppings);
  }

  displayScreen(name) {
    const screenThatShouldBeDisplayed = this.screens[name];
    const screensThatShouldBeHidden = Object.values(this.screens).filter(
      (screen) => screen !== screenThatShouldBeDisplayed
    );
    screenThatShouldBeDisplayed.style.display = '';
    for (const screen of screensThatShouldBeHidden)
      screen.style.display = 'none';
  }

  loop() {
    const now = Date.now(),
      elapsedTime = now - this.lastTime;
    if (elapsedTime > this.frameInterval) {
      this.runLogic();
      this.paint();
      this.lastTime = now;
    }
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  }

  pizzaPickUp() {
    this.pizzas.forEach((pizza, index) => {
      if (
        this.pizzaRat.x + this.pizzaRat.width / 2 >=
          pizza.x - pizza.width / 2 &&
        this.pizzaRat.x - this.pizzaRat.width / 2 <=
          pizza.x + pizza.width / 2 &&
        this.ratPickedUpPizza.length < 1 &&
        pizza.y + pizza.height >= this.pizzaRat.y + this.pizzaRat.height
        // this.ratPickedUpPizza.length < 2
      ) {
        this.ratPickedUpPizza.push(pizza);
        this.pizzas.splice(index, 1);
      } else if (
        this.pigeon.x + this.pigeon.width / 2 >= pizza.x - pizza.width / 2 &&
        this.pigeon.x - this.pigeon.width / 2 <= pizza.x + pizza.width / 2 &&
        this.pigeon.y + this.pigeon.height / 2 >= pizza.y - pizza.height / 2 &&
        this.pigeon.y - this.pigeon.height / 2 <= pizza.y + pizza.height / 2 &&
        pizza.y > this.canvas.height - pizza.height &&
        this.pigeonPickedUpPizza.length < 1
      ) {
        this.pizzas.splice(index, 1);
        this.pigeonPickedUpPizza.push(pizza);
      }
      for (pizza of this.ratPickedUpPizza) {
        pizza.x = this.pizzaRat.x + this.pizzaRat.width / 2 - pizza.width / 2;
        pizza.y = this.pizzaRat.y - pizza.height / 2;
      }
      for (pizza of this.pigeonPickedUpPizza) {
        pizza.x = this.pigeon.x + this.pigeon.width / 2 - pizza.width / 2;
        pizza.y = this.pigeon.y + this.pigeon.height / 1.25;
      }
    });
  }

  pizzaDropOffR() {
    this.ratPickedUpPizza.forEach((pizzaR, index) => {
      if (
        pizzaR.x <= this.ratHole.x + this.ratHole.width &&
        pizzaR.x + pizzaR.width >= this.ratHole.x
      ) {
        this.pizzaRatHoard.push(pizzaR);
        this.pizzaRatHealth += 100;
        console.log('pizzaRat health: ', this.pizzaRatHealth);
        this.ratPickedUpPizza.splice(index, 1);
      }
    });
  }
  pizzaDropOffP() {
    this.pigeonPickedUpPizza.forEach((pizzaP, index) => {
      if (
        pizzaP.x <= this.pigeonNest.x + this.pigeonNest.width &&
        pizzaP.x + pizzaP.width >= this.pigeonNest.x &&
        pizzaP.y <= this.pigeonNest.y + this.pigeonNest.height
      ) {
        this.pigeonHoard.push(pizzaP);
        this.pigeonHealth += 100;
        console.log('pigeon health: ', this.pigeonHealth);
        this.pigeonPickedUpPizza.splice(index, 1);
      }
    });
  }

  runLogic() {
    this.pizzaRat.runLogic();
    this.pigeon.runLogic();
    const currentTimestamp = Date.now();

    for (const pizza of this.pizzas) {
      pizza.runLogic();
    }
    this.pizzaPickUp();

    for (const pizzaL of this.launchedPizza) {
      pizzaL.invertedRunLogic();
    }
    if (
      currentTimestamp - this.lastPizzaDropTime > this.pizzaDropInterval &&
      this.pizzas.length < 1
      // this.pizzas.length < 2
    ) {
      this.dropPizza();
      this.lastPizzaDropTime = currentTimestamp; // drop pizza after certain amount of seconds
    }
    for (const dropping of this.pigeonDroppings) {
      dropping.runLogic();
    }
    if (this.pigeonDroppings.length > 2) {
      this.pigeonDroppings.splice(0, 1);
    }
    this.checkPigeonHit();
    this.checkRatHit();
    if (this.pigeonHealth <= 0) {
      this.pigeonLose();
    } else if (this.pizzaRatHealth <= 0) {
      this.pizzaRatLose();
    }
    if (this.pigeonHealth >= 1000 * this.level) {
      this.pigeonLevelUp();
    } else if (this.pizzaRatHealth >= 1000 * this.level) {
      this.pizzaRatLevelUp();
    }
  }

  launchPizza() {
    for (const pizzaL of this.ratPickedUpPizza) {
      this.launchedPizza.push(pizzaL);
      this.ratPickedUpPizza.splice(0, 1);
    }
    if (this.launchedPizza.length > 1) {
      this.launchedPizza.splice(0, 1);
    }
  }

  checkPigeonHit() {
    for (const pizzaL of this.launchedPizza) {
      if (
        this.pigeon.x + this.pigeon.width >= pizzaL.x &&
        this.pigeon.x <= pizzaL.x + pizzaL.width &&
        this.pigeon.y + this.pigeon.height >= pizzaL.y &&
        this.pigeon.y <= pizzaL.y + pizzaL.height &&
        pizzaL.y < this.canvas.height - (pizzaL.height + this.pizzaRat.height)
      ) {
        this.pigeonHealth -= Math.floor(50 / this.level);
        this.launchedPizza.splice(0, 1);
        console.log('pigeon health: ', this.pigeonHealth);
      }
    }
  }

  checkRatHit() {
    this.pigeonDroppings.forEach((dropping, index) => {
      if (
        this.pizzaRat.x + this.pizzaRat.width >= dropping.x &&
        this.pizzaRat.x <= dropping.x + dropping.width &&
        this.pizzaRat.y <= dropping.y + dropping.height &&
        this.pizzaRat.y + this.pizzaRat.height >= dropping.y + dropping.height
      ) {
        this.pizzaRatHealth -= Math.floor(50 / this.level);
        this.pigeonDroppings.splice(index, 1);
        console.log('pizzaRat health: ', this.pizzaRatHealth);
      }
    });
  }

  pizzaRatLose() {
    this.running = false;
    this.displayScreen('pizzaRatLost');
  }
  pigeonLose() {
    this.running = false;
    this.displayScreen('pigeonLost');
  }

  pigeonLevelUp() {
    this.running = false;
    this.displayScreen('pigeonLevelUp');
  }
  pizzaRatLevelUp() {
    this.running = false;
    this.displayScreen('pizzaRatLevelUp');
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paintBackground() {
    this.context.save();
    this.context.globalAlpha = 0.6;
    this.context.drawImage(
      subway,
      0,
      0,
      3600,
      2861 - this.canvas.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
      // 3600 / (2861 / this.canvas.height),
      // 2861 / (2861 / this.canvas.height)
    );
    this.context.restore();
  }

  paintScore() {
    const fontSize = 28;
    const pigeonScoreY = 50;
    const ratScoreY = this.canvas.height - 50;
    const ratScoreW = this.context.measureText(
      `Pizza Rat Health: ${this.pizzaRatHealth}`
    ).width;
    const pigeonScoreW = this.context.measureText(
      `Pigeon Health: ${this.pigeonHealth}`
    ).width;
    this.context.font = `small-caps ${fontSize}px Prosto One, cursive`;
    this.context.fillStyle = 'black';
    this.context.fillRect(
      this.canvas.width / 2 - 2,
      ratScoreY - fontSize + 2,
      ratScoreW + 4,
      fontSize + 2
    );
    this.context.fillStyle = 'white';
    this.context.fillText(
      `Pizza Rat Health: ${this.pizzaRatHealth}`,
      this.canvas.width / 2,
      ratScoreY
    );

    this.context.fillStyle = 'black';
    this.context.fillRect(
      this.canvas.width / 2 - 2,
      pigeonScoreY - fontSize + 2,
      pigeonScoreW + 4,
      fontSize + 2
    );
    this.context.fillStyle = 'white';
    this.context.fillText(
      `Pigeon Health: ${this.pigeonHealth}`,
      this.canvas.width / 2,
      pigeonScoreY
    );
  }

  paint() {
    this.clearScreen();
    this.paintBackground();
    if (this.running) {
      this.ratHole.paint();
      this.pigeonNest.paint();
      this.paintScore();
      this.pigeon.paint();
      this.pizzaRat.paint();
      for (const pizza of this.pizzas) {
        pizza.paint();
      }
      for (const pizzaR of this.ratPickedUpPizza) {
        pizzaR.paint();
      }
      for (const pizzaL of this.launchedPizza) {
        pizzaL.paint();
      }
      for (const pizzaP of this.pigeonPickedUpPizza) {
        pizzaP.paint();
      }
      for (const poop of this.pigeonDroppings) {
        poop.paint();
      }
    }
  }
}
