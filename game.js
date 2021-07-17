class Game {
  constructor(canvas, screens) {
    this.canvas = canvas;
    this.screens = screens;
    this.context = canvas.getContext('2d');
    this.running = false;
  }

  start() {
    this.running = true;
    this.pizzaRat = new PizzaRat(this, this.canvas.height - 20);
    this.pigeon = new Pigeon(this, 0);
    this.lastPizzaDropTime = Date.now();
    this.pizzaDropInterval = 7000;
    // this.pizzaFloorTime = Date.now();
    this.pizzaFloorInterval = 5000;
    this.pizzas = [];
    this.ratPickedUpPizza = [];
    this.pigeonPickedUpPizza = [];
    this.pigeonDroppings = [];
    this.pigeonHealth = 1000;
    this.pizzaRatHealth = 1000;
    this.loop();
    this.displayScreen('playing');
  }

  dropPizza() {
    const pizza = new Pizza(
      this,
      Math.floor(Math.random() * this.canvas.width),
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

  blackHole() {
    //   need to edit it so that black hole only swallows pizza after a certain amount of time
    const currentTime = Date.now();
    this.pizzas.forEach((pizza, index) => {
      if (pizza.y > this.canvas.height - pizza.height) {
        const pizzaFloorTime = currentTime;
        if (currentTime - pizzaFloorTime > this.pizzaFloorInterval) {
          this.pizzas.splice(index, 1);
        }
      }
    });
    // collect poop at y = canvas.height and pizza at y= canvas.height only after certain amount of seconds

    this.pigeonDroppings.forEach((poop, index) => {
      if (poop.y === this.canvas.height) {
        this.pigeonDroppings.splice(index, 1);
      }
    });
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
    this.runLogic();
    this.paint();
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
        this.pizzaRat.x - this.pizzaRat.width / 2 <= pizza.x + pizza.width / 2
      ) {
        this.ratPickedUpPizza.push(pizza);
        this.pizzas.splice(index, 1);
      } else if (
        this.pigeon.x + this.pigeon.width / 2 >= pizza.x - pizza.width / 2 &&
        this.pigeon.x - this.pigeon.width / 2 <= pizza.x + pizza.width / 2 &&
        this.pigeon.y + this.pigeon.height / 2 >= pizza.y - pizza.height / 2 &&
        this.pigeon.y - this.pigeon.height / 2 <= pizza.y + pizza.height / 2 &&
        pizza.y > this.canvas.height - pizza.height
      ) {
        this.pizzas.splice(index, 1);
        this.pigeonPickedUpPizza.push(pizza);
      }
      for (pizza of this.ratPickedUpPizza) {
        pizza.x = this.pizzaRat.x;
        pizza.y = this.pizzaRat.y - this.pizzaRat.height;
      }
      for (pizza of this.pigeonPickedUpPizza) {
        pizza.x = this.pigeon.x;
        pizza.y = this.pigeon.y + this.pigeon.height;
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

    if (
      currentTimestamp - this.lastPizzaDropTime > this.pizzaDropInterval &&
      this.pizzas.length < 3
    ) {
      this.dropPizza();
      this.lastPizzaDropTime = currentTimestamp; // drop pizza after certain amount of seconds
    }
    for (const dropping of this.pigeonDroppings) {
      dropping.runLogic();
    }
    // this.dropDroppings();
    // this.blackHole();
  }

  launchPizza() {}

  lose() {
    this.running = false;
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paintBackground() {
    const tileSize = 24;
    for (let row = 0; row < this.canvas.height / tileSize; row++) {
      for (let column = 0; column < this.canvas.width / tileSize; column++) {
        this.context.fillRect(
          row,
          column,
          this.canvas.width / tileSize,
          this.canvas.height / tileSize
        );
      }
    }
  }

  paint() {
    this.clearScreen();
    this.paintBackground();
    if (this.running) {
      this.pizzaRat.paint();
      this.pigeon.paint();
      for (const pizza of this.pizzas) {
        pizza.paint();
      }
      for (const pizzaR of this.ratPickedUpPizza) {
        pizzaR.paint();
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
