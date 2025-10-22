# TODO - À faire avant la mise en production

## 🔴 CRITIQUE (À faire absolument)

### Contenu et Médias
- [ ] **Ajouter les vraies images SEO** dans `/public/images/seo/`
  - [ ] favicon.ico (32x32px)
  - [ ] apple-touch-icon.png (180x180px)
  - [ ] logo.png (512x512px)
  - [ ] og-image-fr.jpg (1200x630px)
  - [ ] og-image-en.jpg (1200x630px)
- [ ] Ajouter de vraies photos de spectacles si disponibles
- [ ] Vérifier et corriger tous les textes (orthographe, contenu)

### Configuration Domaine
- [ ] Configurer le domaine `imagesparseconde.com`
- [ ] Mettre à jour `NEXT_PUBLIC_SITE_URL` en production
- [ ] Configurer SSL/HTTPS
- [ ] Activer le `robots.txt` de production

### Formulaire de Contact
- [ ] Créer l'API Route `/api/contact`
- [ ] Choisir un service email (Resend, SendGrid, Nodemailer)
- [ ] Implémenter l'envoi d'email
- [ ] Ajouter protection anti-spam (reCAPTCHA ou Turnstile)
- [ ] Tester l'envoi réel d'emails
- [ ] Configurer les notifications d'emails reçus

### Authentification Admin
- [ ] Remplacer le mot de passe simple par NextAuth.js ou Clerk
- [ ] Configurer les providers d'authentification
- [ ] Sécuriser les API Routes avec middleware
- [ ] Ajouter système de sessions
- [ ] Gérer les rôles (admin, super-admin, etc.)

### Base de Données
- [ ] Choisir et configurer une base de données (PostgreSQL recommandé)
- [ ] Créer le schéma de données (tables dates, users, etc.)
- [ ] Migrer les dates de `dates.json` vers la BDD
- [ ] Mettre à jour les API Routes pour utiliser la BDD
- [ ] Configurer les backups automatiques

## 🟡 IMPORTANT (Recommandé avant lancement)

### SEO et Analytics
- [ ] Configurer Google Search Console
- [ ] Soumettre le sitemap
- [ ] Ajouter Google Analytics (GA4)
- [ ] Configurer les événements de conversion
- [ ] Vérifier l'indexation des pages FR/EN
- [ ] Tester les rich snippets avec Google Rich Results Test

### Performance
- [ ] Implémenter le lazy loading pour Three.js/WebGL
- [ ] Optimiser toutes les images
- [ ] Tester les performances sur mobile réel
- [ ] Atteindre un score Lighthouse de 90+
- [ ] Configurer un CDN (Cloudflare, Vercel Edge)
- [ ] Activer le cache agressif pour les assets statiques

### Réseaux Sociaux
- [ ] Ajouter les vrais liens Instagram, Facebook, YouTube, Vimeo
- [ ] Mettre à jour `lib/config.ts` avec les URLs réelles
- [ ] Tester les previews sur Facebook, Twitter, LinkedIn

### Monitoring
- [ ] Configurer Sentry ou similaire pour le monitoring d'erreurs
- [ ] Ajouter des logs pour les actions critiques
- [ ] Configurer des alertes (serveur down, erreurs critiques)
- [ ] Mettre en place un uptime monitoring

## 🟢 AMÉLIORATIONS (À faire après le lancement)

### Fonctionnalités
- [ ] Ajouter une newsletter
- [ ] Système de réservation/billetterie intégré
- [ ] Galerie photo des spectacles
- [ ] Section actualités/blog
- [ ] Vidéos des spectacles (intégration YouTube/Vimeo)
- [ ] Téléchargement de dossiers de presse

### Admin Dashboard
- [ ] Ajouter gestion des spectacles
- [ ] Gestion des images
- [ ] Éditeur WYSIWYG pour le contenu
- [ ] Statistiques de visite
- [ ] Export des données

### Accessibilité
- [ ] Audit WCAG AA complet
- [ ] Ajouter plus de textes alternatifs
- [ ] Améliorer la navigation clavier
- [ ] Ajouter skip links
- [ ] Tester avec des lecteurs d'écran

### Multilingue
- [ ] Ajouter plus de langues si nécessaire (ES, DE, etc.)
- [ ] Détection automatique de la langue navigateur
- [ ] Sélecteur de langue dans le header

### Tests
- [ ] Ajouter Jest pour tests unitaires
- [ ] Ajouter Cypress ou Playwright pour tests E2E
- [ ] Tests d'intégration des API Routes
- [ ] Tests de régression visuelle

### Design
- [ ] Optimiser les animations pour les appareils low-end
- [ ] Ajouter plus d'effets WebGL (si pertinent)
- [ ] Améliorer les transitions de page
- [ ] Dark/Light mode toggle (optionnel)

## 📝 NOTES TECHNIQUES

### Variables d'environnement nécessaires en production
```env
NEXT_PUBLIC_SITE_URL=https://www.imagesparseconde.com
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://www.imagesparseconde.com
EMAIL_SERVER_USER=...
EMAIL_SERVER_PASSWORD=...
EMAIL_FROM=noreply@imagesparseconde.com
```

### Dépendances à ajouter pour la production
```bash
# Base de données
npm install @prisma/client prisma
# ou
npm install pg

# Authentification
npm install next-auth
npm install bcryptjs

# Email
npm install resend
# ou
npm install nodemailer

# Monitoring
npm install @sentry/nextjs

# Validation
npm install zod
```

### Services à configurer
1. **Hébergement** : Vercel (recommandé) ou autre
2. **Base de données** : Vercel Postgres, Supabase, ou Railway
3. **Email** : Resend (recommandé), SendGrid, ou Postmark
4. **Analytics** : Google Analytics 4
5. **Monitoring** : Sentry
6. **CDN** : Automatique avec Vercel, ou Cloudflare
7. **Domaine** : Configuré avec DNS approprié

### Sécurité
- [ ] Configurer CORS approprié
- [ ] Ajouter rate limiting sur les API Routes
- [ ] Implémenter CSRF protection
- [ ] Valider toutes les entrées utilisateur
- [ ] Sanitiser les données avant affichage
- [ ] Configurer Content Security Policy (CSP)

## 🎯 PRIORITÉS

1. **Phase 1** (Avant lancement) : Tous les items 🔴 CRITIQUE
2. **Phase 2** (Première semaine) : Items 🟡 IMPORTANT
3. **Phase 3** (Premier mois) : Items 🟢 AMÉLIORATIONS progressivement

---

**Dernière mise à jour** : Lors de l'optimisation SEO complète

