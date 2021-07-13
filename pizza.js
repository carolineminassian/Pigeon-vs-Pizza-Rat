class Pizza {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 30;
    }

    runLogic() {
        if (this.y < this.game.canvas.height-this.height) {
            this.y++;
        }
    }

    paint() {
        const context = this.game.context;
        context.save();
        context.fillStyle = 'orange';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
    }


}