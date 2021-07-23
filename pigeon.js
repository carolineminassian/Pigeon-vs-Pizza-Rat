class Pigeon extends Player {
  constructor(game, y) {
    super(game, 0, y);
    this.width = 60;
    this.height = 60;
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('mousemove', (event) => {
      this.x = event.offsetX;
      this.y = event.offsetY;
    });

    window.addEventListener('click', () => {
      this.game.dropDroppings();
    });
    window.addEventListener('dblclick', () => {
      this.game.pizzaDropOff();
    });
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
