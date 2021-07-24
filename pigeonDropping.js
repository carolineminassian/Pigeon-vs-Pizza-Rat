const GRAVITY2 = 0.2;
const poop = new Image();
poop.src = '/images/fallingPoo.png';
const poopSplat = new Image();
poopSplat.src = '/images/poopSplat.png';

class PigeonDropping {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
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
    if (this.y <= this.game.canvas.height - 64) {
      context.drawImage(
        poop,
        0,
        0,
        32,
        32,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      context.drawImage(
        poopSplat,
        64,
        32,
        64,
        64,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    context.restore();
  }
}
