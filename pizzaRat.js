class PizzaRat extends Player {
  constructor(game, y) {
    super(game, 0, y);
    this.width = 20;
    this.height = 20;
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowRight':
          this.speedX = 5;
          break;
        case 'ArrowLeft':
          this.speedX = -5;
          break;
        case 'Space':
          this.game.launchPizza();
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
