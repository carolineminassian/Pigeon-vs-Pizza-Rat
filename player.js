class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    // this.accelerationX = 0;
    // this.accelerationY = 0;
  }

  runLogic() {
    const resistance = 0.1;

    /*
    if (this.speedX > 0) {
      this.speedX -= resistance;
    } else if (this.speedX < 0) {
      this.speedX += resistance;
    }
    */

    this.speedX /= 1 + resistance;
    this.speedY /= 1 + resistance;

    // if (this.speedY > 0) {
    //     this.speedY -= resistance;
    // } else if (this.speedY < 0) {
    //     this.speedY += resistance;
    // }

    this.x += this.speedX;
    this.y += this.speedY;
  }
}
