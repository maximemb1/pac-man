# Pac-Man

Un jeu Pac-Man rétro développé en **TypeScript** et **HTML5 Canvas**, propulsé par **Vite** et déployé sur **GitHub Pages**. Ce projet a été conçu pour maîtriser l'architecture orientée objet, la gestion de l'IA des fantômes et le responsive design.



## ✨ Fonctionnalités

- 🕹️ **Gameplay fidèle** : Gestion des déplacements sur grille, collisions de murs, pac-gommes et bonus de super-pac-man.
- 👻 **IA des fantômes intelligente** : Comportements spécifiques (états normal, peur, et retour en base après avoir été mangé avec un délai d'attente).
- 📱 **Responsive & Tactile** : Design 100% responsive et prise en charge des contrôles par gestes tactiles (*swipe*) sur mobile.
- ⚙️ **Sauvegarde** : Sauvegarde des meilleurs scores et des statistiques via le `localStorage`.
- 🗺️ **Multiples cartes** : Système de transition et d'animation entre plusieurs niveaux/maps.
- ⏸️ **Système de Pause** : Metter la pause ou reprener le jeu a tout moment avec les touches *espace*, *entrée* et *p*.



## 🛠️ Technique

- **Langage** : TypeScript
- **Rendu graphique** : HTML5 Canvas & Context 2D
- **Outil de build** : Vite
- **Hébergement** : GitHub Pages
- **Styles** : CSS3 (Variables, Clamp, Animations dynamiques)



## 📁 Structure du Projet

```text
src/
├── assets/         # Ressources graphiques et polices (ex: Crackman font)
├── ts/             # Code source TypeScript
│   ├── bille.ts        # Gestion des pac-gommes et super-boosts
│   ├── fantome.ts      # Logique, IA et gestion de la base des fantômes
│   ├── interfaces.ts   # Gestion des écrans UI (Home, Game Over, etc.)
│   ├── main.ts         # Point d'entrée et boucle principale (Game Loop)
│   ├── map.ts          # Cartes et affichage du labyrinthe
│   ├── pacman.ts       # Contrôles et mouvements du joueur
│   ├── Player.ts       # Gestion des scores, vies et statistiques
│   ├── save.ts         # Gestion du localStorage
│   ├── utile.ts        # Fonctions mathématiques utilitaires (distances, etc.)
│   └── variables.ts    # Variables globales et éléments du DOM
├── style.css       # Styles globaux et design responsive
index.html          # Page principale du jeu
```



## ☑️ Commencer

[Vous pouver y jouer directement dans un navigateur](https://maximemb1.github.io/pac-man/).

---


### Le lancer en local
---
installer les dépendances:

```bash

npm install

```

lancer le serveur de développement:

```bash

npm run dev

```