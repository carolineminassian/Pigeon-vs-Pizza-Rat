const GRAVITY = 0.2;
const pizza = new Image();
pizza.src = '/images/pizzaslice.png';

class Pizza {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 83;
    this.speedY = 0;
    this.speedX = 2;
  }

  runLogic() {
    if (this.y < this.game.canvas.height - this.height) {
      this.speedY += GRAVITY;
      this.y += this.speedY;
    }
  }

  invertedRunLogic() {
    if (this.y < 0) {
      this.speedY = 0;
      this.y += this.speedY;
    } else if (this.y < this.game.canvas.height - this.height) {
      this.speedY += 20;
      this.y -= this.speedY;
    }
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(pizza, this.x, this.y, this.width, this.height);
    // context.fillStyle = 'orange';
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
