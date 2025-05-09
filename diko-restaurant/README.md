# Diko Restaurant - Monorepo

Application web complète pour la gestion d'un restaurant, construite avec React, Express, et MongoDB.

## Structure du projet

```
diko-restaurant/
├── apps/
│   ├── client/      # Application client React
│   ├── admin/       # Interface d'administration React
│   └── api/         # Backend Express.js
├── libs/
│   ├── ui/          # Composants React partagés
│   ├── utils/       # Utilitaires JavaScript partagés
│   └── styles/      # Configuration Tailwind et styles globaux
└── packages/
    └── eslint-config/ # Configuration ESLint partagée
```

## Prérequis

- Node.js >= 18
- MongoDB
- npm >= 9

## Installation

1. Cloner le repository :
\`\`\`bash
git clone <your-repo-url>
cd diko-restaurant
\`\`\`

2. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Configurer l'environnement :
- Copier \`.env.example\` vers \`.env\` dans \`apps/api\`
- Ajuster les variables d'environnement selon vos besoins

## Développement

Démarrer tous les services :
\`\`\`bash
npm run dev
\`\`\`

Ou démarrer individuellement :
- Client : \`npm run dev:client\` (port 3000)
- Admin : \`npm run dev:admin\` (port 3001)
- API : \`npm run dev:api\` (port 5000)

## Scripts disponibles

- \`npm run dev\` : Démarre tous les services en mode développement
- \`npm run build\` : Build tous les packages et applications
- \`npm run lint\` : Vérifie le code avec ESLint
- \`npm run format\` : Formate le code avec Prettier
- \`npm run clean\` : Nettoie les builds et node_modules

## Contribution

1. Créer une branche pour votre fonctionnalité
2. Commiter vos changements
3. Pousser vers la branche
4. Créer une Pull Request

## Licence

MIT
