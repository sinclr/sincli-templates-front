############################################################
CODEBASE
############################################################

############################################################
GUIDE D'INTEGRATION BACKEND -> FRONTEND
############################################################

# Guide d'intégration Backend → Frontend

Ce guide contient tout le nécessaire pour développer le frontend sans avoir à consulter la documentation backend.

## 🎯 Contexte et objectif

### Situation

Tu es en train de développer le frontend d'une application fullstack créée avec [sincli](https://github.com/sinclr/sincli). Le backend AWS (Lambda, DynamoDB, API Gateway, Cognito) est déjà déployé et fonctionnel. Ce document contient TOUTES les informations nécessaires pour développer le frontend sans avoir à consulter la documentation backend.

### Objectif

Transformer le template frontend statique actuel en une application pleinement fonctionnelle qui exploite toutes les ressources backend. L'application doit être immédiatement utilisable après création, avec toutes les fonctionnalités de base opérationnelles.

### Principes directeurs

- **Simplicité** : Pas de complexité inutile, pas de dataviz élaborée
- **Complétude** : Toutes les ressources backend doivent être exploitées
- **Modularité** : Structure permettant l'ajout facile de nouvelles features
- **Pragmatisme** : Solutions simples et efficaces, pas de sur-ingénierie

## 📋 Commande au LLM

### Ta mission

Développe le frontend React en suivant ces étapes dans l'ordre :

1. **Authentification Cognito** :

   - Créer la page de connexion (Login/Signup/Guest)
   - Implémenter le service d'authentification
   - Configurer les intercepteurs axios
   - Créer le store Zustand pour l'état utilisateur

2. **Infrastructure de base** :

   - Adapter la navigation pour les 3 types d'utilisateurs
   - Implémenter la gestion des permissions dans l'UI
   - Créer les composants de pagination réutilisables
   - Mettre en place la gestion d'erreurs globale

3. **Pages système** :

   - Adapter HomePage (vue guest/user)
   - Enrichir SettingsPage avec les user-settings
   - Créer AdminPage pour system-config
   - Adapter UserPage pour les infos Cognito

4. **Demo Features** :

   - Implémenter Demo Data (liste, création, édition)
   - Implémenter Sync Jobs (liste, déclenchement)
   - Respecter les patterns de sécurité pour chaque action

5. **Templates New Features** :
   - Créer la structure de base pour New Feature 1 & 2
   - Pages vides avec message et structure prête

### Contraintes techniques

- Utiliser TailwindCSS et Headless UI pour l'interface
- TanStack Query pour le cache et les requêtes
- Zustand pour l'état global
- Axios avec la configuration fournie
- Respecter la structure core/shared/features existante

### Ce que tu ne dois PAS faire

- Ajouter des graphiques ou visualisations complexes
- Implémenter des fonctionnalités non demandées
- Créer des tableaux de bord élaborés
- Ajouter des animations ou effets visuels
- Modifier la structure du backend ou ses endpoints

### Livrables attendus

Pour chaque étape, fournis :

1. Le code complet des fichiers créés/modifiés
2. Les commandes npm si de nouvelles dépendances sont nécessaires
3. Un test manuel simple pour vérifier que ça fonctionne

Commence par me demander confirmation avant de démarrer le développement, puis procède étape par étape.

---

## 🔑 Authentification et Permissions

### Configuration Cognito

- **Variables d'environnement** :
  ```
  VITE_COGNITO_USER_POOL_ID={fourni par sincli}
  VITE_COGNITO_CLIENT_ID={fourni par sincli}
  VITE_AWS_REGION=eu-west-3
  ```

### Structure du JWT Cognito

```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000", // userId (UUID)
  "email": "user@example.com",
  "cognito:username": "550e8400-e29b-41d4-a716-446655440000",
  "exp": 1737993055
}
```

### Extraction du userId

- **userId** = `claims.sub` du token JWT
- Pour les guests : userId = "guest"
- Ne JAMAIS utiliser l'email comme identifiant

### Rôles et permissions

