class Game {
    constructor(canvas, screens) {
        this.canvas = canvas;
        this.screens = screens;
        this.context = canvas.getContext('2d');
        this.running = false;        
    
    }

    start() {
        this.running = true;
        this.pizzaRat = new PizzaRat(this, this.canvas.height-20);
        this.pigeon = new Pigeon(this, 0);
        this.pizza = new Pizza(this, Math.floor(Math.random() * this.canvas.width), 0);
        this.loop();
        this.displayScreen('playing');
    }

    displayScreen(name) {
        const screenThatShouldBeDisplayed = this.screens[name];
        const screensThatShouldBeHidden = Object
            .values(this.screens)
            .filter(screen => screen !== screenThatShouldBeDisplayed);
        screenThatShouldBeDisplayed.style.display = '';
        for (const screen of screensThatShouldBeHidden) screen.style.display = 'none';
    }

    loop() {
        this.runLogic();
        this.paint();
        if (this.running) {
            window.requestAnimationFrame(() => {
                this.loop();
            });
        }
    }

    runLogic() {
        this.pizzaRat.runLogic();
        this.pigeon.runLogic();
        this.pizza.runLogic();
    }

    launchPizza() {

    }

    lose() {
        this.running = false;
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    paintBackground() {
        const tileSize = 24;
        for (let row = 0; row < this.canvas.height / tileSize; row++) {
            for (let column = 0; column < this.canvas.width / tileSize; column++) {
                this.context.fillRect(row, column, this.canvas.width / tileSize, this.canvas.height / tileSize);

            }
        }
    }

    paint() {
        this.clearScreen();
        this.paintBackground();
        if (this.running) {
            this.pizzaRat.paint();
            this.pigeon.paint();
            this.pizza.paint();
        }
    }
}