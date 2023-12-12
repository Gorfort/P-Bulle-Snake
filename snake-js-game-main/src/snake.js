export default class Snake {
    // Fonction constructeur pour initialiser l'objet Snake
    constructor(unitSize, initialLength) {
        this.unitSize = unitSize;  // Taille de chaque unité (carré) dans le serpent
        this.snakeBody = this.createInitialSnake(initialLength);  // Initialise le corps du serpent
    }
    // Fonction pour créer le corps initial du serpent en fonction de la longueur spécifiée
    createInitialSnake(initialLength) {
        const snake = [];
        for (let i = 0; i < initialLength; i++) {
            // Initialise chaque partie du serpent avec des coordonnées x et y
            snake.push({ x: this.unitSize * (initialLength - i - 1), y: 0 });
        }
        return snake;
    }
    // Fonction pour déplacer le serpent en mettant à jour ses coordonnées en fonction de la vélocité
    move(xVelocity, yVelocity) {
        const head = { x: this.snakeBody[0].x + xVelocity, y: this.snakeBody[0].y + yVelocity };
        // Ajoute la nouvelle tête à l'avant du corps du serpent
        this.snakeBody.unshift(head);
    }
    // Fonction représentant la logique pour que le serpent mange de la nourriture (non implémentée dans ce code)
    eat() {
        // Logique pour manger la nourriture
        // Ajouter les coordonnées de la nourriture au corps du serpent
        // (vous devez implémenter cette partie en fonction de la logique de votre jeu)
    }
    // Fonction pour dessiner le serpent sur le canevas du jeu
    draw(ctx, snakeColor, snakeBorder) {
        let hue = 0;  // Initialise la teinte pour la variation des couleurs
        this.snakeBody.forEach((snakePart, index) => {
            // Change les couleurs du serpent en utilisant le modèle de couleur HSL
            hue = (hue + 3) % 360;
            const color = `hsl(${hue}, 100%, 50%)`;
            // Définit les styles de remplissage et de contour pour dessiner la partie du serpent
            ctx.fillStyle = color;
            ctx.strokeStyle = snakeBorder;
            // Dessine un rectangle rempli pour la partie du serpent
            ctx.fillRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
            // Dessine une bordure pour la partie du serpent
            ctx.strokeRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
        });
    }
}