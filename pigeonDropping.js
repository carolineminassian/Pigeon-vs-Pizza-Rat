class PigeonDropping {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
  }

  runLogic() {
    window.addEventListener('click', () => {
      if (this.y < this.game.canvas.height - this.height) {
        this.speedY += GRAVITY;
        this.y += this.speedY;
      }
    });
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'brown';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