| Rôle  | Permissions                            | Description                    |
| ----- | -------------------------------------- | ------------------------------ |
| guest | `['read']`                             | Non authentifié, lecture seule |
| user  | `['read', 'write']`                    | Utilisateur standard           |
| admin | `['read', 'write', 'delete', 'admin']` | Administrateur                 |

### Headers HTTP requis

```javascript
// Pour toutes les requêtes authentifiées
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## 📡 API Endpoints

### Base URL

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

### 1. Health Check

```
GET /
GET /api/async/health
```

- **Accès** : Public
- **Réponse** : `{status, timestamp, environment, app, version}`

### 2. User Settings (Pattern B - Owner-based)

```
GET /api/settings?userId={userId}
POST /api/settings
PUT /api/settings
DELETE /api/settings?userId={userId}&settingKey={key}
```

**GET Response** :

```json
{
  "items": [
    {
      "userId": "550e8400...",
      "settingKey": "display_name",
      "settingValue": "John Doe",
      "updatedAt": "2025-01-27T10:00:00.000Z"
    },
    {
      "userId": "550e8400...",
      "settingKey": "preferences",
      "settingValue": {
        "theme": "dark",
        "language": "fr",
        "notifications": { "email": true, "push": false }
      }
    }
  ],
  "count": 4
}
```

**POST Body** :

```json
{
  "userId": "550e8400...",
  "settings": {
    "display_name": "John Doe",
    "preferences": {
      "theme": "dark",
      "language": "fr"
    }
  }
}
```

**PUT Body** :

```json
{
  "userId": "550e8400...",
  "settingKey": "display_name",
  "settingValue": "Jane Doe"
}
```

**Règles** :

- Users peuvent uniquement modifier leurs propres settings
- Admins peuvent tout modifier
- Champs protégés (admin only) : `permissions`, `status`

### 3. System Config (Pattern A variant - Role-based)

```
GET /api/config
POST /api/config  (admin only)
PUT /api/config   (admin only)
DELETE /api/config?configKey={key} (admin only)
```

**GET Response** :

```json
{
  "app_info": {
    "version": "1.0.0",
    "name": "my-sincli-app",
    "build": "initial"
  },
  "maintenance_mode": false,
  "features": {
    "beta_features": false,
    "expert_mode": true,
    "max_upload_size": 10485760,
    "allowed_sources": ["STRAVA", "GOOGLE_FIT"]
  },
  "default_settings": {
    "theme": "light",
    "language": "fr",
    "timezone": "Europe/Paris"
  }
}
```

**POST/PUT Body** :

```json
{
  "configKey": "features",
  "configValue": {
    "beta_features": true,
    "max_upload_size": 20971520
  },
  "description": "Feature flags"
}
```

**Notes** :

- Cache backend : 5 minutes
- GET nécessite authentification (pas guest)
- Modifications réservées aux admins

### 4. Demo Data (Pattern A - Read Public, Write Protected)

```
GET /api/demo-data?{params}
POST /api/demo-data
PUT /api/demo-data
DELETE /api/demo-data?id={id}&timestamp={timestamp}
```

**GET Parameters** :

- `id` : Filtrer par ID
- `timestamp` : Filtrer par date
- `type` : Filtrer par type (activity, announcement, measurement)
- `createdBy` : Filtrer par créateur
- `limit` : Nombre d'items (défaut: 20)
- `lastEvaluatedKey` : Pour pagination

**GET Response** :

```json
{
  "items": [
    {
      "id": "demo-001",
      "timestamp": "2024-10-12T17:08:52.000Z",
      "type": "activity",
      "title": "Course à pied",
      "description": "Course de 14km",
      "status": "published",
      "data": {
        "sport_type": "Run",
        "distance": "14182.9",
        "duration": 5198
      },
      "tags": ["running", "evening"],
      "visibility": "public",
      "createdBy": "user123"
    }
  ],
  "count": 10,
  "nextKey": "eyJpZCI6ImRlbW8tMDEwIiwidGltZXN0YW1wIjoiMjAyNC0xMC0xMiJ9"
}
```

**POST Body** :

```json
{
  "type": "activity",
  "title": "Ma nouvelle activité",
  "description": "Description optionnelle",
  "status": "published",
  "data": {
    "custom_field": "value"
  },
  "tags": ["tag1", "tag2"],
  "visibility": "public"
}
```

**PUT Body** :

```json
{
  "id": "demo-001",
  "timestamp": "2024-10-12T17:08:52.000Z",
  "title": "Titre modifié",
  "description": "Nouvelle description"
}
```

**Règles** :

- **GET** : Public, mais guests voient seulement `visibility: "public"`
- **POST** : Authentification requise
- **PUT** : Owner ou admin uniquement
- **DELETE** : Admin uniquement

### 5. Sync Jobs

```
GET /api/sync-jobs?{params}
POST /api/sync-jobs
PUT /api/sync-jobs
DELETE /api/sync-jobs?jobId={id}&timestamp={ts}
```

**GET Parameters** :

- `jobId` : Format `{SOURCE}#{userId}`
- `source` : STRAVA, GOOGLE_FIT, etc.
- `status` : PENDING, RUNNING, SUCCESS, FAILED
- `limit` : Nombre d'items

