# IPS — Images Par Seconde

Site web ultra-moderne pour la compagnie de danse contemporaine "Images Par Seconde". Design futuriste avec effets WebGL, animations GSAP fluides et esthétique sombre avec accents orange.

## 🎨 Design

- **Style** : Futuriste, typographique, sombre
- **Couleurs** : Orange brand (#E85002), noir (#000000), blanc (#F9F9F9)
- **Effets** : Gradients grainy, halos orange, liquid glass, glass morphism
- **Animations** : JavaScript fluides avec GSAP et Three.js

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router) + TypeScript
- **Styling** : Tailwind CSS avec tokens personnalisés
- **Animations** : GSAP + ScrollTrigger
- **3D/WebGL** : Three.js + postprocessing (Bloom)
- **Scroll** : Lenis smooth-scroll
- **Micro-interactions** : Framer Motion
- **Polices** : Space Grotesk, Sora, Inter (Google Fonts)
- **Multilingue** : Support FR/EN avec traductions centralisées

## 📁 Structure du Projet

```
├── app/
│   ├── layout.tsx              # Layout racine
│   ├── page.tsx                # Page de sélection de langue (noindex)
│   ├── fr/                     # Version française
│   │   ├── layout.tsx          # Layout FR avec metadata
│   │   └── page.tsx            # Page FR (utilise HomePage)
│   ├── en/                     # Version anglaise
│   │   ├── layout.tsx          # Layout EN avec metadata
│   │   └── page.tsx            # Page EN (utilise HomePage)
│   ├── admin/                  # Dashboard admin
│   │   ├── page.tsx            # Liste des dates
│   │   └── dates/
│   │       ├── new/page.tsx    # Nouvelle date
│   │       └── [id]/edit/      # Éditer une date
│   ├── api/                    # API Routes
│   │   └── dates/              # CRUD des dates
│   ├── sitemap.ts              # Sitemap XML dynamique
│   └── globals.css             # Styles globaux
├── components/
│   ├── HomePage.tsx            # Composant page réutilisable FR/EN
│   ├── ContactForm.tsx         # Formulaire avec validation
│   ├── StructuredData.tsx      # JSON-LD pour SEO
│   ├── Header.tsx              # Navigation sticky
│   ├── Footer.tsx              # Pied de page
│   ├── admin/                  # Composants admin
│   │   ├── ProtectedRoute.tsx  # Protection basique
│   │   └── DateForm.tsx        # Formulaire dates
│   └── [autres composants...]
├── lib/
│   ├── config.ts               # Configuration centralisée
│   ├── metadata.ts             # Génération metadata SEO
│   ├── translations.ts         # Traductions FR/EN
│   ├── data/                   # Données
│   │   ├── shows.ts            # Spectacles
│   │   ├── dates.ts            # Dates (helpers)
│   │   └── dates.json          # Stockage des dates
│   ├── hooks/                  # Hooks personnalisés
│   └── animations.ts           # Bibliothèque GSAP
├── types/
│   └── index.ts                # Types TypeScript centralisés
└── public/
    ├── robots.txt              # Configuration robots (dev mode)
    └── images/seo/             # Images SEO (à ajouter)
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd ips-dance-website

# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local
# Éditer .env.local avec vos valeurs

# Démarrer en mode développement
npm run dev
```

### Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# URL du site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# En production :
# NEXT_PUBLIC_SITE_URL=https://www.imagesparseconde.com
```

### Commandes Disponibles

```bash
# Développement
npm run dev          # Serveur de développement sur http://localhost:3000

# Production
npm run build        # Build optimisé pour production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
```

## 🎯 Fonctionnalités

### Pages publiques
- **Page de sélection de langue** (/) - noindex
- **Version française** (/fr) - Page complète avec metadata SEO
- **Version anglaise** (/en) - Page complète avec metadata SEO
- **Formulaire de contact** - Validation côté client (API à implémenter en prod)

### Dashboard Admin (/admin)
- **Protection par mot de passe** (par défaut : `admin123`)
- **Gestion des dates de spectacles** :
  - Liste des dates avec tri
  - Création de nouvelles dates
  - Édition des dates existantes
  - Suppression avec confirmation
- **Stockage JSON** (à remplacer par BDD en prod)

### Sections du site

#### 1. Hero (#accueil)
- Titre principal animé "IMAGES PAR SECONDE"
- InfoCards dynamiques avec progression
- Horloges temps réel
- Effets : gradients, grain, code binaire au survol

#### 2. Qui sommes-nous (#about)
- Présentation de la compagnie
- 3 piliers en LiquidCards avec effets
- Compteurs animés
- Image révélée au survol de la souris

#### 3. Réalisations (#realisations)
- Grille de 6 spectacles
- Filtres par catégorie (sticky)
- Effet hover "wipe" orange

#### 4. Les dates (#dates)
- **Dates chargées dynamiquement depuis l'API**
- Timeline verticale
- CTA "Demander une date"

#### 5. Contact (#contact)
- **Formulaire avec validation complète**
- Vérification email, champs requis, RGPD
- Message de succès animé
- Coordonnées et réseaux sociaux

## 🔐 Dashboard Admin

Le dashboard admin permet de gérer les dates de spectacles sans toucher au code.

### Accès
- URL : `http://localhost:3000/admin`
- Mot de passe par défaut : `admin123`
- ⚠️ **À changer en production** dans `components/admin/ProtectedRoute.tsx`

