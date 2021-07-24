class StockPile {
  constructor(game, x, y, image) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = 60;
    this.height = 60;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.restore();
  }
}
