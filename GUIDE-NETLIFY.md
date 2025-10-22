# 🚀 Guide Complet : Migration vers Netlify avec Admin Fonctionnel

> **Guide pour débutants** - Chaque étape est expliquée en détail avec des captures d'écran et des exemples concrets.

## 📋 Vue d'ensemble

**Ce que vous allez obtenir :**
- ✅ Site hébergé gratuitement sur Netlify
- ✅ Interface admin fonctionnelle (`/admin`)
- ✅ Déploiement automatique en 30 secondes
- ✅ HTTPS et CDN mondial gratuits
- ✅ Usage commercial autorisé

**Workflow final :**
1. Webmaster se connecte à `votre-site.netlify.app/admin`
2. Modifie une date de spectacle
3. Sauvegarde → Site se met à jour automatiquement en 30 secondes

---

## 🛠️ Phase 1 : Préparation Git & GitHub (15 minutes)

### 1.1 - Vérifier que Git est installé

**Ouvrez votre terminal** (PowerShell sur Windows) et tapez :

```bash
git --version
```

**Résultat attendu :** `git version 2.x.x`

**Si Git n'est pas installé :**
1. Allez sur https://git-scm.com/download/win
2. Téléchargez et installez Git
3. Redémarrez votre terminal

### 1.2 - Initialiser Git dans votre projet

**Dans votre terminal, naviguez vers votre dossier projet :**

```bash
cd "C:\Users\tedst\Desktop\Images par secondes Site internet"
```

**Initialisez Git :**

```bash
git init
```

**Résultat attendu :** `Initialized empty Git repository in C:\Users\tedst\Desktop\Images par secondes Site internet\.git`

### 1.3 - Configurer Git (première fois seulement)

**Configurez votre nom :**

```bash
git config --global user.name "Votre Nom"
```

**Configurez votre email :**

```bash
git config --global user.email "votre.email@example.com"
```

### 1.4 - Ajouter tous les fichiers au repository

```bash
git add .
```

**Vérifiez les fichiers ajoutés :**

```bash
git status
```

**Vous devriez voir :**
```
On branch main
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   app/page.tsx
        new file:   components/HomePage.tsx
        ... (tous vos fichiers)
```

### 1.5 - Premier commit

```bash
git commit -m "Initial commit: Site IPS avec admin fonctionnel"
```

**Résultat attendu :** `[main (root-commit) abc1234] Initial commit: Site IPS avec admin fonctionnel`

---

## 🐙 Phase 2 : Créer un compte GitHub (5 minutes)

### 2.1 - S'inscrire sur GitHub

1. **Allez sur :** https://github.com/signup
2. **Remplissez le formulaire :**
   - Username : `votre-nom-utilisateur` (ex: `ips-dance`)
   - Email : votre email
   - Password : un mot de passe sécurisé
3. **Cliquez sur "Create account"**
4. **Vérifiez votre email** (cliquez sur le lien reçu)

### 2.2 - Créer un nouveau repository

1. **Une fois connecté, cliquez sur le "+" en haut à droite**
2. **Sélectionnez "New repository"**
3. **Remplissez :**
   - Repository name : `ips-dance-website`
   - Description : `Site web de la compagnie IPS avec interface admin`
   - **Laissez "Public"** (pour le plan gratuit)
   - **NE cochez PAS "Add a README file"**
   - **NE cochez PAS "Add .gitignore"**
   - **NE cochez PAS "Choose a license"**
4. **Cliquez sur "Create repository"**

### 2.3 - Connecter votre projet local à GitHub

**GitHub vous donnera des commandes. Copiez et collez :**

```bash
git remote add origin https://github.com/VOTRE-USERNAME/ips-dance-website.git
```

**Remplacez `VOTRE-USERNAME` par votre vrai nom d'utilisateur GitHub**

**Poussez votre code :**

```bash
git branch -M main
git push -u origin main
```

**GitHub vous demandera vos identifiants :**
- Username : votre nom d'utilisateur GitHub
- Password : **ATTENTION** - Utilisez un "Personal Access Token", pas votre mot de passe

### 2.4 - Créer un Personal Access Token

1. **Allez sur :** https://github.com/settings/tokens
2. **Cliquez sur "Generate new token" → "Generate new token (classic)"**
3. **Remplissez :**
   - Note : `Netlify deployment`
   - Expiration : `No expiration` (ou 1 an)
   - **Cochez "repo"** (accès complet aux repositories)
