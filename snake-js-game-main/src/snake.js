export default class Snake {
    constructor(unitSize, initialLength) {
        this.unitSize = unitSize;
        this.snakeBody = this.createInitialSnake(initialLength);
    }
 
    createInitialSnake(initialLength) {
        const snake = [];
        for (let i = 0; i < initialLength; i++) {
            snake.push({ x: this.unitSize * (initialLength - i - 1), y: 0 });
        }
        return snake;
    }
 
    move(xVelocity, yVelocity) {
        const head = { x: this.snakeBody[0].x + xVelocity, y: this.snakeBody[0].y + yVelocity };
        this.snakeBody.unshift(head);
    }
 
    eat() {
        // Logic for eating the food
        // Add the food coordinates to the snake's body
        // (you need to implement this part based on your game logic)
    }
 
    draw(ctx, snakeColor, snakeBorder) {
        let hue = 0;
        this.snakeBody.forEach((snakePart, index) => {
            // Change colors of the snake
            hue = (hue + 5) % 360;
            const color = `hsl(${hue}, 100%, 50%)`;
            ctx.fillStyle = color;
            ctx.strokeStyle = snakeBorder;
            ctx.fillRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
        });
    }
}