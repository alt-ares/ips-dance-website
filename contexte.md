Rôle
Lead front-end. Produis une page d’accueil ULTRA moderne pour la compagnie de danse “IPS — Images Par Seconde”. Style futuriste, typographique, sombre, gradients grainy, halos orange, liquid glass, photos N/B avec aplats orange. Animations JS fluides.

Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Three.js (halo WebGL discret) + postprocessing Bloom faible
- Lenis smooth-scroll
- Framer Motion pour micro-interactions

Navigation (visible mais ancrée vers sections de la home)
- Accueil • Qui sommes-nous • Réalisations • Les dates • Contact

Tokens
--brand-orange:#E85002; --black:#000000; --white:#F9F9F9;
--gray:#646464; --gray-light:#A7A7A7; --gray-dark:#333333;
--gradient-brand:linear-gradient(120deg,#000 0%,#C10801 35%,#F16001 70%,#D9C3AB 100%);

Typo
Titres: Space Grotesk/Sora 800; Corps: Inter 400–500; H1 clamp(56px,9vw,160px).

Fichiers à livrer
- app/layout.tsx (polices, Lenis, global styles)
- app/page.tsx (UNIQUE page avec sections et ancres)
- components: Header, Footer, Button, LiquidCard, ShowTile, HaloOrb(WebGL), GrainCanvas, SectionLabel
- lib/animations.ts (timelines GSAP)
- styles/globals.css (noise, helpers)

Sections de la page d’accueil
1) HERO id="accueil"
   - Grand H1 split animé: « IMAGES PAR SECONDE »
   - Kicker: « Compagnie de danse contemporaine »
   - Bandeau orange semi-transparent traversant le visuel N/B
   - CTA primaire “Voir les dates” (ancre #dates) et secondaire “Découvrir IPS” (#about)
   - Fond: GrainCanvas + HaloOrb WebGL lent, pause si onglet inactif
   - Curseur custom glow orange sur éléments interactifs

2) QUI SOMMES-NOUS id="about"
   - Copy concis adapté à IPS:
     Titre: « Mouvement. Image. Rythme. »
     Paragraphe: « IPS explore le lien entre corps, cadence et image. Chaque création mêle danse, lumière et narration visuelle pour faire vibrer une seconde en mille fragments. Direction artistique: IPS. »
   - 3 piliers en LiquidCard: Chorégraphie • Recherche visuelle • Transmission
   - Compteurs animés: années de création, spectacles joués, danseurs invités

3) RÉALISATIONS id="realisations"
   - Grille de 6 ShowTile avec hover “wipe” orange + blur-in
   - Placeholders réalistes:
     • « PARALLAXE » — 2024 — 55’ — pièce pour 6 danseurs
     • « FOCAL » — 2023 — 35’ — duo lumière-corps
     • « 24 i/s » — 2022 — 50’ — écrans et chœur
     • « NOISE » — 2021 — 20’ — solo in situ
     • « PERSISTANCE » — 2020 — 40’ — trio
     • « PIXELS » — 2019 — 30’ — jeune public
   - Filtre catégories sticky glass: Tout, Pièces longues, Duo/Trio, In situ, Jeune public

4) LES DATES id="dates"
   - Timeline verticale sticky en glass avec ScrollTrigger pin
   - Éléments exemple:
     • 12.10 — Toulouse — Théâtre Garonne — « PARALLAXE »
     • 28.11 — Lyon — Les Subs — « FOCAL »
     • 15.12 — Paris — Le Centquatre — « 24 i/s »
   - CTA “Demander une date” ouvre #contact

5) CONTACT id="contact"
   - Grand halo orange grainy à droite
   - Formulaire 2 colonnes minimal (Nom, Email, Sujet, Message) + consentement RGPD
   - Coordonnées:
     IPS — Images Par Seconde
     Booking: booking@ips-danse.fr • +33 6 00 00 00 00
     Presse: presse@ips-danse.fr
   - Réseaux en colonne fine

Header
- Sticky glass, logo typographique “IPS” à gauche
- Menu à droite avec ancres. Soulignement animé, progress bar scroll 3px orange en haut
- Burger mobile plein écran, fond glass + noise

Animations clés
- Intro: H1 split + skew léger, bandeau orange balaye l’écran via clip-path
- Scroll: parallax images 8%, sections pin, text reveal stagger 0.04
- LiquidCard hover: tilt + inner-glow orange
- ShowTile hover: gradient-glow pulsé très lent
- Transition vers ancre: overlay orange 300ms avec noise

Accessibilité et perf
- Contraste AA. Focus ring 2px orange/blanc
- Prefers-reduced-motion: désactiver GSAP et WebGL, fallback Canvas 2D gradient+PNG noise
- Lazy-load Three et postprocessing, throttle à 30 FPS sur low-power

Exigences de code
- Code complet et propre. Aucun placeholder “TODO” visuel
- Hooks: useIsMobile, useReducedMotion, useWebGLSupported
- Shaders GLSL: grain FBM, halo radial animé
- README avec commandes npm: dev/build/start
- Lighthouse desktop perf 60–90 en dev
