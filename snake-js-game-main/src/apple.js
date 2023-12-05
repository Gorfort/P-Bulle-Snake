export default class Apple {
    constructor(unitSize, gameWidth, gameHeight) {
        this.unitSize = unitSize;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.position = this.createRandomPosition();
    }
 
    createRandomPosition() {
        const x = this.randomNumber(0, this.gameWidth - this.unitSize);
        const y = this.randomNumber(0, this.gameHeight - this.unitSize);
        return { x, y };
    }
 
    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.position.x, this.position.y, this.unitSize, this.unitSize);
    }
 
    randomNumber(min, max) {
        return Math.round((Math.random() * (max - min) + min) / this.unitSize) * this.unitSize;
    }
}