4. **Cliquez sur "Generate token"**
5. **COPIEZ le token** (vous ne le reverrez plus !)

**Retournez à votre terminal et tapez votre username + le token comme password**

**Résultat attendu :**
```
Enumerating objects: 45, done.
Counting objects: 100% (45/45), done.
Delta compression using up to 8 threads
Compressing objects: 100% (42/42), done.
Writing objects: 100% (45/45), 15.23 KiB | 2.18 MiB/s, done.
Total 45 (delta 8), reused 0 (delta 0), pack-reused 0
To https://github.com/VOTRE-USERNAME/ips-dance-website.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

**🎉 Félicitations ! Votre code est maintenant sur GitHub !**

---

## 🌐 Phase 3 : Configuration Netlify (10 minutes)

### 3.1 - Créer un compte Netlify

1. **Allez sur :** https://app.netlify.com/signup
2. **Cliquez sur "Sign up with GitHub"**
3. **Autorisez Netlify** à accéder à votre compte GitHub
4. **Complétez votre profil** (nom, email)

### 3.2 - Importer votre projet

1. **Sur le dashboard Netlify, cliquez sur "Add new site"**
2. **Sélectionnez "Import an existing project"**
3. **Cliquez sur "Deploy with GitHub"**
4. **Autorisez l'accès** si demandé
5. **Sélectionnez votre repository :** `ips-dance-website`
6. **Cliquez sur "Deploy site"**

### 3.3 - Configuration du build

**Netlify va détecter automatiquement que c'est un projet Next.js, mais vérifiez :**

- **Build command :** `npm run build`
- **Publish directory :** `.next`
- **Node version :** `18` (ou la plus récente)

**Si ce n'est pas correct, cliquez sur "Edit settings" et modifiez :**

```
Build command: npm install && npm run build
Publish directory: .next
```

### 3.4 - Premier déploiement

**Cliquez sur "Deploy site"**

**Vous verrez :**
1. **"Building site"** - Netlify installe les dépendances et build votre site
2. **"Deploying site"** - Le site est mis en ligne
3. **"Site deployed"** - Votre site est accessible !

**⏱️ Temps d'attente :** 2-3 minutes pour le premier déploiement

**🎉 Votre site est maintenant en ligne !**

**URL temporaire :** `https://random-name-123456.netlify.app`

---

## 🔧 Phase 4 : Configuration avancée (10 minutes)

### 4.1 - Tester votre site

1. **Cliquez sur l'URL de votre site** dans Netlify
2. **Vérifiez que le site s'affiche correctement**
3. **Testez la navigation** entre les sections
4. **Vérifiez que l'effet de scroll fonctionne**

### 4.2 - Tester l'interface admin

1. **Allez sur :** `https://votre-site.netlify.app/admin`
2. **Connectez-vous avec :**
   - Mot de passe : `admin123`
3. **Vérifiez que vous pouvez :**
   - Voir la liste des dates
   - Cliquer sur "Nouvelle date"
   - Modifier une date existante

### 4.3 - Tester la modification des dates

1. **Dans l'admin, cliquez sur "Modifier" sur une date**
2. **Changez quelque chose** (ex: le nom du spectacle)
3. **Cliquez sur "Sauvegarder"**
4. **Retournez sur la page principale**
5. **Vérifiez que le changement est visible**

**⏱️ Temps d'attente :** 30-60 secondes pour que les changements apparaissent

---

## 🔄 Phase 5 : Workflow quotidien (5 minutes)

### 5.1 - Comment modifier les dates (usage quotidien)

**Votre webmaster peut maintenant :**

1. **Aller sur :** `https://votre-site.netlify.app/admin`
2. **Se connecter** avec le mot de passe
3. **Modifier les dates** comme d'habitude
4. **Sauvegarder** → Le site se met à jour automatiquement !

### 5.2 - Voir les logs de déploiement

**Pour voir ce qui se passe :**

1. **Allez sur votre dashboard Netlify**
2. **Cliquez sur votre site**
3. **Onglet "Deploys"** → Voir l'historique des déploiements
4. **Cliquez sur un déploiement** → Voir les logs détaillés

### 5.3 - Forcer un redéploiement

**Si besoin de rebuild manuel :**