**GET Response** :

```json
{
  "items": [
    {
      "jobId": "STRAVA#user123",
      "timestamp": "2025-07-26T10:30:00.000Z",
      "source": "STRAVA",
      "userId": "user123",
      "status": "SUCCESS",
      "startedAt": "2025-07-26T10:30:00.000Z",
      "completedAt": "2025-07-26T10:30:45.000Z",
      "itemsProcessed": 25,
      "itemsCreated": 20,
      "itemsUpdated": 5,
      "itemsFailed": 0
    }
  ],
  "count": 5
}
```

**POST Body** :

```json
{
  "jobId": "STRAVA#user123",
  "source": "STRAVA"
}
```

**Règles** :

- Users voient uniquement leurs propres jobs
- Admins voient tous les jobs

### 6. Demo Sync (Pattern C - Action-based)

```
POST /api/demo-sync
```

**Body** :

```json
{
  "operation": "demo_sync",
  "parameters": {
    "syncType": "demo",
    "itemsCount": 10
  }
}
```

**Response** :

```json
{
  "operation": "demo_sync",
  "syncType": "demo",
  "status": "SUCCESS",
  "summary": {
    "processed": 10,
    "created": 7,
    "updated": 3,
    "failed": 0
  },
  "jobId": "DEMO#demo",
  "timestamp": "2025-07-27T10:30:00.000Z"
}
```

**Note** : Authentification requise (Pattern C)

## 📄 Format de pagination

Tous les endpoints de liste utilisent ce format :

**Request** :

```
GET /api/demo-data?limit=20&lastEvaluatedKey={base64_encoded_key}
```

**Response** :

```json
{
  "items": [...],
  "count": 20,
  "nextKey": "eyJpZCI6Imxhc3QtaXRlbS1pZCIsInRpbWVzdGFtcCI6IjIwMjUtMDEtMjcifQ=="
}
```

Si `nextKey` est présent, il y a d'autres pages disponibles.

## 🔄 Gestion d'erreurs

### Codes HTTP

| Code | Description      | Action frontend                                       |
| ---- | ---------------- | ----------------------------------------------------- |
| 200  | Succès           | Traiter la réponse                                    |
| 400  | Requête invalide | Afficher l'erreur à l'utilisateur                     |
| 403  | Accès refusé     | Rediriger vers login ou afficher "Permission refusée" |
| 404  | Non trouvé       | Afficher "Ressource non trouvée"                      |
| 500  | Erreur serveur   | Afficher "Erreur technique, réessayez"                |

### Format d'erreur

```json
{
  "error": "PermissionError",
  "message": "You can only modify your own settings"
}
```

## 🏗️ Structure des pages à implémenter

### 1. Page de connexion (nouvelle)

- Login Cognito
- Signup Cognito
- Continuer en Guest

### 2. Home (existante à adapter)

