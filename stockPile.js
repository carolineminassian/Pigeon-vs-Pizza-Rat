class StockPile {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'pink';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
