# Backup Hero Section - État Actuel

## Description
Ce fichier décrit l'état actuel du hero section après l'annulation des modifications de l'effet de déformation WebGL.

## État Actuel du Hero (app/page.tsx)

### Structure du Hero
```tsx
{/* Hero Section */}
<section
  id="accueil"
  ref={heroRef}
  className="relative min-h-screen overflow-hidden"
>
  {/* Static Gradient Background */}
  <div 
    className="absolute inset-0" 
    style={{
      background: `
        radial-gradient(ellipse at 0% 0%, #000000 0%, transparent 60%),
        radial-gradient(ellipse at 100% 0%, #000000 0%, transparent 60%),
        radial-gradient(ellipse at 0% 100%, #000000 0%, transparent 60%),
        radial-gradient(ellipse at 100% 100%, #000000 0%, transparent 60%),
        radial-gradient(ellipse at 20% 10%, #000000 0%, transparent 40%),
        radial-gradient(ellipse at 80% 90%, #000000 0%, transparent 40%),
        radial-gradient(ellipse at 30% 20%, #E85002 0%, transparent 50%),
        radial-gradient(ellipse at 70% 80%, #F9F9F9 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, #E85002 0%, transparent 70%),
        linear-gradient(135deg, #000000 0%, #E85002 20%, #F9F9F9 60%, #000000 100%)
      `
    }}
  />
  
  {/* Grain overlay */}
  <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  }} />

  {/* Logo IPS - Top Left */}
  <div className="absolute top-8 left-8 z-20">
    <div className="text-white">
      <div className="font-grotesk font-bold text-2xl mb-1">
        ips:
      </div>
      <div className="text-sm text-white font-inter">
        images par seconde
      </div>
      <div className="text-sm text-white font-inter">
        compagnie de danse contemporaine
      </div>
    </div>
  </div>

  {/* Info Cards - Full Height Right */}
  <div className="absolute top-8 right-8 bottom-8 z-20 flex flex-col gap-5">
    {/* InfoCard components */}
  </div>

  {/* Bottom Left Horizontal Layout - SMC + POINT + HEURES + REAL TIME */}
  <div className="absolute bottom-8 left-8 z-20">
    <div className="flex items-center gap-6">
      {/* SMC */}
      <div className="text-white">
        <div className="font-grotesk font-bold text-3xl sm:text-4xl">
          SMC
        </div>
      </div>
      
      {/* POINT (icône circulaire) */}
      <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
      
      {/* HEURES CET EDT CST */}
      <div className="text-white">
        <TimeZones />
      </div>
      
      {/* REAL TIME */}
      <div className="text-white">
        <div className="font-grotesk font-bold text-2xl mb-1">
          REAL•TIME
        </div>
        <RealTimeClock />
      </div>
    </div>
  </div>

  {/* CTA Buttons - Center */}
  <div className="absolute inset-0 flex items-center justify-center z-20">
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
      <Button href="#dates" variant="primary">
        Voir les dates
      </Button>
      <Button href="#about" variant="secondary">
        Découvrir IPS
      </Button>
    </div>
  </div>
</section>
```

## Imports Actuels (app/page.tsx)
```tsx
import { useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { LiquidCard } from "@/components/LiquidCard";
import { ShowTile } from "@/components/ShowTile";
import { InfoCard } from "@/components/InfoCard";
import { RealTimeClock } from "@/components/RealTimeClock";
import { SMCClock } from "@/components/SMCClock";
import { TimeZones } from "@/components/TimeZones";
import {
  scrollReveal,
  animateCounter,
  staggerFadeIn,
} from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks";
```

## Caractéristiques du Gradient Actuel
- **Type** : Gradient CSS statique (pas d'animation)
- **Couleurs** : Noir (#000000), Orange (#E85002), Blanc (#F9F9F9)
- **Forme** : Multiple gradients radiaux + gradient linéaire
- **Effet** : Zones noires dans les coins, orange et blanc au centre
- **Grain** : Overlay de bruit à 10% d'opacité

## Éléments du Hero
1. **Logo IPS** (top-left) : "ips:" + sous-titres en blanc
2. **InfoCards** (right) : Cartes d'information avec dates
3. **SMC + Point + TimeZones + RealTime** (bottom-left)
4. **Boutons CTA** (center) : "Voir les dates" (orange) + "Découvrir IPS" (secondary)

## Comment Restaurer ce Backup

### Si vous voulez revenir à cet état :

1. **Supprimer** tout import lié à `WarpEffect` ou `motion` de Framer Motion
2. **Remplacer** le contenu du hero par le code ci-dessus
3. **Vérifier** que les imports correspondent à la liste ci-dessus
4. **S'assurer** que le gradient CSS est bien appliqué
5. **Tester** que tous les éléments sont visibles et fonctionnels

### Fichiers à Vérifier
- `app/page.tsx` : Structure principale du hero
- `components/Button.tsx` : Styles des boutons
- `components/TimeZones.tsx` : Couleurs des fuseaux horaires (blanc)
- `components/RealTimeClock.tsx` : Couleurs de l'horloge (blanc)
- `components/Header.tsx` : Navigation (textes en blanc)

## Notes Importantes
- **Tous les textes** du hero sont en blanc
- **Pas d'animations** Framer Motion sur les boutons
- **Gradient statique** sans effets WebGL
- **Grain overlay** présent à 10% d'opacité
- **Responsive** : fonctionne sur mobile et desktop

## Date de Création
Backup créé le : [Date actuelle]
État après : Annulation des modifications WebGL WarpEffect