1. **Dashboard Netlify** → Votre site
2. **Onglet "Deploys"**
3. **Cliquez sur "Trigger deploy"** → "Deploy site"

---

## 🌍 Phase 6 : Domaine personnalisé (Optionnel, 15 minutes)

### 6.1 - Ajouter votre domaine

1. **Dashboard Netlify** → Votre site
2. **Onglet "Domain settings"**
3. **Cliquez sur "Add custom domain"**
4. **Tapez votre domaine :** `ips-danse.fr` (exemple)
5. **Cliquez sur "Verify"**

### 6.2 - Configuration DNS

**Netlify vous donnera des instructions DNS. Exemple :**

```
Type: CNAME
Name: www
Value: votre-site.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

**Configurez ces DNS chez votre hébergeur de domaine (ex: OVH, Gandi)**

### 6.3 - HTTPS automatique

**Netlify configure automatiquement HTTPS :**
- **Temps d'attente :** 5-10 minutes
- **Vérification :** Votre site sera accessible en `https://`

---

## 🚨 Résolution des problèmes courants

### Problème 1 : "Build failed"

**Cause :** Erreur dans le code ou les dépendances

**Solution :**
1. **Vérifiez les logs** dans Netlify → Deploys
2. **Testez localement :** `npm run build`
3. **Corrigez les erreurs** et poussez sur GitHub

### Problème 2 : "Site not found"

**Cause :** Mauvaise configuration du build

**Solution :**
1. **Vérifiez `netlify.toml`**
2. **Publish directory doit être :** `.next`
3. **Build command doit être :** `npm run build`

### Problème 3 : "Admin not working"

**Cause :** API routes ne fonctionnent pas

**Solution :**
1. **Vérifiez que les API routes sont dans `app/api/`**
2. **Testez :** `https://votre-site.netlify.app/api/dates`
3. **Vérifiez les logs** pour les erreurs

### Problème 4 : "Changes not appearing"

**Cause :** Cache ou déploiement en cours

**Solution :**
1. **Attendez 1-2 minutes**
2. **Videz le cache** de votre navigateur (Ctrl+F5)
3. **Vérifiez les déploiements** dans Netlify

---

## 📊 Monitoring et maintenance

### Voir les statistiques

**Dashboard Netlify** → Votre site → **Onglet "Analytics"** :
- Visiteurs uniques
- Pages vues
- Temps de chargement
- Erreurs

### Sauvegardes

**Vos données sont sauvegardées :**
- **Code :** Sur GitHub (automatique)
- **Dates :** Dans le fichier `lib/data/dates.json`
- **Déploiements :** Historique dans Netlify

### Mises à jour

**Pour mettre à jour le site :**
1. **Modifiez le code localement**
2. **Testez avec :** `npm run dev`
3. **Commit et push :** `git add . && git commit -m "Update" && git push`
4. **Netlify déploie automatiquement**

---

## 🎯 Résumé du workflow final

### Pour le webmaster (usage quotidien) :

1. **Aller sur :** `https://votre-site.netlify.app/admin`
2. **Se connecter** avec le mot de passe
3. **Modifier les dates** de spectacles
4. **Sauvegarder** → Site mis à jour en 30 secondes

### Pour le développeur (modifications du code) :

1. **Modifier le code** localement
2. **Tester :** `npm run dev`
3. **Commit :** `git add . && git commit -m "Description"`
4. **Push :** `git push`
5. **Netlify déploie automatiquement**

---

## 🆘 Support et aide

### En cas de problème :

1. **Vérifiez les logs** dans Netlify → Deploys
2. **Testez localement** avec `npm run dev`
3. **Consultez la documentation :**
   - [Netlify Docs](https://docs.netlify.com/)
   - [Next.js Docs](https://nextjs.org/docs)

### Liens utiles :

- **Dashboard Netlify :** https://app.netlify.com/
- **Dashboard GitHub :** https://github.com/
- **Votre site :** `https://votre-site.netlify.app`

---

## 🎉 Félicitations !

**Vous avez maintenant :**
- ✅ Un site professionnel hébergé gratuitement
- ✅ Une interface admin fonctionnelle
- ✅ Un déploiement automatique
- ✅ HTTPS et CDN mondial
- ✅ Usage commercial autorisé

**Votre site IPS est maintenant prêt pour la production !**

---

*Guide créé le $(date) - Pour toute question, consultez les logs Netlify ou testez localement avec `npm run dev`*
