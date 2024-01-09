// Projet : P_Bulles Snake
// Auteur : Thibaud Racine
// Classe : CID2A
// Lieu : ETML, Sébeillon
// Date : 05.12.23
// Fichier : Snake.js
// Description : Classe qui s'occupe de toutes les fonctions du Snake.

export default class Snake {
  // Constructeur pour initialiser l'objet Snake
  constructor(unitSize, initialLength) {
    this.unitSize = unitSize; // Taille de chaque carré dans le Snake
    this.snakeBody = this.createInitialSnake(initialLength); // Initialise le corps du serpent
  }
  // Crée le corps initial du Snake
  createInitialSnake(initialLength) {
    const snake = [];
    for (let i = 0; i < initialLength; i++) {
      snake.push({ x: this.unitSize * (initialLength - i - 1), y: 0 });
    }
    return snake;
  }
  // Déplace le serpent en mettant à jour ses coordonnées en fonction de la vélocité
  move(xVelocity, yVelocity) {
    const head = {
      x: this.snakeBody[0].x + xVelocity,
      y: this.snakeBody[0].y + yVelocity,
    };
    // Ajoute la nouvelle tête à l'avant du corps du serpent
    this.snakeBody.unshift(head);
  }

  // Dessine le serpent sur le jeu
  draw(ctx, snakeColor, snakeBorder) {
    let hue = 0; // Initialise la teinte du Snake
    this.snakeBody.forEach((snakePart, index) => {
      // Change les couleurs du serpent
      hue = (hue + 3) % 360; // Change le gradient de 3 du snake à chaque fruit mangé
      const color = `hsl(${hue}, 100%, 50%)`;
      ctx.fillStyle = color;
      ctx.strokeStyle = snakeBorder;
      ctx.fillRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
      ctx.strokeRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
    });
  }
}
