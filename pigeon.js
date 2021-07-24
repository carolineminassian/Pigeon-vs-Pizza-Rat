const pigeon = new Image();
pigeon.src = '/images/pigeon-1.1/PNG/32x32/pigeon-NESW.png';

class Pigeon extends Player {
  constructor(game, y) {
    super(game, 0, y);
    this.width = 64;
    this.height = 64;
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('mousemove', (event) => {
      this.x = event.offsetX - this.width / 2;
      this.y = event.offsetY - this.height / 2;
    });

    window.addEventListener('click', () => {
      this.game.dropDroppings();
    });
    window.addEventListener('dblclick', () => {
      this.game.pizzaDropOffP();
    });
  }

  paint() {
    const context = this.game.context;
    context.save();

    context.drawImage(
      pigeon,
      0,
      32,
      32,
      32,
      this.x,
      this.y,
      this.width,
      this.height
    );

    context.restore();
  }
}
