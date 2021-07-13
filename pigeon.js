class Pigeon extends Player {
  constructor(game, y) {
    super(game, 0, y);
    this.width = 20;
    this.height = 20;
    // this.enableControls();
  }

  // enableControls() {
  //     window.addEventListener('mousemove', (event) => {

  // }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
