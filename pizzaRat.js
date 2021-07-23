class PizzaRat extends Player {
  constructor(game, y) {
    super(game, game.canvas.width - 20, y);
    this.width = 20;
    this.height = 20;
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      const units = 5;
      switch (key) {
        case 'ArrowRight':
          if (this.x + this.width < this.game.canvas.width - units) {
            this.speedX = units;
          } else {
            this.speedX = 0;
          }
          break;
        case 'ArrowLeft':
          if (this.x > units) {
            this.speedX = -units;
          } else {
            this.speedX = 0;
          }
          break;
        case 'Space':
          this.game.launchPizza();
          break;
        case 'ArrowUp':
          this.game.pizzaDropOff();
          break;
      }
    });
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