### Fonctionnalités
- Créer, modifier, supprimer des dates
- Dates affichées automatiquement sur le site FR et EN
- Validation des champs (format date, champs requis)
- Stockage dans `lib/data/dates.json`

### Pour la production
Remplacer le système actuel par :
- Une vraie authentification (NextAuth.js, Clerk, etc.)
- Une base de données (PostgreSQL, MongoDB, etc.)
- API Routes sécurisées avec middleware d'authentification

## 🌍 Multilingue

Le site supporte le français et l'anglais :

- **Traductions centralisées** dans `lib/translations.ts`
- **Metadata SEO** par langue avec hreflang
- **URLs SEO-friendly** : `/fr` et `/en`
- **Structured Data** JSON-LD par langue
- **Composant réutilisable** : `HomePage.tsx` accepte une prop `lang`

## ⚡ SEO et Performance

### SEO Implémenté
✅ Balises hreflang FR/EN  
✅ Metadata Open Graph et Twitter Card  
✅ Sitemap XML dynamique  
✅ Structured Data (JSON-LD)  
✅ robots.txt (mode dev, instructions pour prod)  
✅ Canonical URLs  
✅ Page racine en noindex

### Performance
- **WebGL** : Chargement paresseux (à implémenter)
- **GSAP** : Cleanup des ScrollTriggers
- **Compression** : Activée dans next.config.js
- **Headers de sécurité** : Configurés
- **Target** : Lighthouse desktop 70-85 en dev

### Accessibilité
- **Contraste** : Ratios AA respectés
- **Focus** : Anneaux 2px orange/blanc
- **Motion** : Respect de `prefers-reduced-motion`
- **Formulaire** : Validation et messages d'erreur clairs
- **Navigation** : Support clavier

## 🎨 Tokens de Design

```css
/* Couleurs */
--brand-orange: #E85002
--black: #000000
--white: #F9F9F9
--gray: #646464
--gray-light: #A7A7A7
--gray-dark: #333333

/* Gradient */
--gradient-brand: linear-gradient(120deg, #000 0%, #C10801 35%, #F16001 70%, #D9C3AB 100%)

/* Typographie */
--font-space-grotesk: Space Grotesk 800
--font-sora: Sora 800
--font-inter: Inter 400-500
```

## 🔧 Animations Clés

- **Hero** : Split text + skew, bandeau orange clip-path
- **Scroll** : Parallax 8%, sections pin, text reveal stagger 0.04s
- **Hover** : LiquidCard tilt + glow, ShowTile gradient pulsé
- **Transitions** : Overlay orange 300ms avec noise

## 📱 Responsive

- **Mobile** : Navigation burger plein écran
- **Tablet** : Grilles adaptatives
- **Desktop** : Effets WebGL complets
- **Breakpoints** : Tailwind standard (sm, md, lg, xl)

## 🎭 Effets Visuels

- **Glass Morphism** : Cartes avec backdrop-blur
- **Grain Noise** : Overlay canvas avec FBM
- **Orange Halo** : WebGL radial avec bloom
- **Cursor Glow** : Effet radial sur éléments interactifs
- **Liquid Cards** : Tilt 3D + inner-glow

## 🚀 Déploiement

Le projet est optimisé pour le déploiement sur Vercel :

```bash
# Build de production
npm run build

# Test local du build
npm run start
```

## ✅ Checklist avant Production

Avant de déployer sur `https://www.imagesparseconde.com/` :

### Configuration
- [ ] Mettre à jour `NEXT_PUBLIC_SITE_URL` dans `.env.local`
- [ ] Changer le mot de passe admin dans `ProtectedRoute.tsx`
- [ ] Activer le `robots.txt` de production (décommenter)
- [ ] Ajouter les vraies images SEO dans `/public/images/seo/`

### SEO
- [ ] Vérifier toutes les balises hreflang
- [ ] Tester le sitemap.xml
- [ ] Valider les structured data avec Google Rich Results Test
- [ ] Configurer Google Search Console
- [ ] Soumettre le sitemap à Google
- [ ] Ajouter les codes de vérification (Google, etc.)

### Fonctionnalités
- [ ] Implémenter l'API du formulaire de contact (voir `TODO.md`)
- [ ] Remplacer l'auth admin par NextAuth ou similaire
- [ ] Migrer de JSON vers une base de données (PostgreSQL recommandé)
- [ ] Ajouter les vrais liens réseaux sociaux dans `lib/config.ts`

### Performance
- [ ] Optimiser toutes les images avec next/image
- [ ] Tester sur Lighthouse (objectif: 90+)
- [ ] Vérifier les Core Web Vitals
- [ ] Tester sur mobile réel
- [ ] Activer un CDN si nécessaire

### Sécurité
- [ ] Vérifier les headers de sécurité
- [ ] Activer HTTPS
- [ ] Configurer CSP si nécessaire
- [ ] Sécuriser les API Routes

### Tests
- [ ] Navigation complète FR/EN
- [ ] Formulaire de contact
- [ ] Dashboard admin
- [ ] Responsive sur toutes tailles d'écran
- [ ] Compatibilité navigateurs (Chrome, Firefox, Safari, Edge)
- [ ] Tests accessibilité (WCAG AA)

Voir `TODO.md` pour la liste complète des tâches.

## 📄 Licence

Projet développé pour IPS — Images Par Seconde. Tous droits réservés.

---

**Développé avec ❤️ pour la danse contemporaine**
