// Projet : P_Bulles Snake
// Auteur : Thibaud Racine
// Classe : CID2A
// Lieu : ETML, Sébeillon
// Date : 05.12.23
// Fichier : Apple.js
// Description : Classe qui s'occupe de toutes les fonctions du fruit.
 
export default class Apple {
    // Constructeur pour initialiser l'objet Apple
    constructor(unitSize, gameWidth, gameHeight) {
        this.unitSize = unitSize;  // Taille de la pomme
        this.gameWidth = gameWidth;  // Largeur du jeu
        this.gameHeight = gameHeight;  // Hauteur du jeu
        this.position = this.createRandomPosition();  // Position initiale aléatoire de la pomme
    }
    
    // Log la position des pommes
    logPosition() {
        console.log(`Position de la pomme = X: ${this.position.x} | Y: ${this.position.y}`);
    }

    // Crée  une position aléatoire pour la pomme dans les limites du jeu
    createRandomPosition() {
        const x = this.randomNumber(0, this.gameWidth - this.unitSize);
        const y = this.randomNumber(0, this.gameHeight - this.unitSize);
        return { x, y };
    }

    // Méthode pour dessiner la pomme
    draw(ctx, color) {
        ctx.fillStyle = color;  // Définit la couleur pour la pomme
        ctx.fillRect(this.position.x, this.position.y, this.unitSize, this.unitSize);
        apple.logPosition();
    }

    // Génère un nombre aléatoire
    randomNumber(min, max) {
        // Génère un nombre aléatoire pour obtenir une position alignée sur la grille
        return Math.round((Math.random() * (max - min) + min) / this.unitSize) * this.unitSize;
    }
}