export default class Apple {
    // Constructeur pour initialiser l'objet Apple
    constructor(unitSize, gameWidth, gameHeight) {
        this.unitSize = unitSize;  // Taille de chaque unité (carré) de la pomme
        this.gameWidth = gameWidth;  // Largeur du jeu
        this.gameHeight = gameHeight;  // Hauteur du jeu
        this.position = this.createRandomPosition();  // Position initiale aléatoire de la pomme
    }
    // Fonction pour créer une position aléatoire pour la pomme dans les limites du jeu
    createRandomPosition() {
        const x = this.randomNumber(0, this.gameWidth - this.unitSize);
        const y = this.randomNumber(0, this.gameHeight - this.unitSize);
        return { x, y };
    }
    // Méthode pour dessiner la pomme sur le canevas du jeu avec une couleur spécifiée
    draw(ctx, color) {
        ctx.fillStyle = color;  // Définit la couleur de remplissage pour la pomme
        ctx.fillRect(this.position.x, this.position.y, this.unitSize, this.unitSize);  // Dessine un rectangle rempli pour la pomme
    }
    // Fonction pour générer un nombre aléatoire dans une plage donnée
    randomNumber(min, max) {
        // Génère un nombre aléatoire, l'arrondit à l'unité de taille de la pomme et le multiplie par cette unité pour obtenir une position alignée sur la grille
        return Math.round((Math.random() * (max - min) + min) / this.unitSize) * this.unitSize;
    }
}