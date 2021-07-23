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
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowDown':
          this.game.dropDroppings();
          break;
      }
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
