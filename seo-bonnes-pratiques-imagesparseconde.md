# 📘 Bonnes pratiques SEO — Structure multilingue et optimisation globale (Images Par Seconde)

Ce document décrit les **étapes et configurations techniques** à appliquer pour garantir une indexation correcte et un affichage optimal sur les SERP, en tenant compte du futur domaine :
**https://www.imagesparseconde.com/**

---

## 1. Structure du site multilingue

### Page racine (`/`)
- Sert uniquement à la sélection de la langue (modal).  
- Ne doit **pas être indexée** :  
  ```html
  <meta name="robots" content="noindex, follow">
  ```
- Doit permettre aux moteurs d’accéder librement aux sous-pages `/fr` et `/en`.

### Pages de langues (`/fr`, `/en`)
- Chaque langue doit être **accessible directement** via son URL :  
  - `https://www.imagesparseconde.com/fr/`  
  - `https://www.imagesparseconde.com/en/`
- Ces pages doivent contenir du contenu complet et optimisé.  
- Aucune redirection automatique bloquante côté JavaScript.

---

## 2. Balises SEO à intégrer

### A. Balises `hreflang`
Ajouter sur **toutes les pages** :  
```html
<link rel="alternate" hreflang="fr" href="https://www.imagesparseconde.com/fr/" />
<link rel="alternate" hreflang="en" href="https://www.imagesparseconde.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://www.imagesparseconde.com/" />
```

### B. Balise `lang`
```html
<html lang="fr">
<html lang="en">
```

### C. Balises `title` et `meta description`
- Définir **par langue**, selon le contenu réel du site.  
- Respecter les longueurs recommandées :  
  - Titre : ~60 caractères maximum  
  - Description : ~150–160 caractères maximum

### D. Balise canonique
Indiquer l’URL principale de chaque page :  
```html
<link rel="canonical" href="https://www.imagesparseconde.com/fr/" />
```

---

## 3. Sitemap XML

Créer un fichier `/sitemap.xml` avec le domaine final :  
```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.imagesparseconde.com/fr/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://www.imagesparseconde.com/fr/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.imagesparseconde.com/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.imagesparseconde.com/" />
  </url>
  <url>
    <loc>https://www.imagesparseconde.com/en/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://www.imagesparseconde.com/fr/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.imagesparseconde.com/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.imagesparseconde.com/" />
  </url>
</urlset>
```

Déclarer le sitemap dans `robots.txt` :
```txt
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://www.imagesparseconde.com/sitemap.xml
```

---

## 4. robots.txt — version locale et production

### Environnement local
Empêcher l’indexation avant la mise en ligne :  
```txt
User-agent: *
Disallow: /
```

### Version production
Autoriser l’indexation complète :  
```txt
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://www.imagesparseconde.com/sitemap.xml
```

---

## 5. Structure technique du site

1. Utiliser des balises sémantiques HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`).  
2. Une seule balise `<h1>` par page, hiérarchie logique des titres.  
3. Optimiser la vitesse : lazy loading, minification, compression (gzip/brotli).  
4. Fournir des attributs `alt` descriptifs aux images.  
5. Vérifier les codes HTTP (toutes les pages = 200 OK).  
6. Éviter les redirections multiples ou temporaires (`302`).

---

## 6. Données structurées (facultatif mais recommandé)

Implémenter les balises JSON-LD adaptées (Organization, LocalBusiness, etc.) selon le type d’activité.  
Exemple de structure minimale :  
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Images Par Seconde",
  "url": "https://www.imagesparseconde.com",
  "logo": "https://www.imagesparseconde.com/logo.png"
}
```

---

## 7. Indexation et vérification

1. Ajouter le domaine dans **Google Search Console**.  
2. Soumettre le sitemap.  
3. Vérifier la couverture d’indexation.  
4. S’assurer que `/fr` et `/en` apparaissent distinctement.  
5. Utiliser des outils comme **Screaming Frog** ou **Ahrefs** pour tester le bon fonctionnement des `hreflang`.  
6. Surveiller les performances via **Core Web Vitals** (Lighthouse).

---

## 8. Résultat attendu sur le SERP

| Utilisateur | URL affichée | Langue affichée |
|--------------|--------------|----------------|
| Francophone  | `https://www.imagesparseconde.com/fr` | FR |
| Anglophone   | `https://www.imagesparseconde.com/en` | EN |
| Racine       | Non indexée  | — |

---

## 9. Récapitulatif

| Élément | Statut recommandé |
|----------|------------------|
| Racine (`/`) | noindex, follow |
| URLs /fr et /en | indexables |
| hreflang | présent sur toutes les pages |
| sitemap | multilingue à jour |
| performances | Core Web Vitals > 90 |
| robots.txt | non bloquant |
| titres/meta | à définir manuellement selon la langue |
| canonical | présent sur chaque page |

---

## 10. Contrôles finaux avant mise en ligne

- Tester chaque version linguistique sans modal.  
- Vérifier la validité du sitemap et du robots.txt.  
- Confirmer que les URLs renvoient bien 200 OK.  
- S’assurer que les balises hreflang fonctionnent.  
- Vérifier l’affichage des extraits (title + meta) dans Google.

---

**But du document :** fournir la liste complète des actions SEO techniques nécessaires pour un site multilingue propre et indexable sur **imagesparseconde.com**.
