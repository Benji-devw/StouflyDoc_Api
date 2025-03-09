# StouflyDoc API

## Description
L'API `stouflyDoc` permet de gérer des pistes musicales (samples audio). Elle est construite avec Express.js et utilise MongoDB pour le stockage des données. Cette API sert de backend pour l'application web StouflyDoc qui permet aux utilisateurs de partager, découvrir et télécharger des samples musicaux.

## Fonctionnalités
- **Gestion des pistes** : Ajouter, récupérer, mettre à jour et supprimer des pistes audio.
- **Filtrage avancé** : Rechercher des pistes par titre, catégorie, BPM, tags et autres critères.
- **Téléchargement de fichiers** : Support pour le téléchargement et le stockage de fichiers audio.
- **API RESTful** : Interface conforme aux principes REST pour une intégration facile.

## Structure du projet
```
stoufly-doc_api/
├── config/           # Configuration de l'application
├── controllers/      # Contrôleurs pour la logique métier
├── middleware/       # Middleware (multer pour les uploads, etc.)
├── models/           # Modèles Mongoose
├── public/           # Fichiers statiques (uploads)
├── routes/           # Définition des routes
└── index.js          # Point d'entrée de l'application
```

## Routes

### Tracks
- `GET /tracks` : Récupère les pistes avec filtrage (query params: search, tag, category, BpmMin, BpmMax)
- `GET /tracks/all` : Récupère toutes les pistes sans filtrage
- `GET /tracks/find/:id` : Récupère une piste spécifique par son ID
- `POST /tracks` : Ajoute une nouvelle piste (avec un fichier audio)
- `PUT /tracks/:id` : Met à jour une piste existante
- `DELETE /tracks/:id` : Supprime une piste

## Modèle de données

### Track
```javascript
{
  title: String,          // Titre de la piste
  description: String,    // Description
  category: String,       // Catégorie (ex: Drums, Bass, etc.)
  bpm: Number,            // Beats per minute
  tags: [String],         // Tags associés
  audioUrl: String,       // URL du fichier audio
  createdAt: Date,        // Date de création
  updatedAt: Date         // Date de mise à jour
}
```

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd stouflyDoc_api
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Configurez votre fichier `.env.local` avec les variables nécessaires :
   ```
   DB_URI=mongodb://localhost:27017/stouflydoc
   PORT=8080
   ```

## Démarrage
Pour démarrer le serveur en production :
```bash
npm start
```

Le serveur écoute sur le port spécifié dans le fichier `.env.local` ou par défaut sur le port 8080.

## Développement
Pour le développement, vous pouvez utiliser `nodemon` pour redémarrer automatiquement le serveur lors des modifications :
```bash
npx nodemon index.js
```

## Déploiement
L'API est configurée pour être déployée sur Vercel. Le fichier `vercel.json` contient la configuration nécessaire.

## Auteurs
- Ben

## License
Ce projet est sous licence ISC.
```

### Explication
Ce README fournit une vue d'ensemble de l'API, y compris les routes disponibles, les instructions d'installation et de démarrage, ainsi que des informations sur le développement. Cela aidera les utilisateurs à comprendre rapidement comment utiliser et contribuer à ton API. 

Si tu souhaites des modifications ou des ajouts spécifiques, fais-le moi savoir !
