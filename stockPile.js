class StockPile {
  constructor(game, x, y, image, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = width;
    this.height = height;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.restore();
  }
}
