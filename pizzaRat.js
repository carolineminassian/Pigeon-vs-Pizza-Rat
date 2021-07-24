const rat = new Image();
rat.src = '/images/rodent-1.0/PNG/32x32/rat.png';

class PizzaRat extends Player {
  constructor(game, y) {
    super(game, 64, y);
    this.width = 64;
    this.height = 64;
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      const units = this.game.canvas.width * 0.015;
      switch (key) {
        case 'ArrowRight':
          if (this.x + this.width < this.game.canvas.width - units) {
            this.speedX = units;
          } else {
            this.x = 0;
          }
          break;
        case 'ArrowLeft':
          if (this.x > units) {
            this.speedX = -units;
          } else {
            this.x = this.game.canvas.width;
          }
          break;
        case 'Space':
          this.game.launchPizza();
          break;
        case 'ArrowUp':
          this.game.pizzaDropOffR();
          break;
      }
    });
  }

  paint() {
    const context = this.game.context;
    context.save();
    if (this.speedX < 0) {
      context.drawImage(
        rat,
        0,
        96,
        32,
        32,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      context.drawImage(
        rat,
        0,
        34,
        32,
        32,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    context.restore();
  }
}
