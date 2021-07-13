const GRAVITY = 0.2;

class Pizza {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 30;
    this.speedY = 0;
    this.speedX = 2;
  }

  runLogic() {
    if (this.y < this.game.canvas.height - this.height) {
      this.speedY += GRAVITY;
      this.y += this.speedY;
    }
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'orange';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
