# Architecture Frontend - Template Simple Front 1

Fichier: README.md
Template sincli pour applications React modernes

## Vue d'ensemble

Ce template fournit une architecture frontend modulaire en 3 couches principales conçue pour la réutilisabilité entre projets et la maintenabilité à long terme :

- **`core/`** : Infrastructure commune à toutes les applications
- **`shared/`** : Composants et utilitaires réutilisables entre features
- **`features/`** : Logique métier spécifique par projet

Cette approche permet de développer plusieurs applications à partir d'une base commune tout en gardant la flexibilité nécessaire pour les spécificités métier de chaque projet.

## 🔌 Intégration avec Sincli

Ce template est conçu pour fonctionner avec l'infrastructure backend AWS déployée par sincli :

- **API URL** : Configurée via `VITE_API_URL` (mise à jour automatiquement après déploiement)
- **Endpoints standards** : `/api/settings`, `/api/config`, etc.
- **Client HTTP** : Pré-configuré dans `core/api/apiClient.js`

## Architecture en couches

### Core Layer - Infrastructure

Le dossier `core/` contient tous les éléments d'infrastructure communs entre applications et partagé dans toute l'application :

#### **Configuration (`core/config/`)**

- `navigation.js` : Configuration des menus avec structure extensible
- `theme.js` : Paramètres globaux
- `appSettings.js` : Configuration générale de l'application

#### **API et Services (`core/api/`, `core/services/`)**

- `apiClient.js` : Client HTTP avec intercepteurs (auth, erreurs)
- `authService.js` : Service d'authentification global
- `storageService.js` : Abstraction du localStorage avec gestion d'erreurs

#### **Hooks d'Architecture (`core/hooks/`)**

- `useBreakpoint.js` : Détection responsive (mobile/desktop)
- `useAuth.js` : Logique d'authentification globale

#### **Layout et Navigation (`core/layouts/`, `core/components/`)**

- `AppLayout.jsx` : Layout principal responsive
- `Navbar.jsx` : Navigation adaptative desktop/mobile
- `MobileMenu.jsx` : Menu burger avec overlay

#### **Pages Système (`core/pages/`)**

- `SettingsPage.jsx` : Paramètres utilisateur (thème, à propos)
- `UserPage.jsx` : Profil utilisateur et gestion du compte

### Shared Layer - Composants Réutilisables

#### **UI Components (`shared/ui/`)**

Composants visuels avec design sobre (gris/bleu) :

- `Button.jsx` : Bouton avec variants (primary, secondary, danger)
- `Card.jsx` : Container avec ombre et padding
- `Input.jsx` : Champ de saisie avec gestion d'erreurs
- `Modal.jsx` : Popup avec overlay et gestion ESC
- `Toggle.jsx` : Switch pour les options on/off

#### **Hooks Utilitaires (`shared/hooks/`)**

- `useToggle.js` : Gestion d'états booléens
- `useDebounce.js` : Optimisation des recherches

#### **Utilitaires (`shared/utils/`)**

- `dates.js` : Formatage et manipulation des dates
- `formatters.js` : Formatage nombres, devises, tailles fichiers

#### **Constants (`shared/constants/`)**

- `common.js` : Codes HTTP, clés de storage, routes

### Features Layer - Logique Métier

Structure type pour chaque feature :

```
features/[feature-name]/
├── components/          # Composants UI spécifiques
├── hooks/              # Logique métier réutilisable
├── pages/              # Pages complètes
├── services/           # APIs et logique business
├── store/              # État local de la feature
```

## Système de Navigation Responsive

### Desktop

- **Navbar horizontale** en haut de page
- **Icônes + texte** pour les items principaux
- **Boutons Settings/User** alignés à droite
- Navigation toujours visible

### Mobile

- **Navbar en bas** de l'écran (fixed)
- **Icônes seules** pour les items principaux
- **Menu burger** donnant accès au menu complet
- **Overlay** avec menu latéral pour Settings/User

### Configuration

La navigation est facilement personnalisable via `core/config/navigation.js` :

```javascript
// Configuration par défaut (modifiable selon vos besoins)
const mainItems = [
  { id: "home", label: "Accueil", icon: "Home", path: "/" },
  { id: "feature1", label: "Feature 1", icon: "Star", path: "/feature1" },
  { id: "feature2", label: "Feature 2", icon: "BarChart", path: "/feature2" },
];
```

Pour personnaliser selon votre projet, modifiez simplement cette configuration.

## Design System

### Palette de Couleurs

- **Primaire** : Bleu (`blue-600`) pour les actions principales
- **Secondaire** : Gris (`gray-200`) pour les actions secondaires
- **Danger** : Rouge (`red-600`) pour les actions destructives
- **Texte** : Gris foncé (`gray-900`) / Blanc en mode sombre
- **Arrière-plan** : Gris clair (`gray-50`) / Gris foncé en mode sombre

### Mode Sombre

Support complet du mode sombre avec classes Tailwind `dark:` :