- **Guest** : Contenu statique de présentation
- **User** : Message personnalisé "Bienvenue {display_name}"

### 3. New Feature 1 & 2 (templates vides)

Structure de dossiers suggérée :

```
features/new-feature-1/
├── components/
├── hooks/
├── pages/
│   └── NewFeature1Page.jsx  // "Feature à développer"
├── services/
└── store/
```

### 4. Demo Features

#### Demo Data

- Liste avec pagination
- Filtres : type, createdBy, tags
- Formulaire de création (si auth)
- Actions selon permissions

#### Sync Jobs

- Tableau avec colonnes : Source, Status, Date, Métriques
- Bouton "Lancer sync" → POST /api/demo-sync
- Filtres : source, status

### 5. Pages système

#### UserPage

- Afficher les infos Cognito (email, sub)
- Options de compte

#### SettingsPage

- Display name (éditable)
- Preferences (theme, language, notifications)
- Status et permissions (lecture seule)

#### AdminPage (admin only)

- Liste des configs système
- Formulaires d'édition
- Toggle maintenance mode

## 💾 État global recommandé (Zustand)

```javascript
// Structure du store principal
{
  // Auth
  user: {
    userId: "550e8400...",
    email: "user@example.com",
    displayName: "John Doe",
    status: "user",
    permissions: ["read", "write"]
  },
  token: "eyJ...",
  isAuthenticated: true,

  // Config système (cache 5min)
  systemConfig: {
    app_info: {...},
    maintenance_mode: false,
    features: {...}
  },

  // UI
  theme: "dark",
  isMobileMenuOpen: false
}
```

## 🔧 Configuration axios

```javascript
// Configuration de base dans apiClient.js
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token
apiClient.interceptors.request.use((config) => {
  const token = getToken(); // depuis le store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Rediriger vers login ou afficher message
    }
    return Promise.reject(error);
  }
);
```

## ✅ Checklist d'intégration

- [ ] Configurer les variables d'environnement Cognito
- [ ] Implémenter la page de connexion
- [ ] Adapter apiClient avec intercepteurs
- [ ] Créer le store Zustand pour auth et config
- [ ] Implémenter les pages Demo Data et Sync Jobs
- [ ] Adapter UserPage et SettingsPage pour user-settings
- [ ] Créer AdminPage pour system-config
- [ ] Gérer les permissions dans l'UI
- [ ] Implémenter la pagination
- [ ] Tester les 3 modes : guest, user, admin

############################################################
INSTRUCTIONS
############################################################

# LE CONTEXTE

Je développe actuellement un module python "sincli app" qui me permet de créer et déployer mes apps React + AWS à partir d'un template backend et d'un template frontend. L'ensemble de l'app est créé via "sincli app:create-fullstack" et déployé avec AWS CDK via "sincli app:setup-aws" et "sincli app:deploy". J'ai testé et tout fonctionne bien. Pour info, je suis développeur amateur et j'utilise ces outils car je travaille sur différents projets en même temps.

# MA DEMANDE

Je viens de t'envoyer :

- le code et la documentation du template frontend sur lequel je travaille (sincli-templates-front/simple-front-2/README.md).

- un "Guide d'intégration Backend → Frontend" détaillé, qui donne toutes les infos nécessaires sur le backend et sur le résultat attendu pour le frontend.

Tu devras impérativement respecter les principes suivants :

- approche MINIMALISTE : modifications strictement limitées à ce qui est nécessaire, SANS AUCUN AJOUT NI CHANGEMENT NON SOLLICITE OU VALIDE EXPLICITEMENT.

- documentation détaillée. Au fur et à mesure, il faudra mettre une place une documentation détaillée dans docs/ (en plus du README.md principal, qui devra rester très synthétique). Cette documentation sera conforme aux bonnes pratiques.

- pédagogie : toujours expliquer pourquoi et comment tu fais les choses, et attendre ma validation explicite à chaque étape.

Commence par me dire ce que tu comprends de ma demande et propose moi un plan d'action détaillé.
