# Sincli Templates Front

Ce repository contient les templates frontend pour les applications créées avec [sincli](https://github.com/sinclr/sincli).

## 📋 Concept

Lors de la création d'une nouvelle application avec `sincli app:create-fullstack`, l'utilisateur pourra choisir :

1. Un template d'infrastructure (backend AWS)
2. Un template frontend depuis ce repository

Cette séparation permet de :

- Maintenir et faire évoluer les templates frontend indépendamment
- Créer différentes variantes de frontend pour la même infrastructure
- Partager facilement les templates entre projets

## 🏗️ Structure requise

Chaque template frontend DOIT respecter la structure suivante pour garantir la compatibilité avec l'infrastructure backend :

```
nom-du-template/
├── src/
│   ├── core/                   # Infrastructure commune (OBLIGATOIRE)
│   │   ├── api/                # Client HTTP
│   │   │   └── apiClient.js    # Configuration axios avec VITE_API_URL
│   │   ├── config/             # Configuration de l'app
│   │   └── ...
│   ├── shared/                 # Composants réutilisables
│   └── features/               # Fonctionnalités métier
├── .env.development.example    # Variables d'environnement dev
├── .env.production.example     # Variables d'environnement prod
├── package.json               # Dépendances npm
├── vite.config.js             # Configuration Vite
└── README.md                  # Documentation du template
```

### Points d'intégration essentiels

1. **Variable d'environnement** : `VITE_API_URL` doit être utilisée pour l'URL de l'API backend
2. **Client API** : Le fichier `src/core/api/apiClient.js` doit configurer axios avec cette URL
3. **Structure modulaire** : Organisation en `core/`, `shared/`, `features/`

## 📁 Templates disponibles

### simple-front-1

Template de base avec :

- React 18 + Vite
- Zustand pour le state management
- TanStack Query pour les appels API
- TailwindCSS pour le styling
- Navigation responsive
- Pages système (Settings, User)

_D'autres templates seront ajoutés progressivement._

## 🚀 Utilisation

Ces templates sont utilisés automatiquement par sincli lors de la création d'une nouvelle application :

```bash
sincli app:create-fullstack --name mon-app
# L'utilisateur pourra choisir parmi les templates disponibles
```

## 🔧 Créer un nouveau template

Pour ajouter un nouveau template :

1. Copier un template existant comme base
2. Le renommer avec un nom descriptif
3. Adapter le contenu selon vos besoins
4. S'assurer que les points d'intégration sont respectés
5. Mettre à jour ce README avec la description du nouveau template

## 📌 Compatibilité

Ces templates sont conçus pour fonctionner avec l'infrastructure backend standard de sincli qui fournit :

- API REST via AWS API Gateway
- Endpoints standards : `/api/settings`, `/api/config`, etc.
- Authentification (à implémenter selon les besoins)

## 🤝 Contribution

Les contributions sont bienvenues ! Assurez-vous que votre template :

- Respecte la structure requise
- Inclut une documentation claire
- Fonctionne avec l'infrastructure backend standard

## 📄 Licence

[À définir]