- Basculement via Toggle dans les Settings
- Persistance des préférences utilisateur
- Application automatique à tous les composants

### Responsive Breakpoints

- **Mobile** : < 768px (sm)
- **Tablet** : 768px - 1024px (md)
- **Desktop** : > 1024px (lg)

## State Management

### Architecture de l'État

1. **État Local** : `useState` pour les interactions simples
2. **État Feature** : Zustand stores dans `features/[name]/store/`
3. **État Global** : Hooks dans `core/hooks/` pour l'infrastructure
4. **Cache Serveur** : React Query pour les données API

### Exemple d'Implementation

```javascript
// État local simple
const [isOpen, setIsOpen] = useState(false);

// Hook d'infrastructure
const { isMobile } = useBreakpoint();

// Store de feature (exemple)
const useFeatureStore = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));
```

## Routing

### Structure des Routes

- **Routes système** : Gérées dans `App.jsx`
- **Routes feature** : Définies dans chaque feature
- **Protection** : Middleware d'authentification via `core/auth/`

### Configuration

```javascript
// Routes communes à tous les projets
<Route path="/" element={<HomePage />} />
<Route path="/settings" element={<SettingsPage />} />
<Route path="/user" element={<UserPage />} />

// Routes spécifiques (à ajouter selon vos features)
<Route path="/feature/*" element={<FeatureRoutes />} />
```

## Performance et Optimisations

### Lazy Loading

```javascript
// Chargement différé des features
const FeaturePage = lazy(() => import("./features/feature/pages/FeaturePage"));
```

### Memoization

```javascript
// Optimisation des re-renders
const MemoizedComponent = memo(ExpensiveComponent);
```

### Bundle Splitting

- Séparation automatique par routes (Vite)
- Chunks séparés pour les features lourdes
- Optimisation des imports externes

## Gestion des Erreurs

### Error Boundaries

Implementation recommandée pour capturer les erreurs React :

```javascript
// shared/components/ErrorBoundary.jsx (à implémenter selon vos besoins)
class ErrorBoundary extends React.Component {
  // Gestion des erreurs avec fallback UI
}
```

### Gestion API

- Intercepteurs axios dans `core/api/apiClient.js`
- Messages d'erreur utilisateur friendly
- Retry automatique pour les erreurs réseau

## Tests

### Structure Recommandée

```
src/
├── __tests__/           # Tests globaux
├── core/
│   └── __tests__/       # Tests infrastructure
├── shared/
│   └── __tests__/       # Tests composants partagés
└── features/
    └── [feature]/
        └── __tests__/   # Tests feature
```

### Types de Tests

- **Unit Tests** : Composants et fonctions utilitaires
- **Integration Tests** : Interaction entre composants
- **E2E Tests** : Parcours utilisateur complets

## Accessibilité

### Bonnes Pratiques Intégrées

- Landmarks HTML sémantiques
- Support clavier complet
- Contraste suffisant (mode sombre/clair)
- Labels appropriés pour les formulaires
- Focus management dans les modals

### Tools

- Tailwind classes pour l'accessibilité
- Aria attributes sur les composants interactifs
- Tests automatisés avec axe-core (recommandé)

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ et npm
- Application backend déployée avec sincli

### Installation et développement

```bash
# Les dépendances sont installées automatiquement par sincli
# Si besoin de réinstaller :
npm install

# Lancer le développement
npm run dev

# Build de production
npm run build
```

### Variables d'environnement

Les fichiers `.env.development` et `.env.production` sont créés automatiquement depuis les `.example` lors de l'utilisation avec sincli.

## Développement Multi-Projets

### Configuration par Projet

```bash
# Variables d'environnement pour adapter l'app
VITE_PROJECT_TYPE=myproject        # Nom de votre projet
VITE_APP_NAME="Mon Application"
VITE_PROJECT_THEME=blue           # Couleurs spécifiques
```

### Workflow Recommandé

1. **Développer dans `core/`** : Infrastructure commune
2. **Étendre dans `shared/`** : Composants réutilisables
3. **Spécialiser dans `features/`** : Logique métier unique

### Personnalisation

Pour adapter à votre projet :

1. Modifiez `core/config/navigation.js` avec vos menus
2. Ajoutez vos features dans `features/[votre-domaine]/`
3. Personnalisez les couleurs dans `core/config/theme.js`
4. Étendez `shared/ui/` avec vos composants spécifiques

## Extensions Futures

### Fonctionnalités Prévues

- **Internationalization (i18n)** : Support multi-langues
- **PWA** : Application web progressive
- **WebSockets** : Temps réel pour applications connectées
- **Charts avancés** : Recharts pour analytics
- **Upload de fichiers** : Gestion images/documents

### Architecture Évolutive

L'architecture actuelle supporte facilement :

- Ajout de nouvelles features
- Migration vers TypeScript
- Intégration de nouvelles librairies
- Scaling de l'équipe de développement

## 📚 Documentation

Pour plus d'informations sur l'intégration avec le backend et l'infrastructure AWS, consultez la documentation complète de votre application après création avec sincli.
