const GRAVITY2 = 0.2;

class PigeonDropping {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.speedY = 0;
  }

  runLogic() {
    if (this.y + this.height <= this.game.canvas.height) {
      this.speedY += GRAVITY2;
      this.y += this.speedY;
    }
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'green';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
