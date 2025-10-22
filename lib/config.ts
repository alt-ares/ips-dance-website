/**
 * Configuration centralisée du site
 * Gère les URLs et paramètres en fonction de l'environnement
 */

export const config = {
  // URL du site - changera automatiquement entre dev et prod
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Informations de l'organisation
  site: {
    name: 'IPS — Images Par Seconde',
    shortName: 'IPS',
    description: {
      fr: 'IPS explore le lien entre corps, cadence et image. Chaque création mêle danse, lumière et narration visuelle pour faire vibrer une seconde en mille fragments.',
      en: 'IPS explores the link between body, cadence and image. Each creation blends dance, light and visual storytelling to make a second vibrate in a thousand fragments.'
    },
    email: {
      booking: 'booking@ips-danse.fr',
      press: 'presse@ips-danse.fr'
    },
    phone: '+33 6 00 00 00 00'
  },
  
  // Chemins des images SEO
  images: {
    logo: '/images/seo/logo.png',
    ogImageFr: '/images/seo/og-image-fr.jpg',
    ogImageEn: '/images/seo/og-image-en.jpg',
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png'
  },
  
  // URLs des réseaux sociaux (à compléter)
  social: {
    instagram: '#',
    facebook: '#',
    youtube: '#',
    vimeo: '#'
  }
} as const;

export type Config = typeof config;

